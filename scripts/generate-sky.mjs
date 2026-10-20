import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import {
  Observer, Rotation_EQJ_HOR, RotateVector, Spherical, VectorFromSphere,
} from 'astronomy-engine';

// Pin the source so regenerating a sky does not silently change its catalog.
export const catalogRevision = '7e720a3de062059d4c5400a379146a601d9010e0';
const catalogUrl = `https://raw.githubusercontent.com/ofrohn/d3-celestial/${catalogRevision}/`;
const magnitudeLimit = 4.8;
const round = (value) => Number(value.toFixed(5));

/** Stereographic sky, north up and east left, as seen looking toward the zenith. */
export function projectHorizon({ x, y, z }) {
  return [y / (1 + z), -x / (1 + z)].map(round);
}

/** Clip a constellation segment at the geometric horizon before projecting it. */
export function clipAtHorizon(first, second) {
  if (first.z < 0 && second.z < 0) return null;
  if (first.z >= 0 && second.z >= 0) return [first, second];
  const fraction = first.z / (first.z - second.z);
  const x = first.x + fraction * (second.x - first.x);
  const y = first.y + fraction * (second.y - first.y);
  const length = Math.hypot(x, y);
  if (length < 1e-12) return null;
  const intersection = { x: x / length, y: y / length, z: 0 };
  return first.z < 0 ? [intersection, second] : [first, intersection];
}

export function generateSky(starCatalog, constellations, { date, latitude, longitude }) {
  if (!Number.isFinite(date?.getTime())) throw new Error('A valid observation date is required.');
  if (!Number.isFinite(latitude) || Math.abs(latitude) > 90) throw new Error('Latitude must be between -90 and 90.');
  if (!Number.isFinite(longitude) || Math.abs(longitude) > 180) throw new Error('Longitude must be between -180 and 180.');
  const rotation = Rotation_EQJ_HOR(date, new Observer(latitude, longitude, 0));
  const toHorizon = ([ra, dec]) => RotateVector(rotation, VectorFromSphere(new Spherical(dec, (ra + 360) % 360, 1), date));
  const stars = starCatalog.features
    .filter((star) => Number.isFinite(star.properties.mag) && star.properties.mag <= magnitudeLimit)
    .map((star) => ({ position: toHorizon(star.geometry.coordinates), magnitude: star.properties.mag }))
    .filter(({ position }) => position.z >= 0)
    .map(({ position, magnitude }) => [...projectHorizon(position), magnitude]);

  const lines = [];
  const names = new Set();
  for (const constellation of constellations.features) {
    for (const path of constellation.geometry.coordinates) {
      const vertices = path.map(toHorizon);
      for (let index = 1; index < vertices.length; index++) {
        const segment = clipAtHorizon(vertices[index - 1], vertices[index]);
        if (!segment) continue;
        // Sample the great-circle arc, rather than drawing long distorted chords.
        const points = [];
        const [first, second] = segment;
        for (let step = 0; step <= 8; step++) {
          const fraction = step / 8;
          const x = first.x + fraction * (second.x - first.x);
          const y = first.y + fraction * (second.y - first.y);
          const z = first.z + fraction * (second.z - first.z);
          const length = Math.hypot(x, y, z);
          points.push(projectHorizon({ x: x / length, y: y / length, z: z / length }));
        }
        lines.push(points);
        names.add(constellation.id);
      }
    }
  }

  // Only projected geometry is shipped: no personal date or birthplace metadata.
  return { projection: 'zenith-stereographic', catalogRevision, stars, lines, constellations: [...names].sort() };
}

async function readCatalog(file) {
  const response = await fetch(catalogUrl + file);
  if (!response.ok) throw new Error(`Unable to fetch ${file}: HTTP ${response.status}`);
  return response.json();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [timestamp, latitude, longitude] = process.argv.slice(2);
  if (!timestamp || !/(Z|[+-]\d{2}:\d{2})$/.test(timestamp) || latitude === undefined || longitude === undefined) {
    throw new Error('Usage: node scripts/generate-sky.mjs <ISO date with timezone> <latitude> <longitude>');
  }
  const [stars, lines] = await Promise.all([
    readCatalog('data/stars.6.json'), readCatalog('data/constellations.lines.json'),
  ]);
  const sky = generateSky(stars, lines, { date: new Date(timestamp), latitude: Number(latitude), longitude: Number(longitude) });
  await writeFile(new URL('../src/data/sky.json', import.meta.url), JSON.stringify(sky) + '\n');
  console.log(`Generated ${sky.stars.length} stars and ${sky.lines.length} constellation segments.`);
}
