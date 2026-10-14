# Web Maps Beyond Mercator

A Slidev deck for a 10–15 minute Esri Solution Engineer final interview. Sixteen talk slides plus four appendix slides. The opening four slides are preserved; the middle focuses on the OpenLayers/proj4js stack, the same-data D3 SVG renderer, and a worked QGIS/Ukraine hexagon example. Speaker notes target about 12½ minutes.

## Run locally

Requires Node.js 22.12 or later and npm. Use two PowerShell windows.

Start your existing map:

```powershell
cd C:\Users\amyra\Documents\NewProjects\esri-interview\world-map-demo
npm run dev -- --port 5173 --strictPort
```

Start the deck:

```powershell
cd C:\Users\amyra\Documents\NewProjects\esri-interview\presentation
npm install
npm run dev
```

Open http://localhost:3030. Use arrow keys or Space to advance. Presenter view and notes: http://localhost:3030/presenter. Slide 6 contains the original live demo. Click **Load live comparison** or **Open demo full-screen**. Click outside the iframe before using deck shortcuts. Keep the map window open so you can switch to it immediately.

If the demo runs elsewhere, copy `.env.example` to `.env.local`, change `VITE_DEMO_URL`, and restart the deck. The link is configurable; no map source files are modified by this presentation.

## New working examples

- **Slide 9:** D3 SVG map reading the same `countries.fgb` bytes as the original demo. Toggle Equal Earth/Web Mercator, hover a country, and use Save SVG.
- **Slide 10:** One continuous Albers tessellation displayed in Albers and Web Mercator.
- **Slide 11:** the actual Projection Wizard recommendation for 22–41° E, 44–53° N.
- **Slide 12:** QGIS custom CRS and verified hex construction workflow.
- **Slide 13:** register that CRS with proj4js/OpenLayers, including explicit zero offsets.
- **Slide 14:** The same continuous equal-ground-area hex grid, with a selector that switches the entire Ukraine map between Albers and Web Mercator.

The D3 and Ukraine examples are bundled locally and need only the deck server. No external basemap or point dataset is required.

Open `analysis/ukraine-tessellation.qgz` with `analysis/ukraine-tessellation.gpkg` beside it. The native Albers grid contains adjoining full cells across the study extent. See `analysis/README.md` for the workflow. There is no clipping, binning or aggregation.

## Edit and build

Edit `slides.md` for content and notes, `styles/index.css` for styling, and `components/DemoFrame.vue` for demo embedding.

```powershell
npm run build
npm run preview
```

The static build is in `dist/`. Serve it over HTTP. The live demo still requires its own running server; localhost links point to the viewer's computer. This is intended for local presentation, not a publicly hosted live demo.

Optional PDF export uses Playwright/Chromium, installed separately if needed:

```powershell
npm install -D playwright-chromium
npm run export
```

An iframe is interactive only in the web deck. For PDF or a failed live demo, use the saved world comparison on slide 19 and the QGIS evidence on slide 17.

## Interview preflight

- Start both servers and test the toggle before entering the room.
- Load slide 6; open the original demo full-screen and confirm the data has loaded.
- Keep presenter notes on a second screen if available.
- The 12½-minute timing leaves room for a slower demo. Appendix slides are outside the timed talk.
- Ukraine is a worked geometry example. The historical reference outline is not a current territorial-control product.
- The browser uses proj4js. Native PROJ is discussed as part of the wider toolchain.

## Preservation

The deck has a separate package and dependencies. The existing demo's projection definitions, data, source code and package files are untouched.



