import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { randomInt } from 'node:crypto';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const passed = [];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function pass(label) {
  passed.push(label);
}

function localPath(reference) {
  const url = new URL(reference, 'http://localhost/');
  return path.join(ROOT, decodeURIComponent(url.pathname.replace(/^\/+/, '')).replaceAll('/', path.sep));
}

const html = await fs.readFile(path.join(ROOT, 'index.html'), 'utf8');
const localRefs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)]
  .map(match => match[1])
  .filter(value => !/^(?:[a-z]+:|#|\/\/)/i.test(value));
const localFiles = localRefs.map(localPath);
const outsideRoot = localFiles.filter(file => !file.startsWith(ROOT + path.sep));
assert.deepEqual(outsideRoot, [], 'Local HTML assets must remain inside the app folder.');
const missingHtmlAssets = localFiles.filter(file => !existsSync(file));
assert.deepEqual(missingHtmlAssets, [], 'Every local HTML asset should exist.');

const htmlIds = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
const duplicateIds = htmlIds.filter((id, index) => htmlIds.indexOf(id) !== index);
assert.deepEqual([...new Set(duplicateIds)], [], 'HTML IDs should be unique.');

const sw = await fs.readFile(path.join(ROOT, 'sw.js'), 'utf8');
const shellSource = sw.match(/const SHELL=\[(.*?)\];/s)?.[1] || '';
const shellAssets = [...shellSource.matchAll(/'([^']+)'/g)].map(match => match[1]);
const missingShellAssets = shellAssets.filter(asset => asset !== '/' && !existsSync(path.join(ROOT, asset.replace(/^\//, ''))));
assert.deepEqual(missingShellAssets, [], 'Every precached app-shell asset should exist.');

const studyContext = { window: {} };
vm.runInNewContext(await fs.readFile(path.join(ROOT, 'study-data.js'), 'utf8'), studyContext, { timeout: 1000 });
const resources = studyContext.window.ARISE_STUDY.resources.flatMap(shelf => shelf.resources);
const invalidResources = resources.filter(resource => {
  try { return new URL(resource.url).protocol !== 'https:'; } catch { return true; }
});
assert.equal(invalidResources.length, 0, `Study links should be valid HTTPS URLs: ${invalidResources.map(resource => resource.name).join(', ')}`);

const scriptFiles = [...new Set([
  ...localRefs.filter(reference => /\.m?js(?:[?#]|$)/i.test(reference)).map(localPath),
  path.join(ROOT, 'api', 'health.mjs'),
  path.join(ROOT, 'api', 'hackathons.mjs'),
  path.join(ROOT, 'api', 'signals.mjs'),
  path.join(ROOT, 'api', 'problems.mjs'),
  path.join(ROOT, 'vercel-api', 'feeds.mjs'),
  path.join(ROOT, 'server.mjs'),
  path.join(ROOT, 'sw.js')
])];
for (const file of scriptFiles) {
  const check = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(check.status, 0, `${path.basename(file)} syntax check failed: ${check.stderr || check.stdout}`);
}
const vercelConfig = JSON.parse(await fs.readFile(path.join(ROOT, 'vercel.json'), 'utf8'));
assert.equal(vercelConfig.framework, null, 'Vercel must deploy the app as a static Other project.');
assert.equal(vercelConfig.outputDirectory, '.', 'Vercel must publish the app root.');
assert.match(html, /assets\/arise-logo\.svg/, 'The original ARISE logo must be used in the app header.');
assert.equal(existsSync(path.join(ROOT, 'assets', 'arise-logo.svg')), true, 'The original ARISE logo must ship with the project.');
pass(`syntax + assets + unique IDs + ${resources.length} HTTPS resource links + Vercel packaging`);

assert.equal('functions' in vercelConfig, false, 'Vercel should auto-detect API files without stale function patterns.');
assert.equal(existsSync(path.join(ROOT, 'api', 'rooms.mjs')), false, 'Vercel shared-room API should remain removed.');
const healthHandler = (await import('../api/health.mjs')).default;
const healthResponse = await healthHandler(new Request('https://arise.invalid/api/health'));
const health = await healthResponse.json();
assert.equal(health.ok, true);
assert.equal(health.features.sharedStudyRooms, false, 'Vercel shared study rooms are intentionally disabled.');
assert.equal(health.roomBackend, 'local-only');
const problemsHandler = (await import('../api/problems.mjs')).default;
const problemResponse = await problemsHandler(new Request('https://arise.invalid/api/problems?topic=unknown'));
assert.deepEqual((await problemResponse.json()).problems, []);
const activeMentor = await fs.readFile(path.join(ROOT, 'arise-resource-agent-v2.js'), 'utf8');
assert.doesNotMatch(activeMentor, /api\.deepseek\.com|generativelanguage\.googleapis\.com|arise-agent-key-save/);
pass('Vercel auto-detection, local-only study rooms, key-free study guide and problem API fallback');

const dataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'arise-predeploy-qa-'));
const port = randomInt(30000, 60000);
const origin = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ['server.mjs'], {
  cwd: ROOT,
  env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', ARISE_DATA_DIR: dataDir },
  stdio: 'ignore'
});
const childExit = new Promise(resolve => child.once('exit', resolve));

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt++) {
    if (child.exitCode !== null) throw new Error(`Test server exited with code ${child.exitCode}.`);
    try {
      const response = await fetch(`${origin}/api/health`, { signal: AbortSignal.timeout(500) });
      if (response.ok) return response.json();
    } catch {}
    await sleep(150);
  }
  throw new Error('Temporary test server did not start.');
}

try {
  const health = await waitForServer();
  assert.equal(health.app, 'ARISE');
  assert.equal(health.appVersion, 25, 'Health endpoint should identify this release.');
  const home = await fetch(`${origin}/`);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /ARISE/);
  assert.equal((await fetch(`${origin}/.arise-data/rooms.json`)).status, 404, 'Private room storage must not be served as a static file.');
  pass('health, app shell and private-file boundary');

  let response = await fetch(`${origin}/api/rooms`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{'
  });
  assert.equal(response.status, 400, 'Malformed JSON should be a client error.');
  response = await fetch(`${origin}/api/rooms`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: 'x'.repeat(100_001)
  });
  assert.equal(response.status, 413, 'Oversized requests should be rejected.');
  pass('request validation and payload limit');

  response = await fetch(`${origin}/api/rooms`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'ARISE QA', title: 'Temporary smoke-test room' })
  });
  assert.equal(response.status, 201);
  const { code } = await response.json();
  assert.match(code, /^[A-Z0-9]{6}$/);

  response = await fetch(`${origin}/api/rooms/${code}/join`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Test friend' })
  });
  assert.equal(response.status, 200);
  response = await fetch(`${origin}/api/rooms/${code}/messages`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Test friend', text: 'Hello from QA.' })
  });
  assert.equal(response.status, 201);
  response = await fetch(`${origin}/api/rooms/${code}/tasks`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Test friend', title: 'Check a practice problem' })
  });
  assert.equal(response.status, 201);
  response = await fetch(`${origin}/api/rooms/${code}/notes`, {
    method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ notes: 'Temporary private note.' })
  });
  assert.equal(response.status, 200);
  const room = await (await fetch(`${origin}/api/rooms/${code}`)).json();
  assert.equal(room.members.length, 2);
  assert.ok(room.messages.some(message => message.text === 'Hello from QA.'));
  assert.equal(room.tasks.length, 1);
  assert.equal(room.notes, 'Temporary private note.');
  const persisted = JSON.parse(await fs.readFile(path.join(dataDir, 'rooms.json'), 'utf8'));
  assert.equal(persisted[code].notes, 'Temporary private note.');
  pass('study-room create, join, chat, task, notes and persistence');

  if (process.argv.includes('--live')) {
    const [hackResponse, signalResponse] = await Promise.all([
      fetch(`${origin}/api/hackathons?refresh=1`, { signal: AbortSignal.timeout(55_000) }),
      fetch(`${origin}/api/signals?refresh=1`, { signal: AbortSignal.timeout(55_000) })
    ]);
    assert.equal(hackResponse.status, 200);
    assert.equal(signalResponse.status, 200);
    const [hackathons, signals] = await Promise.all([hackResponse.json(), signalResponse.json()]);
    assert.ok(Array.isArray(hackathons.items) && Array.isArray(hackathons.sourceStatus));
    assert.ok(Array.isArray(signals.items) && Array.isArray(signals.sourceStatus));
    assert.ok(hackathons.sourceStatus.some(source => source.ok), 'All hackathon sources failed.');
    assert.ok(signals.sourceStatus.some(source => source.ok), 'All engineering-news sources failed.');
    console.log(`Live refresh: ${hackathons.liveCount || 0} hackathon cards; ${hackathons.sourcesChecked || 0}/${hackathons.sourceCount || 0} event sources; ${signals.items.length} news items; ${signals.sourcesSucceeded || 0}/${signals.sourceCount || 0} news sources.`);
    for (const source of [...hackathons.sourceStatus, ...signals.sourceStatus]) {
      console.log(`  ${source.ok ? '✓' : '·'} ${source.source}: ${source.items} items${source.error ? ` (${source.error})` : ''}`);
    }
    pass('optional live feed refresh');
  }
} finally {
  if (child.exitCode === null) child.kill();
  await Promise.race([childExit, sleep(2500)]);
  const safeTempPath = path.resolve(dataDir);
  assert.ok(path.dirname(safeTempPath) === path.resolve(os.tmpdir()) && path.basename(safeTempPath).startsWith('arise-predeploy-qa-'));
  await fs.rm(safeTempPath, { recursive: true, force: true });
}

console.log(`ARISE pre-deployment smoke checks passed (${passed.length} groups):`);
for (const label of passed) console.log(`✓ ${label}`);
