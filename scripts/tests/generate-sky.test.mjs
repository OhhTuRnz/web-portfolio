import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  EquatorFromVector, Horizon, Observer, RotateVector, Rotation_EQJ_EQD,
  Spherical, VectorFromSphere,
} from 'astronomy-engine';
import { clipAtHorizon, generateSky, projectHorizon } from '../generate-sky.mjs';

const coordinates = { date: new Date('2024-01-01T00:00:00Z'), latitude: 40, longitude: -4 };
const catalog = (features) => ({ type: 'FeatureCollection', features });
const star = (ra, dec, magnitude = 2) => ({ properties: { mag: magnitude }, geometry: { coordinates: [ra, dec] } });
const empty = catalog([]);

test('sky orientation places north above the zenith and east to the left', () => {
  assert.deepEqual(projectHorizon({ x: 0, y: 0, z: 1 }), [0, 0]);
  assert.deepEqual(projectHorizon({ x: 1, y: 0, z: 0 }), [0, -1]);
  assert.deepEqual(projectHorizon({ x: 0, y: -1, z: 0 }), [-1, 0]);
});

test('a constellation crossing the horizon is clipped; hidden segments are excluded', () => {
  const above = { x: 0.6, y: 0, z: 0.8 };
  const below = { x: 0.6, y: 0, z: -0.8 };
  const [first, last] = clipAtHorizon(above, below);
  assert.deepEqual(first, above);
  assert.deepEqual(last, { x: 1, y: 0, z: 0 });
  assert.deepEqual(clipAtHorizon(below, above), [last, above]);
  assert.equal(clipAtHorizon(below, below), null);
});

test('catalog coordinates agree with the independent altitude/azimuth API', () => {
  const observer = new Observer(coordinates.latitude, coordinates.longitude, 0);
  // Polaris is always above the horizon at this latitude; the south pole is hidden.
  const ra = 37.9546;
  const dec = 89.2641;
  const result = generateSky(catalog([star(ra, dec), star(0, -90), star(ra, dec, 6)]), empty, coordinates);
  assert.equal(result.stars.length, 1);
  const vector = VectorFromSphere(new Spherical(dec, ra, 1), coordinates.date);
  const ofDate = EquatorFromVector(RotateVector(Rotation_EQJ_EQD(coordinates.date), vector));
  const horizon = Horizon(coordinates.date, observer, ofDate.ra, ofDate.dec);
  const radius = Math.tan((90 - horizon.altitude) * Math.PI / 360);
  const azimuth = horizon.azimuth * Math.PI / 180;
  const [x, y] = result.stars[0];
  assert.ok(Math.abs(x + radius * Math.sin(azimuth)) < 0.00001);
  assert.ok(Math.abs(y + radius * Math.cos(azimuth)) < 0.00001);
});

test('the map changes with the observation hour and rejects invalid inputs', () => {
  const stars = catalog([star(37.9546, 89.2641)]);
  const later = { ...coordinates, date: new Date('2024-01-01T06:00:00Z') };
  assert.notDeepEqual(generateSky(stars, empty, coordinates).stars, generateSky(stars, empty, later).stars);
  assert.throws(() => generateSky(stars, empty, { ...coordinates, date: new Date('invalid') }), /date/);
  assert.throws(() => generateSky(stars, empty, { ...coordinates, latitude: 91 }), /Latitude/);
  assert.throws(() => generateSky(stars, empty, { ...coordinates, longitude: -181 }), /Longitude/);
});

test('the shipped snapshot stays above the horizon and contains no personal inputs', async () => {
  const sky = JSON.parse(await readFile(new URL('../../src/data/sky.json', import.meta.url), 'utf8'));
  assert.ok(sky.stars.length > 200);
  assert.ok(sky.lines.length > 100);
  for (const [x, y, magnitude] of sky.stars) {
    assert.ok(Number.isFinite(x) && Number.isFinite(y));
    assert.ok(Math.hypot(x, y) <= 1.00001);
    assert.ok(magnitude <= 4.8);
  }
  for (const path of sky.lines) {
    for (const [x, y] of path) assert.ok(Number.isFinite(x) && Number.isFinite(y) && Math.hypot(x, y) <= 1.00001);
  }
  assert.equal(sky.date, undefined);
  assert.equal(sky.latitude, undefined);
  assert.equal(sky.longitude, undefined);
});
