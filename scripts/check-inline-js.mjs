import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
let checked = 0;
for (const [, attrs, source] of scripts) {
  if (/type\s*=\s*["'](?:application\/(?:ld\+)?json|importmap)["']/i.test(attrs)) continue;
  if (!source.trim()) continue;
  try {
    // Parse only; do not execute application code during the build.
    new Function(source);
    checked += 1;
  } catch (error) {
    console.error('Inline JavaScript syntax error in script #' + (checked + 1) + ':', error.message);
    process.exitCode = 1;
    break;
  }
}
if (!process.exitCode) console.log('Checked ' + checked + ' inline JavaScript block(s) successfully.');
