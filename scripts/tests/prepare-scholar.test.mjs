import assert from 'node:assert/strict';
import { test } from 'node:test';
import { prepareScholar } from '../prepare-scholar.mjs';

test('builds without a key use the cache without starting Python', () => {
  for (const apiKey of [null, '', '  ']) {
    const messages = [];
    prepareScholar({
      apiKey,
      run: () => assert.fail('Python must not run without a key'),
      log: (message) => messages.push(message),
    });
    assert.match(messages[0], /using cached Scholar data/);
  }
});

test('configured builds install dependencies and refresh Scholar in order', () => {
  const calls = [];
  prepareScholar({
    apiKey: 'configured',
    platform: 'linux',
    run: (...args) => { calls.push(args); return { status: 0 }; },
  });
  assert.deepEqual(calls, [
    ['python', ['-m', 'pip', 'install', '-q', 'requests'], { stdio: 'inherit' }],
    ['python', ['scripts/fetch_scholar.py'], { stdio: 'inherit' }],
  ]);
});

test('Windows builds use the Python launcher', () => {
  const commands = [];
  prepareScholar({
    apiKey: 'configured',
    platform: 'win32',
    run: (command) => { commands.push(command); return { status: 0 }; },
  });
  assert.deepEqual(commands, ['py', 'py']);
});

test('dependency installation failures stop before refreshing Scholar', () => {
  let calls = 0;
  assert.throws(() => prepareScholar({
    apiKey: 'configured',
    run: () => { calls++; return { status: 1 }; },
  }), /Scholar refresh failed/);
  assert.equal(calls, 1);
});

test('configured refresh failures remain visible rather than silently using stale data', () => {
  let calls = 0;
  assert.throws(() => prepareScholar({
    apiKey: 'configured',
    run: () => ({ status: ++calls === 1 ? 0 : 1 }),
  }), /Scholar refresh failed/);
  assert.equal(calls, 2);
});

test('missing Python reports the process error', () => {
  const error = new Error('Python executable not found');
  assert.throws(() => prepareScholar({
    apiKey: 'configured',
    run: () => ({ error, status: null }),
  }), (caught) => caught === error);
});
