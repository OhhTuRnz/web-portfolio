/**
 * Precomputes the robot point-cloud data used by Hero.astro.
 *
 * Run once (or as part of the build):
 *   node scripts/precompute-pointcloud.mjs
 *
 * Output: public/assets/robot-pointcloud.bin
 *
 * Binary layout (all little-endian):
 *   [0 ..  3]  uint32  pCount
 *   [4 ..  7]  uint32  numEdgePairs
 *   [8 .. 11]  float32 camZ
 *   [12 ..]    float32[pCount*3]       origArr  (point positions)
 *   [..]       float32[pCount*3]       colArr   (point RGB colours)
 *   [..]       int32  [numEdgePairs*2] edgePairsBuf
 *   [..]       float32[numEdgePairs*6] edgeColArr (per-vertex RGB for each edge endpoint)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Minimal browser-like globals Three.js checks for
globalThis.self = globalThis;

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = join(__dirname, '..');
const glbPath   = join(root, 'public/assets/mesh_models/robo_face.glb');
const outPath   = join(root, 'public/assets/robot-pointcloud.bin');

console.log('[precompute] Reading GLB…');
const glbBuf = readFileSync(glbPath);
// Node Buffers share their ArrayBuffer with an offset — slice out our portion
const glbAB  = glbBuf.buffer.slice(glbBuf.byteOffset, glbBuf.byteOffset + glbBuf.byteLength);

const loader = new GLTFLoader();
loader.parse(glbAB, '', (gltf) => {
  const model  = gltf.scene;
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);

  // Normalise model (same logic as Hero.astro)
  const box    = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size   = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const norm   = 3.2 / maxDim;

  model.position.set(-center.x * norm, -center.y * norm, -center.z * norm);
  model.scale.setScalar(norm);
  model.updateMatrixWorld(true);

  const fovRad = camera.fov * (Math.PI / 180);
  const halfH  = (size.y * norm) / 2;
  const camZ   = halfH / Math.tan(fovRad / 2) * 1.25;

  const meshes = [];
  model.traverse(obj => { if (obj.isMesh) meshes.push(obj); });
  console.log(`[precompute] Found ${meshes.length} mesh(es). Sampling…`);

  const TOTAL   = 4000;
  const perMesh = Math.max(20, Math.ceil(TOTAL / meshes.length));
  const posData = [], colData = [];
  const _v  = new THREE.Vector3(), _c = new THREE.Color();
  const cLow  = new THREE.Color(0x7c3aed);
  const cHigh = new THREE.Color(0x22d3ee);

  const nb     = new THREE.Box3().setFromObject(model);
  const yMin   = nb.min.y;
  const yRange = nb.max.y - nb.min.y;

  for (const mesh of meshes) {
    mesh.updateWorldMatrix(true, false);
    try {
      const sampler = new MeshSurfaceSampler(mesh).build();
      for (let i = 0; i < perMesh; i++) {
        sampler.sample(_v);
        _v.applyMatrix4(mesh.matrixWorld);
        posData.push(_v.x, _v.y, _v.z);
        const tt = Math.max(0, Math.min(1, (_v.y - yMin) / yRange));
        _c.lerpColors(cLow, cHigh, tt);
        colData.push(_c.r, _c.g, _c.b);
      }
    } catch (e) {
      console.warn('[precompute] Skipping degenerate mesh:', e.message);
    }
  }

  const pCount  = posData.length / 3;
  const origArr = new Float32Array(posData);
  console.log(`[precompute] ${pCount} points sampled. Building edges…`);

  // Spatial-grid edge builder (identical to Hero.astro)
  const EDGE_THRESH = 0.11;
  const MAX_NEIGH   = 3;
  const cellSize    = EDGE_THRESH;
  const cellMap     = new Map();
  const neighCount  = new Int32Array(pCount);

  const cellKey = (cx, cy, cz) =>
    ((cx & 0x3ff) | ((cy & 0x3ff) << 10) | ((cz & 0x3ff) << 20));

  for (let i = 0; i < pCount; i++) {
    const cx = Math.floor(origArr[i*3]   / cellSize);
    const cy = Math.floor(origArr[i*3+1] / cellSize);
    const cz = Math.floor(origArr[i*3+2] / cellSize);
    const k  = cellKey(cx, cy, cz);
    if (!cellMap.has(k)) cellMap.set(k, []);
    cellMap.get(k).push(i);
  }

  const pairs  = [];
  const thresh2 = EDGE_THRESH * EDGE_THRESH;
  for (let i = 0; i < pCount; i++) {
    if (neighCount[i] >= MAX_NEIGH) continue;
    const cx = Math.floor(origArr[i*3]   / cellSize);
    const cy = Math.floor(origArr[i*3+1] / cellSize);
    const cz = Math.floor(origArr[i*3+2] / cellSize);
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++)
        for (let dz = -1; dz <= 1; dz++) {
          const neighbors = cellMap.get(cellKey(cx+dx, cy+dy, cz+dz));
          if (!neighbors) continue;
          for (const j of neighbors) {
            if (j <= i || neighCount[i] >= MAX_NEIGH || neighCount[j] >= MAX_NEIGH) continue;
            const ex = origArr[i*3]   - origArr[j*3];
            const ey = origArr[i*3+1] - origArr[j*3+1];
            const ez = origArr[i*3+2] - origArr[j*3+2];
            if (ex*ex + ey*ey + ez*ez < thresh2) {
              pairs.push(i, j);
              neighCount[i]++;
              neighCount[j]++;
            }
          }
        }
  }

  const numEdgePairs = pairs.length / 2;
  const edgeColArr   = new Float32Array(numEdgePairs * 6);
  for (let e = 0; e < numEdgePairs; e++) {
    for (const [pt, off] of [[pairs[e*2], e*6], [pairs[e*2+1], e*6+3]]) {
      const tt = Math.max(0, Math.min(1, (origArr[pt*3+1] - yMin) / yRange));
      _c.lerpColors(cLow, cHigh, tt);
      edgeColArr[off]   = _c.r;
      edgeColArr[off+1] = _c.g;
      edgeColArr[off+2] = _c.b;
    }
  }

  console.log(`[precompute] ${numEdgePairs} edges. Writing binary…`);

  // 12-byte header
  const header = Buffer.alloc(12);
  header.writeUInt32LE(pCount, 0);
  header.writeUInt32LE(numEdgePairs, 4);
  header.writeFloatLE(camZ, 8);

  const out = Buffer.concat([
    header,
    Buffer.from(origArr.buffer),
    Buffer.from(new Float32Array(colData).buffer),
    Buffer.from(new Int32Array(pairs).buffer),
    Buffer.from(edgeColArr.buffer),
  ]);

  writeFileSync(outPath, out);
  console.log(`[precompute] ✓ ${outPath} (${(out.length / 1024).toFixed(1)} KB)`);

}, (err) => {
  console.error('[precompute] GLTFLoader.parse failed:', err);
  process.exit(1);
});
