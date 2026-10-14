---
theme: default
layout: default
title: Web Maps Beyond Mercator
info: A 14-minute technical presentation for an Esri Solution Engineer interview
class: statement
fonts:
  sans: Segoe UI
  local: Segoe UI
drawings:
  persist: false
transition: fade
mdc: true
---
<div class="rule"></div>


# Web Maps<br>Beyond Mercator

Choosing projections, data formats and development libraries<br> for thematic web maps

<div class="eyebrow">Amy Raum <br> Digital Cartographer</div>

<!--
0:00–0:30 | Opening

-->

---

# Overview

## Projections
Quick review and tools

## Data
Cartographic control = Vector, file type options

## Two Case Studies
A world map and Ukraine

<!--
0:30–0:45 | Agenda
I'll start with a quick review of projections, then discuss the vector data behind the map. I'll use the world map and Ukraine hexagon examples to connect those choices to the story and the reader's experience.
-->

---

# Projection tradeoffs


<div class="projection-google-grid">
<div class="projection-summary">
<h2>Equal area</h2><p>Preserves relative area</p>
<h2>Conformal</h2><p>Preserves local angles</p>
<h2>Equidistant</h2><p>Preserves specified distances</p>
</div>
<figure>
<PagesImage src="google-maps-opening.png" alt="Google Maps opening interface showing its flat Web Mercator basemap across the Atlantic, Europe and Africa" />
<figcaption>Google Maps · Familiar Web Mercator basemap</figcaption>
</figure>
</div>

<!--
0:45–1:30 | Tradeoffs
There is no flat map that preserves everything. Equal area is useful when area is the denominator. Conformal projections preserve local angles, which matters for some navigation and surveying tasks. Equidistant does not mean every pair of points has a true distance: the preservation is specific to the projection. Extent matters as much as the projection family. A world overview and a regional operations map may need different choices.
Source: https://pubs.usgs.gov/gip/70047422/report.pdf
Image: screenshot of https://www.google.com/maps/@20,0,3z captured 13 October 2026. Google Maps logo and map-data attribution retained. Shows the flat map interface, not globe mode. Equal-area projections still change shape, angles and distance; conformal projections change area and scale; equidistant projections change other distances and area. Local angles are preserved on the projection's reference surface; Web Mercator's spherical model is not perfectly conformal on the WGS 84 ellipsoid.
-->

---

# Web Mercator became the standard

<p class="lead">Suited pan-and-zoom functionality<br>and navigation </p>

- Familiar local shapes for streets and landmarks
- Consistent north-up orientation across the map
- Rectangular coordinates support a regular tile pyramid

<div class="rule"></div>

**But not all web maps are for local navigation - cartographers tell stories**

<!--
1:30–2:15 | Web standard
This slide explains technical suitability for interactive navigation, rather than claiming shared conventions caused the original adoption. Web Mercator retains a familiar local appearance, keeps north up, and supports rectangular tile pyramids. Other projections can also support tiling and north-up maps; these properties are useful in combination, not unique to Mercator. The standard tiled world excludes the poles. Web Mercator uses spherical Mercator equations with WGS 84 coordinates; avoid calling it perfectly conformal on the ellipsoid. Its locally familiar appearance does not make its planar measurements reliable everywhere. The important distinction is between displaying data and calculating results.
Sources: https://developers.arcgis.com/documentation/spatial-references/
https://pro.arcgis.com/en/pro-app/3.4/help/mapping/properties/mercator.htm
-->

---

#  Alternatives to Mercator

<p class="small">UN “Correct the Map” resolution · 4 September 2026 · Encourages equal-area world maps</p>

<div class="world-story-maps">
<figure><PagesImage src="robinson-world.png" alt="World countries and graticule in the Robinson compromise projection" /><figcaption><strong>Robinson</strong> · A compromise world view</figcaption></figure>
<figure><PagesImage src="equal-earth-patterson-map.jpg" alt="Equal Earth world projection illustration published by Esri ArcUser" /><figcaption><strong>Equal Earth</strong> · Preserves relative area<br>Patterson · Šavrič · Jenny, 2018</figcaption></figure>
</div>

<p class="world-story-history"><strong>OSS → CIA:</strong> Arthur Robinson began the cartography section in 1941.</p>

<p class="world-story-takeaway">Flexible choices, chosen for aesthetics and story</p>

<!--
2:15–3:00 | Worldwide stories and cartographic choices
The September 2026 UN resolution encourages Equal Earth and other equal-area world maps when relative size matters, and teaching the limitations of flat maps. It does not prohibit Mercator for navigation or replace every operational CRS.
Arthur Robinson began the COI cartography section in October 1941. The work continued through OSS, then the State Department and CIG, into CIA in 1947. The Robinson projection shown here is his later compromise world projection, not an equal-area projection and not a wartime OSS invention. This image is a new rendering of our demo data, not a historical CIA map.
CIA's published cartography history includes a 1950 international-trade map: a useful example of mapping relationships across countries rather than just locating places. Worldwide thematic stories might concern trade, resources, population or environmental exposure. Those are examples of questions, not data encoded in these two reference images.
My aim is to help users build a flexible understanding of the Earth and its depictions. Choose the projection, extent, data and symbols that support the relationship being explained. Equal area preserves relative area; it does not remove the need to choose appropriate thematic measures or normalization. This leads into my demo: the same geographic features, with a flexible display rather than one fixed world view.
Sources: https://www.un.org/en/unis-nairobi/un-tells-world-stop-making-africa-look-small
https://www.cia.gov/stories/story/the-mapmakers-craft-a-history-of-cartography-at-cia/
https://www.esri.com/about/newsroom/arcuser/equal-earth
https://proj.org/en/stable/operations/projections/robin.html
Images: Robinson rendered in QGIS from the original demo countries.fgb, with a generated graticule, +proj=robin +lon_0=0 +datum=WGS84. Equal Earth illustration: https://www.esri.com/about/newsroom/app/uploads/2019/01/auwin19_equal_1.jpg (Esri ArcUser, Winter 2019).
-->

---

# Custom regional projections

<p class="lead">Choose a projection for the region and the story.</p>

<div style="display:grid;grid-template-columns:0.8fr 1.2fr;gap:24px;align-items:center">
<div>

- Consider the region’s extent and shape
- Decide which properties matter most
- Use tools to explore the tradeoffs

[Projection Wizard ↗](https://projectionwizard.org/) helps narrow the choices.

</div>
<figure style="margin:0">
<PagesImage src="ukraine/projection-wizard.png" alt="Projection Wizard showing a selected regional extent, distortion options and an Albers recommendation; Ukraine is the example region" style="width:100%;height:290px;object-fit:contain" />
<figcaption class="small">Select an extent and a property to preserve · Ukraine shown as an example</figcaption>
</figure>
</div>

<!--
3:00–3:35 | Custom regional projections
There are familiar projections for the whole world, but we can also choose and customize a projection for a particular region. The region's extent and shape matter, along with whether the story depends on area, local angles or particular distances. No flat map preserves everything, so we decide which tradeoffs fit the purpose.
That is a lot to consider. Tools such as Projection Wizard help us explore the choices: select the region, choose a property to preserve, and review the recommendation and preview. This screenshot uses Ukraine simply as an example of that process. The broader point is that we can tailor the projection to the area we are mapping.
The tool can also provide a PROJ definition to carry into GIS software. We will return to this specific definition in the later Ukraine workflow. A recommendation is a starting point to check against the map's requirements.
Source: https://projectionwizard.org/
Image: existing saved Projection Wizard screenshot, public/ukraine/projection-wizard.png.
-->

---

# Vector data for reprojection

<p class="lead">Points, lines and polygons defined by coordinates.</p>

- Projection algorithms transform the coordinates
- The renderer redraws the geometry in the chosen map view
- Feature attributes stay connected to the geometry

<div class="rule"></div>

**The same features. A different depiction.**

<!--
3:35–4:20 | Vector data for reprojection
Vector is my preference for these maps because I can work directly with the geometry. Points are coordinate locations; lines and polygons connect coordinates to describe routes, boundaries and areas. Mathematical projection algorithms transform those coordinates, and the renderer draws the features in the new view. That lets me change the depiction while keeping the feature attributes connected.
The source CRS tells us how to interpret the coordinates, and the target CRS determines the map view. Reprojection changes the coordinate representation, not the underlying real-world feature. Curved edges may require extra vertices for an accurate depiction. Raster can also be reprojected, but that involves resampling pixels; vector is a useful fit for the discrete features in these examples.
Source: https://docs.qgis.org/3.44/en/docs/gentle_gis_introduction/vector_data.html
Implementation: public/world/countries.fgb and components/UkraineHexMap.vue.
-->

---

# Vector formats for the web

| Format or delivery approach | What it offers |
| --- | --- |
| **GeoJSON** | Readable JSON with geometry and attributes |
| **TopoJSON** | Encodes shared boundaries as reusable arcs |
| **FlatGeobuf** | Binary features with optional spatial indexing |
| **Vector tiles** | Deliver geometry in tiles for the current view and zoom |

**The format affects delivery. The map client must support the projection.**

<!--
4:20–5:05 | Vector formats for the web
There are several ways to package vector geometry. GeoJSON is readable and widely supported. TopoJSON encodes topology, so adjacent polygons can share boundary arcs instead of repeating them. FlatGeobuf is a binary feature format that supports streaming and optional spatial indexing. Vector tiles divide geometry into tiles for delivery at different zoom levels; they are a delivery approach with formats such as Mapbox Vector Tiles.
These choices do not automatically provide arbitrary reprojection. The renderer, coordinate reference system and delivery scheme still have to work together. Vector tiles may be clipped, simplified and tied to a particular tile grid, so they are not interchangeable with full source features for every task.
In this project, FlatGeobuf delivers the world features and GeoJSON delivers the Ukraine grid. The world demo loads the whole collection rather than using an extent query. TopoJSON and vector tiles are alternatives discussed here, not formats implemented in these demos. GeoPackage remains the desktop container for building and checking the Ukraine grid.
Sources: https://geojson.org/
https://github.com/topojson/topojson-specification
https://flatgeobuf.org/
https://mapbox.github.io/vector-tile-spec/
Project evidence: analysis/ukraine-tessellation.gpkg, public/world/countries.fgb, components/UkraineHexMap.vue.
-->

---

# Why OpenLayers or D3?

<p class="lead">Two javascript libraries to bring vector maps into the browser.</p>

## OpenLayers
Full mapping library: layers, navigation and feature interaction, with flexible projection support.

## D3
Data visualization library: geographic projections and SVG graphics.



<!--
5:05–5:45 | Why OpenLayers or D3?
Both OpenLayers and D3 can bring vector maps into the browser, but they offer different starting points. OpenLayers is a robust JavaScript mapping library. It provides map layers, navigation and feature interaction, with flexible projection support. It fits the interactive map experience I wanted for the world demo.
D3 is a broader data visualization library with geographic projection tools. It gives me control over SVG paths, symbols and labels for a custom thematic graphic. It can also support interaction, but I would assemble more of the mapping behavior myself.
I would choose between them based on the reader's experience and the deliverable. OpenLayers fits a map people explore; D3 fits a bespoke graphic integrated with an article or visualization. The appendix shows the same country data rendered with D3.
Sources: https://openlayers.org/doc/faq.html
https://d3js.org/
https://d3js.org/d3-geo
-->

---

# An world map within an intel story

<p class="lead">An inline thematic map: a worldwide overview, with country-level detail when readers need it.</p>

- **Overview:** choropleth showing resource or policy pattern
- **Explore:** select a country for values, context and sources
- **Design:** match the office’s cartographic standards
- **Technology:** support the projection, styling and interaction



<!--
5:45–6:25 | A world map within the story
My work supports thematic storytelling in a classified environment. Here I am using public data to illustrate the design and technology choices, rather than showing an operational product.
Imagine this map embedded in an article about a resource or policy. A choropleth gives readers the worldwide pattern; country selection could offer values, context and sources for a deeper look. The example is conceptual: the current world demo shows projection switching, not a completed choropleth or country-detail article.
Equal Earth gives readers another depiction of the Earth while supporting the office's cartographic standards. Projection is one part of the visual design and user experience, alongside data classification, symbols, labels and interaction. Those requirements influence our technology choice.
I can describe the process and my contribution to making evidence understandable; I am not claiming access to downstream customer decisions. The public demonstrations that follow isolate individual parts of that workflow.
-->

---
class: demo-slide
---

# My demo: OpenLayers + proj4js

<DemoFrame />

<!--
6:25–7:25 | The existing world demo
This is the demo I built using OpenLayers and the proj4 JavaScript library. All country features come from the same EPSG:4326 FlatGeobuf. OpenLayers displays the transformed features and handles pan and zoom. proj4js provides the additional coordinate transformation. Toggle once to Web Mercator and back; point briefly to Greenland and Africa. Move into the implementation, rather than spending the whole talk on projection theory.
The original demo source is unchanged. It reloads each FlatGeobuf and transforms fresh geometry when the projection changes. Its spherical Equal Earth definition is registered under EPSG:8857; describe it as this demo's implementation, not proof of an authoritative ellipsoidal pipeline. The demo uses independent starting zooms, not calibrated equal-scale views. If it fails, use the saved world comparison in the appendix.
Sources: ../world-map-demo/src/main.js and src/projection.js
https://openlayers.org/doc/faq.html
-->

---

# What the code does

<div class="stack-flow">EPSG:4326 FlatGeobuf → proj4js → OpenLayers</div>

```js
proj4.defs('EPSG:8857', equalEarthDefinition)
register(proj4) // ol/proj/proj4.js

const transform = getTransform('EPSG:4326', 'EPSG:8857')
feature.getGeometry().applyTransform(transform)
```

**Data coordinates, transformation, and map view are separate choices.**

<!--
7:25–8:05 | Explain the stack
FlatGeobuf is the binary data format; the geographic coordinates stay on disk in EPSG:4326. proj4js registers the additional transform, and OpenLayers draws vector features in the chosen view CRS. Vite provides local development and bundling. The current demo streams all the features; although FlatGeobuf supports spatial indexing and range-based access, I am not claiming this demo uses an extent query or server-side analysis. The code shown is an excerpt of its behavior, not a full replacement implementation. Native PROJ, used in QGIS, and proj4js are different libraries and must be checked for the operations we need.
Sources: https://openlayers.org/doc/faq.html
https://flatgeobuf.org/
https://github.com/proj4js/proj4js
-->

---

# Ukraine: change over time

<p class="lead">Hexbins provided a consistent spatial framework for evaluating change over time.</p>

- The published work examined the pacing of change
- Repeated spatial units supported comparison across time

<div class="rule"></div>

**The story shaped the choice of map.**

<!--
8:05–9:20 | Ukraine: change over time
A published Ukraine piece gives another example of how the story shapes the map. We chose hex bins to evaluate change over time and communicate its pacing. I can speak to the stalemate narrative from that work. The grid demonstration that follows illustrates the spatial framework behind that kind of comparison.
Describe the published work's actual timeframe and findings in your own words. Explain what changed over the period and how its pacing contributed to the narrative. Do not imply that the demonstration contains the published observations or proves a stalemate.
Context: presenter describes a published work elsewhere. No conflict observations, territorial-control time series, or published article have been supplied with this deck. The statement about the choice of hex bins comes from the presenter's account.
-->

---

# Equal areas support comparison

<p class="lead">Consistent cell areas make spatial comparisons meaningful.</p>

- Equal-area construction gives the cells a consistent ground area
- A stable grid provides the spatial framework for comparing time periods
- Display choices shape the reader's experience

<div style="display:flex;align-items:center;gap:18px;margin-top:26px" role="img" aria-label="Legend: one hexagon represents 1000 square kilometers">
<svg width="74" height="66" viewBox="0 0 74 66" aria-hidden="true" style="flex:none"><polygon points="19,3 55,3 72,33 55,63 19,63 2,33" fill="#70a6ad" stroke="#18373b" stroke-width="2" /></svg>
<div><strong style="font-size:26px">1 hexagon = 1,000 km²</strong><div class="small">Equal ground area per full cell</div></div>
</div>
<!--
9:20–10:00 | Equal areas support comparison
Each full cell in the demonstration represents 1,000 km², constructed in the Albers equal-area CRS and checked with WGS84 measurements.
Projection was a smaller consideration within that project, but it mattered to the hexagons. We needed cells that consistently represented equal ground areas. That gives the comparison a stable spatial basis as we evaluate change over time. We also wanted readers to explore the map smoothly.
Equal areas address the spatial basis of comparison. Comparing time periods also requires consistent definitions and comparable temporal coverage. The bundled demonstration isolates grid construction and display. It does not aggregate observations or perform temporal analysis.
The next slide uses the existing QGIS renders of one continuous Albers tessellation. Both images display the same geometry and saved ground-area attributes.
-->

---

# Same grid, different map views

<div class="comparison qgis-comparison">
<div><PagesImage src="hex-comparison/albers-grid.png" alt="Continuous regular hex tessellation in Ukraine Albers" /><p>Ukraine Albers equal area<br>Regular hexagons</p></div>
<div><PagesImage src="hex-comparison/mercator-grid.png" alt="The same Albers tessellation displayed in Web Mercator" /><p>Web Mercator display<br>Same ground areas, different appearance</p></div>
</div>

<p class="small">Natural Earth 1:50m outline · 1,000 km² full cells · Views fitted independently</p>

<!--
10:00–10:45 | Same grid, different map views
This demonstration isolates the projection question behind the spatial comparison. Create a continuous regular hex tessellation in the Ukraine Albers equal-area projection. Display that same layer first in Albers, then in Web Mercator by changing the project CRS. The ground area of each cell remains equal; display size and shape change. This is one dataset, not individually resized isolated cells. The grid covers the study bounding extent; it is not clipped because clipping would change edge-cell areas.
-->

---

# Create the equal-area tessellation in QGIS

1. Add the Ukraine Albers custom CRS from Projection Wizard
2. Open **Create grid → Hexagon (polygon)**
3. Choose **Ukraine Albers** as the grid CRS and the Ukraine extent
4. Set spacing to **33,980.885 m**, with **zero overlay**
5. Change the project CRS to compare Albers and Web Mercator

**Create the geometry once. Change its display projection.**

<!--
10:45–11:25 | Create the equal-area tessellation in QGIS
The bundled grid is generated by the native QGIS Create grid algorithm. All full native cells have equal planar area in an ellipsoidal equal-area CRS, corresponding to equal ground area. Densified edges preserve the native cell boundaries when exporting to geographic GeoJSON. QGIS WGS84 measurements verify the areas numerically. Do not clip the polygons in this demonstration; retain complete cells across the study extent.
-->

---

# Register the same CRS in OpenLayers

```js
const definition = '+proj=aea +lon_0=31.5 +lat_0=48.5 ' +
  '+lat_1=45.5 +lat_2=51.5 ' +
  '+datum=WGS84 +units=m +x_0=0 +y_0=0 +no_defs'
proj4.defs('UKRAINE:ALBERS', definition)
register(proj4)

const features = new GeoJSON().readFeatures(data, {
  dataProjection: 'EPSG:4326',
  featureProjection: 'UKRAINE:ALBERS',
})
const view = new View({ projection: 'UKRAINE:ALBERS' })
```

**QGIS builds the geometry. The browser transforms it for display.**

<!--
11:25–12:00 | Register the same CRS in OpenLayers
The continuous Albers tessellation is exported as densified EPSG:4326 GeoJSON. OpenLayers transforms that same dataset into the selected Albers or Web Mercator view registered with proj4js. Explicit zero offsets avoid ambiguous library defaults. The custom identifier is an application name, not an EPSG code. No areas are recomputed in the browser; the verified WGS84 ground-area attributes travel with the geometry.
Source: https://openlayers.org/doc/faq.html
https://proj.org/en/stable/operations/projections/aea.html
-->

---
class: demo-slide
---

# One grid, two map projections

<UkraineHexMap />

<!--
12:00–12:45 | One grid, two map projections
Begin in Ukraine Albers: the hexagons form a continuous regular tessellation. Switch Map projection to Web Mercator. The entire outline and the same cells transform together. Their ground areas remain equal; their displayed sizes and shapes change. Click any cell to inspect its saved WGS84 area. Show matched cell zooms into the same reference cell. This is the grid construction and display workflow confirmed in QGIS, with no observations or binning.
-->

---

# Match the technology to the deliverable

| Requirement | Choice in this example |
| --- | --- |
| Build and verify geometry | QGIS + PROJ · GeoPackage |
| Interactive map in a custom CRS | OpenLayers + proj4js |
| Thematic figure and SVG export | D3 · same source features |
| Integrate with an Esri environment | Explicit CRS, services, client validation |

**Agree on the data and analysis contract before choosing the renderer.**

<!--
12:45–13:20 | Match the technology to the deliverable
This is the part of the story I would bring to a customer: what needs to be created, what needs to be verified, and how will it be delivered? GeoPackage keeps editable layers and CRS metadata for desktop inspection; GeoJSON and FlatGeobuf deliver features to browser code. OpenLayers fits this custom-CRS interaction; D3 fits an SVG figure. These are complementary choices.
For an Esri deployment, the same principle applies: prepare and verify geometry in ArcGIS Pro or an interoperable workflow, publish with explicit spatial references, and test the service, client, and basemap together. ArcGIS analysis tools can use projected or geodesic methods even when the display is Web Mercator. I would validate the target application's actual capabilities, rather than imply a library comparison proves anything about the whole ArcGIS platform.
Sources: https://www.esri.com/arcgis-blog/products/arcgis-online/analytics/the-answer-to-your-question-on-online-analysis-and-projection
https://learn.arcgis.com/en/projects/make-a-web-map-without-web-mercator/
-->

---
class: statement
---

# Match the stack<br>to the task

<div class="rule"></div>

Choose the data and analysis CRS.<br>Build and verify the geometry.<br>Deliver it with the right renderer.

<!--
13:20–13:45 | Match the stack to the task
The world demo shows that a browser can display the same features through different projections. The published Ukraine example explains why pacing and comparison over time shaped the choice of hex bins. The public Ukraine demonstration displays one continuous equal-ground-area tessellation in two projections. The saved ground areas remain fixed as the whole map changes projection. The technology choices make that workflow possible and reproducible. Thank you.
Timing: target approximately 14 minutes, including the spoken published-work example. To shorten, summarize the QGIS setup and use one brief toggle per demo. The published-work narrative is spoken context, while the bundled Ukraine maps demonstrate geometry and display.
-->

---

# Comparison cells across Ukraine

<div class="comparison qgis-comparison">
<div><PagesImage src="hex-comparison/albers-grid.png" alt="Albers tessellation" /><p>Albers display</p></div>
<div><PagesImage src="hex-comparison/mercator-grid.png" alt="Same tessellation in Mercator" /><p>Web Mercator display</p></div>
</div>

<p class="small">Same continuous equal-area tessellation · Views fitted independently · No clipping or binning</p>

<!-- Full-cell Albers grid, reprojected for display. Boundary: user-supplied Natural Earth 1:50 million Ukraine, world-map-demo/public/data/ukraine.geojson; reference outline as supplied, omitting the main Crimean peninsula; not a current territorial-control map. -->

---

# Projection Wizard · saved recommendation

<PagesImage class="wizard-image" src="ukraine/projection-wizard.png" alt="Actual Projection Wizard recommendation and PROJ string for the Ukraine extent" />

<p class="small">Equal area · 22–41° E, 44–53° N · WGS84 · Meters</p>

<!--
Appendix, outside the timed talk. The screenshot was captured from Projection Wizard after setting the stated extent and opening the PROJ dialog. The exact definition is also saved as plain text and WKT in the analysis folder.
Source: https://projectionwizard.org/
-->

---

# World demo · saved comparison

<div class="comparison">
<div><PagesImage src="equal-earth.png" alt="Equal Earth view from the original OpenLayers demo" /><p>Equal Earth</p></div>
<div><PagesImage src="web-mercator.png" alt="Web Mercator view from the original OpenLayers demo" /><p>Web Mercator</p></div>
</div>

<p class="small">Same original features · Independently tuned framing, not an equal-scale comparison</p>

<!--
Appendix, outside the timed talk. Fallback for the original world demo; the maps were captured from the user's unchanged demo. These screenshots do not establish calibrated area measurements.
-->

---
class: demo-slide
---

# The same data in D3 SVG

<WorldSvgMap />

<!--
Appendix | Working D3 comparison, outside the timed talk
This component reads a byte-for-byte copy of the same countries.fgb that the OpenLayers demo uses. It deserializes geographic features to GeoJSON objects and creates SVG paths with d3.geoPath and d3.geoEqualEarth or d3.geoMercator. Toggle the projection, hover a country, and optionally save the SVG. No country dataset has been substituted. The graticule and world frame are generated by D3, so they are not the original FlatGeobuf ocean and graticule layers.
D3 uses a different spherical polygon winding convention from RFC 7946. The renderer normalizes a copy for D3; the original data remains unchanged. D3's spherical projection and automatic fitting can produce different framing from the OpenLayers demo. This is a renderer comparison, not a calibrated overlay. SVG is useful for a thematic figure, custom labels, and export; I would not choose it solely to replace every GIS-client function.
Sources: https://d3js.org/d3-geo/path
https://d3js.org/d3-geo/projection
-->

---

# Technical references

<div class="technical-references">

[OpenLayers projection support](https://openlayers.org/doc/faq.html) · [proj4js](https://github.com/proj4js/proj4js)<br><br>
[Leaflet CRS](https://leafletjs.com/reference-2.0.0.html) · [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) · [MapLibre projection API](https://maplibre.org/maplibre-style-spec/projection/)<br><br>
[D3 geographic paths](https://d3js.org/d3-geo/path) · [FlatGeobuf](https://flatgeobuf.org/)<br><br>
[Projection Wizard](https://projectionwizard.org/) · [QGIS custom CRS](https://docs.qgis.org/3.38/en/docs/user_manual/working_with_projections/working_with_projections.html) · [QGIS Create Grid](https://docs.qgis.org/3.38/en/docs/user_manual/processing_algs/qgis/vectorcreation.html)<br><br>
[Ukraine boundary provenance](https://www.geoboundaries.org/api/current/gbOpen/UKR/ADM0/) · [ArcGIS analysis and projection](https://www.esri.com/arcgis-blog/products/arcgis-online/analytics/the-answer-to-your-question-on-online-analysis-and-projection)

</div>

<!--
Appendix, outside the timed talk. Individual slides contain source and implementation notes. The first four slides retain their existing notes and citations.
-->


