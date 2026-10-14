import { execFileSync } from 'node:child_process';
import { mkdirSync, cpSync, writeFileSync } from 'node:fs';
const base = process.env.PAGES_BASE || '/';
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('PAGES_BASE must start and end with /');
execFileSync(process.execPath, ['node_modules/@slidev/cli/bin/slidev.mjs', 'build', '--base', base], { cwd: 'presentation', stdio: 'inherit' });
mkdirSync('dist', { recursive: true });
cpSync('presentation/dist', 'dist', { recursive: true });
writeFileSync('dist/.nojekyll', '');