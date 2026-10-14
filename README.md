# Esri interview: GitHub Pages

This publishing copy contains the existing Slidev presentation and OpenLayers map. Originals remain in OneDrive. GIS working files and the map's nested Git history are excluded.

## Layout

- Presentation: site root
- Embedded and standalone map: demo/
- One GitHub Pages deployment contains both.

## Local build

Use Node.js 24. Run `npm ci --prefix presentation` and `npm ci --prefix world-map-demo`, then `npm run build`. For a project Pages URL, set PAGES_BASE to `/esri-interview-demo/` before building. The combined website is in dist/.

The build passes the base path to Slidev and Vite. Images, map data and the embedded demo use that same base. The map declares OpenLayers directly rather than relying on a parent folder's installation.

## Publish

The approved destination is the new public repository raumamy/esri-interview-demo. Authenticate GitHub CLI as raumamy first. Initialize this folder as a Git repository, commit the source, create that public repository, and push main. In repository Settings > Pages, select GitHub Actions. Run the Publish presentation and map workflow from Actions.

The workflow is manual so later source pushes do not automatically publish changes. It installs locked dependencies, obtains the actual Pages base path, builds both apps and uploads a single Pages artifact.

Expected URLs after a successful deployment:
- https://raumamy.github.io/esri-interview-demo/
- https://raumamy.github.io/esri-interview-demo/demo/

Check slide images, world/Ukraine maps, Load live comparison, and Open demo full-screen. These URLs are expected destinations, not evidence that publishing has finished.
