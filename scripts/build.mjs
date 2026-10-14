import { execFileSync } from 'node:child_process';
import { mkdirSync, cpSync, writeFileSync } from 'node:fs';
const base = process.env.PAGES_BASE || '/';
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('PAGES_BASE must start and end with /');
function build(dir, args) {
 execFileSync(process.execPath, args, { cwd: dir, stdio: 'inherit' });
}
build('presentation', ['node_modules/@slidev/cli/bin/slidev.mjs', 'build', '--base', base]);
build('world-map-demo', ['node_modules/vite/bin/vite.js', 'build', '--base', base + 'demo/']);
mkdirSync('dist', { recursive: true });
cpSync('presentation/dist', 'dist', { recursive: true });
cpSync('world-map-demo/dist', 'dist/demo', { recursive: true });
writeFileSync('dist/.nojekyll', '');
