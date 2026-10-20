import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export function prepareScholar({
  apiKey = process.env.SERPAPI_KEY,
  platform = process.platform,
  run = spawnSync,
  log = console.log,
} = {}) {
  if (!apiKey?.trim()) {
    log('SERPAPI_KEY is not set for this build; using cached Scholar data.');
    return;
  }

  const python = platform === 'win32' ? 'py' : 'python';
  const commands = [
    ['-m', 'pip', 'install', '-q', 'requests'],
    ['scripts/fetch_scholar.py'],
  ];
  for (const args of commands) {
    const result = run(python, args, { stdio: 'inherit' });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      throw new Error(`Scholar refresh failed (exit ${result.status ?? 'unknown'}).`);
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  prepareScholar();
}
