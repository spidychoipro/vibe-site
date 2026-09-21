import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const fail = (msg) => { console.error('FAIL: ' + msg); process.exitCode = 1; };
const ok = (msg) => console.log('ok: ' + msg);

const read = (p) => readFileSync(path.join(root, p), 'utf8');

// 1. index.html must stay genuinely blank
const html = read('index.html');
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const bodyContent = (bodyMatch ? bodyMatch[1] : '').replace(/<!--[\s\S]*?-->/g, '').trim();
if (bodyContent !== '') fail('index.html <body> must be empty');
else ok('index.html <body> empty');

// 2. userscript header sanity
const userscript = read('vibe.user.js');
const required = [
  '// ==UserScript==',
  '// @name',
  '// @namespace',
  '// @version',
  '// @match',
  '// @grant        none',
  '// @noframes',
  '// @downloadURL',
  '// @updateURL',
  '// ==/UserScript=='
];
for (const line of required) {
  if (!userscript.includes(line)) fail('vibe.user.js missing header line: ' + line);
  else ok('vibe.user.js has ' + line);
}

// 3. deployed script must NOT trust localhost (divergence from dev build)
if (/localhost/.test(userscript)) fail('vibe.user.js must not include localhost @match');
else ok('vibe.user.js has no localhost match');

// 4. deployed script scope: exact GitHub Pages URL only
const matches = [...userscript.matchAll(/^\/\/ @match\s+(\S+)/gm)].map((m) => m[1]);
if (matches.length !== 1 || matches[0] !== 'https://spidychoipro.github.io/vibe-site/') {
  fail('vibe.user.js must have exactly one @match (exact GitHub Pages URL), got: ' + matches.join(', '));
} else ok('vibe.user.js @match is exact URL');

// 5. dev build must keep localhost + have no auto-update URLs
const dev = read('vibe.dev.user.js');
const devMatches = [...dev.matchAll(/^\/\/ @match\s+(\S+)/gm)].map((m) => m[1]);
const devLocalhost = devMatches.filter((m) => m.includes('localhost') || m.includes('127.0.0.1'));
if (devLocalhost.length !== 2) fail('vibe.dev.user.js must match localhost:8000 and 127.0.0.1:8000');
else ok('vibe.dev.user.js has localhost matches');
if (/@(downloadURL|updateURL)/.test(dev)) fail('vibe.dev.user.js must not auto-update');
else ok('vibe.dev.user.js has no update URLs');

// 6. no innerHTML in userscripts
for (const f of ['vibe.user.js', 'vibe.dev.user.js']) {
  if (/innerHTML/.test(read(f))) fail(f + ' must not use innerHTML');
  else ok(f + ' no innerHTML');
}

// 7. version sync between the two builds
const verMain = userscript.match(/^\/\/ @version\s+(\S+)/m)?.[1];
const verDev = dev.match(/^\/\/ @version\s+(\S+)/m)?.[1];
if (verMain && verDev && verMain !== verDev) fail('version mismatch: vibe.user.js=' + verMain + ' vibe.dev.user.js=' + verDev);
else ok('version synced: ' + verMain);

if (process.exitCode) {
  console.error('\nverification FAILED');
  process.exit(1);
}
console.log('\nAll checks passed.');