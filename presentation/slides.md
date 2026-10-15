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

<div class="eyebrow">Amy Raum</div>

<!--
0:00–0:30 | Opening

-->

---

# Overview

## Projections
Quick review and tools

## Data
Vector geometry and web formats

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
<img src="/google-maps-opening.png" alt="Google Maps opening interface showing its flat Web Mercator basemap across the Atlantic, Europe and Africa" />
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



<div class="world-story-maps">
<figure><img src="/robinson-world.png" alt="World countries and graticule in the Robinson compromise projection" /><figcaption><strong>Robinson</strong> · A compromise world view</figcaption></figure>
<figure><img src="/equal-earth-patterson-map.jpg" alt="Equal Earth world projection illustration published by Esri ArcUser" /><figcaption><strong>Equal Earth</strong> </figcaption></figure>
</div>

<p class="world-story-history"><strong>OSS → CIA:</strong> Arthur Robinson began the cartography section in 1941.</p>

<p class="world-story-history">UN “Correct the Map” resolution · 4 September 2026 · Encourages equal-area world maps</p>

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
<img src="/ukraine/projection-wizard.png" alt="Projection Wizard showing a selected regional extent, distortion options and an Albers recommendation; Ukraine is the example region" style="width:100%;height:290px;object-fit:contain" />
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
- The renderer draws the geometry in the chosen map view
- Feature attributes stay connected to the geometry

<div class="rule"></div>



<!--
3:35–4:20 | Vector data for reprojection
Vector is my preference for these maps because I can work directly with the geometry. Points are coordinate locations; lines and polygons connect coordinates to describe routes, boundaries and areas. Mathematical projection algorithms transform those coordinates, and the renderer draws the features in the new view. That lets me change the depiction while keeping the feature attributes connected.
The source CRS tells us how to interpret the coordinates, and the target CRS determines the map view. Reprojection changes the coordinate representation, not the underlying real-world feature. Curved edges may require extra vertices for an accurate depiction. Raster can also be reprojected, but that involves resampling pixels; vector is a useful fit for the discrete features in these examples.
Source: https://docs.qgis.org/3.44/en/docs/gentle_gis_introduction/vector_data.html
Implementation: public/world/countries.fgb and components/UkraineHexMap.vue.
-->

---

# Vector formats for the web

| Format | What it offers |
| --- | --- |
| **GeoJSON** | Readable JSON with geometry and attributes |
| **TopoJSON** | Encodes shared boundaries as reusable arcs |
| **FlatGeobuf** | Binary features with optional spatial indexing |
| **Vector tiles** | Deliver geometry in tiles for the current view and zoom |

**Choose the format for the data size and delivery needs. Check projection support in the map library.**

<!--
4:20–5:05 | Vector formats for the web
There are several ways to package vector geometry. GeoJSON is readable and widely supported. TopoJSON encodes topology, so adjacent polygons can share boundary arcs instead of repeating them. FlatGeobuf is a binary feature format that supports streaming and optional spatial indexing. Vector tiles divide geometry into tiles for delivery at different zoom levels; they are a delivery approach with formats such as Mapbox Vector Tiles.
These choices do not automatically provide arbitrary reprojection. The renderer, coordinate reference system and delivery scheme still have to work together. Vector tiles may be clipped, simplified and tied to a particular tile grid, so they are not interchangeable with full source features for every task.
In this project, FlatGeobuf delivers the world features and FlatGeobuf delivers the Ukraine grid. The world demo loads the whole collection rather than using an extent query. TopoJSON and vector tiles are alternatives discussed here, not formats implemented in these demos. GeoPackage remains the desktop container for building and checking the Ukraine grid.
Sources: https://geojson.org/
https://github.com/topojson/topojson-specification
https://flatgeobuf.org/
https://mapbox.github.io/vector-tile-spec/
Project evidence: analysis/ukraine-tessellation.gpkg, public/world/countries.fgb, public/hex-comparison/albers-grid.fgb, components/UkraineHexMap.vue.
-->

---

# Why OpenLayers or D3?

<p class="lead">Two JavaScript libraries to bring vector maps into the browser.</p>

## OpenLayers
Full mapping library: layers, navigation and feature interaction, with flexible projection support.

## D3
Data visualization library: geographic projections and SVG graphics.



<!--
5:05–5:45 | Why OpenLayers or D3?
Both OpenLayers and D3 can bring vector maps into the browser, but they offer different starting points. OpenLayers is a robust JavaScript mapping library. It provides map layers, navigation and feature interaction, with flexible projection support. It fits the interactive map experience I wanted for the world demo.
D3 is a broader data visualization library with geographic projection tools. It gives me control over SVG paths, symbols and labels for a custom thematic graphic. It can also support interaction, but I would assemble more of the mapping behavior myself.
I would choose between them based on the reader's experience and the deliverable. OpenLayers fits a map people explore; D3 fits a bespoke graphic integrated with an article or visualization. For this presentation, the working maps use OpenLayers. D3 is an alternative when the deliverable calls for a custom SVG graphic.
Sources: https://openlayers.org/doc/faq.html
https://d3js.org/
https://d3js.org/d3-geo
-->

---

# A world map for intelligence stories

<p class="lead">An inline thematic map: a worldwide overview, with country-level detail when readers need it.</p>

- **Overview:** choropleth showing resource or policy pattern
- **Explore:** select a country for values, context and sources
- **Design:** match the office’s cartographic standards
- **Technology:** support projection, styling and interaction



<!--
5:45–6:25 | A world map within the story
My work supports thematic storytelling in a classified environment. Here I am using public data to illustrate the design and technology choices, rather than showing an operational product.
Imagine this map embedded in an article about a resource or policy. A choropleth gives readers the worldwide pattern; country selection could offer values, context and sources for a deeper look. The example is conceptual: the current world demo shows projection switching, not a completed choropleth or country-detail article.
Equal Earth gives readers another depiction of the Earth while supporting the office's cartographic standards. Projection is one part of the visual design and user experience, alongside data classification, symbols, labels and interaction. I needed a library that could display those projections and support country selection.
I can describe the process and my contribution to making evidence understandable; I am not claiming access to downstream customer decisions. The public demonstrations that follow isolate individual parts of that workflow.
-->

---
class: demo-slide
---

# OpenLayers Demo

<DemoFrame />

<!--
6:25–7:25 | The existing world demo
This is the demo I built using OpenLayers and the proj4 JavaScript library. All country features come from the same EPSG:4326 FlatGeobuf. OpenLayers displays the transformed features and handles pan and zoom. proj4js provides the additional coordinate transformation. Toggle once to Web Mercator and back; point briefly to Greenland and Africa. Move into the implementation, rather than spending the whole talk on projection theory.
The original demo source is unchanged. It reloads each FlatGeobuf and transforms fresh geometry when the projection changes. Its spherical Equal Earth definition is registered under EPSG:8857; describe it as this demo's implementation, not proof of an authoritative ellipsoidal pipeline. The demo uses independent starting zooms, not calibrated equal-scale views. Keep the local version available as a backup for the live demonstration.
Sources: ../world-map-demo/src/main.js and src/projection.js
https://openlayers.org/doc/faq.html
-->

---

# What the code does

<div class="stack-flow"> FlatGeobuf → proj4js → OpenLayers</div>

```js
proj4.defs('EPSG:8857', equalEarthDefinition)
register(proj4) 

const transform = getTransform('EPSG:4326', 'EPSG:8857')
feature.getGeometry().applyTransform(transform)
```


<!--
7:25–8:05 | Explain the stack
FlatGeobuf is the binary data format; the geographic coordinates stay on disk in EPSG:4326. proj4js registers the additional transform, and OpenLayers draws vector features in the chosen view CRS. Vite provides local development and bundling. The current demo streams all the features; although FlatGeobuf supports spatial indexing and range-based access, I am not claiming this demo uses an extent query or server-side analysis. The code shown is an excerpt of its behavior, not a full replacement implementation. Native PROJ, used in QGIS, and proj4js are different libraries and must be checked for the operations we need.
Sources: https://openlayers.org/doc/faq.html
https://flatgeobuf.org/
https://github.com/proj4js/proj4js
-->

---

# Ukraine: Change over time

<p class="lead">We used hexagons to compare where change occurred and how quickly.</p>

- The published work examined the pacing of change
- Using the same grid let us compare change over time
- Equal-area construction gives the cells a consistent ground area



<!--
8:05–9:20 | Ukraine: change over time
In the published Ukraine work, we used hex bins to compare change over time. Using the same cells made it easier to see where change happened and how quickly. That pacing was relevant to the stalemate narrative. Here I am demonstrating the grid construction and projection choices behind that approach.
The cartographic choice was to use hex bins for comparing change over time. The public demo here shows the grid and projection choices; it does not contain the published observations.
The published example and this demonstration serve different purposes: the published work examined the pacing of change, while this demo explains how the spatial units are constructed and displayed.
-->

---



# Create the equal-area tessellation in QGIS

1. Add the Ukraine Albers custom CRS from Projection Wizard
2. Open **Create grid → Hexagon (polygon)**
3. Choose **Ukraine Albers** as the grid CRS and the Ukraine extent

**In OpenLayers:** register the custom projection with proj4, then set the map view projection.

**Alternatively, in D3:** set the geographic projection used to draw the SVG map.

<!--
10:00–10:40 | Create the equal-area tessellation in QGIS
For browser delivery, register the custom CRS with the proj4 library and OpenLayers again, then set the map view to that projection. Alternatively, configure the corresponding geographic projection in D3 and use it to generate the SVG paths. D3 uses its own projection API rather than the OpenLayers registration workflow.
The bundled grid is generated by the native QGIS Create grid algorithm. All full native cells have equal planar area in an ellipsoidal equal-area CRS, corresponding to equal ground area. Densified edges preserve the native cell boundaries when exporting to geographic GeoJSON. QGIS WGS84 measurements verify the areas numerically. Do not clip the polygons in this demonstration; retain complete cells across the study extent.
-->

---
class: demo-slide
---

# Ukraine Grid Demo

<UkraineHexMap />

<!--
10:40–11:25 | Ukraine grid demo
Begin in Ukraine Albers: the hexagons form a continuous regular tessellation. Switch Map projection to Web Mercator. The entire outline and the same cells transform together. Their ground areas remain equal; their displayed sizes and shapes change. Point out that the same cells are being redrawn; each full cell still represents 1,000 km². This is the grid construction and display workflow confirmed in QGIS, with no observations or binning.
-->

---

# Projection, data and library limits

## Projection
Choose what to preserve for the region and the story.

## Data
Check the geometry, attributes and delivery format.

## Library limits
Confirm the projections and interactions the tools support.

<!--
11:25–12:00 | Wrap-up
The choices work together. Consider which projection supports the story and what distortions it introduces. Check the data: its geometry, attributes, coordinate reference system and delivery format. Then confirm that the library supports the projections and interactions the reader needs.
The world map and Ukraine grid show why these decisions matter together: the same features can have different depictions, while the underlying data and verified ground areas remain consistent. Thank you.
-->

---
class: statement
---

<div class="rule"></div>

# Questions?
