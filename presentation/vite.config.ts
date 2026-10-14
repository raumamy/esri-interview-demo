import { build } from 'vite'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const mapRoot = fileURLToPath(new URL('../world-map-demo/', import.meta.url))
let outputDir

export default {
  resolve: { preserveSymlinks: true },
  build: { cssMinify: false },
  plugins: [{
    name: 'bundle-separate-world-map',
    apply: 'build',
    configResolved(config) { outputDir = resolve(config.root, config.build.outDir) },
    async closeBundle() {
      // Build the existing app without editing its source or standalone output.
      await build({
        root: mapRoot,
        configFile: false,
        base: './',
        build: { outDir: resolve(outputDir, 'world-map'), emptyOutDir: true },
        plugins: [{
          name: 'relative-world-map-data',
          transform(code, id) {
            if (id.replaceAll('\\', '/').endsWith('/src/main.js'))
              return code.replace(/(['"])\/data\//g, 'import.meta.env.BASE_URL + $1data/')
          },
        }],
      })
    },
  }],
}
