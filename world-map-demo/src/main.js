import 'ol/ol.css'
import './style.css'

import Map from 'ol/Map.js'
import View from 'ol/View.js'
import VectorLayer from 'ol/layer/Vector.js'
import VectorSource from 'ol/source/Vector.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import { Fill, Stroke, Style } from 'ol/style.js'

import { deserialize } from 'flatgeobuf/lib/mjs/ol.js'

import { equalEarth } from './projection.js'
import {
  get as getProjection,
  getTransform,
} from 'ol/proj.js'

import Graticule from 'ol/layer/Graticule.js'


const p4326 = getProjection('EPSG:4326')
const p8857 = getProjection('EPSG:8857')

console.log('4326 projection:', p4326)
console.log('8857 projection:', p8857)

const tx = getTransform(p4326, p8857)

console.log('transform function:', tx)
console.log(
  'transform test:',
  tx([180, 80], undefined, 2)
)

console.log('extent:', p8857.getExtent())
console.log('world extent:', p8857.getWorldExtent())
console.log('global:', p8857.isGlobal())

const toggleButton = document.getElementById('projection-toggle')
const projectionName = document.getElementById('projection-name')
const projectionDescription = document.getElementById(
  'projection-description'
)


// SOURCES
// --------------------------------------------------

const countriesSource = new VectorSource({
  wrapX: false,
})

const oceanSource = new VectorSource({
  wrapX: false,
})


const graticuleSource = new VectorSource({
  wrapX: false,
})


// --------------------------------------------------
// LAYERS
// --------------------------------------------------

const ocean = new VectorLayer({
  source: oceanSource,

  style: new Style({
    fill: new Fill({
      color: '#b9ced1',
    }),
  }),
})


const graticule = new VectorLayer({
  source: graticuleSource,

  style: new Style({
    stroke: new Stroke({
      color: 'rgba(70, 70, 70, 0.4)',
      width: 0.8,
    }),
  }),
})


const countries = new VectorLayer({
  source: countriesSource,

  style: new Style({
    fill: new Fill({
      color: '#e8e1d5',
    }),

    stroke: new Stroke({
      color: '#55524d',
      width: 0.7,
    }),
  }),
})


// --------------------------------------------------
// MAP
// --------------------------------------------------

const map = new Map({
  target: 'map',

  layers: [
    ocean,
    
    countries,
    graticule,
  ],

  view: new View({
    projection: equalEarth,
    center: [0, 0],
    zoom: 1,
    showFullExtent: true,
  }),
})


// --------------------------------------------------
// FLATGEOBUF
//
// Data remains EPSG:4326 on disk.
// FlatGeobuf creates the OL features in EPSG:8857.
// --------------------------------------------------
const toEqualEarth = getTransform('EPSG:4326', 'EPSG:8857')
const toMercator = getTransform('EPSG:4326', 'EPSG:3857')

async function loadFlatGeobuf(url, targetSource, transformFn) {
  const response = await fetch(url)

  for await (const feature of deserialize(response.body)) {
    feature.getGeometry().applyTransform(transformFn)
    targetSource.addFeature(feature)
  }
}

async function loadGraticule(url, targetSource, transformFn) {
  const response = await fetch(url)

  for await (const feature of deserialize(response.body)) {
    const geometry = feature.getGeometry()

    // Keep vertices just inside the antimeridian seam
    geometry.applyTransform((input, output, dimension) => {
      output = output || input

      for (let i = 0; i < input.length; i += dimension) {
        let lon = input[i]

        if (lon >= 180) lon = 179.999
        if (lon <= -180) lon = -179.999

        output[i] = lon
        output[i + 1] = input[i + 1]
      }

      return output
    })

    geometry.applyTransform(transformFn)
    targetSource.addFeature(feature)
  }
}


// --------------------------------------------------
// LOAD DATA
// --------------------------------------------------

async function loadProjection(projectionCode) {
  countriesSource.clear()
  oceanSource.clear()
  graticuleSource.clear()

  const isEqualEarth = projectionCode === 'EPSG:8857'

  const transformFn = isEqualEarth
    ? toEqualEarth
    : toMercator

  map.setView(
    new View({
      projection: isEqualEarth
        ? equalEarth
        : 'EPSG:3857',

      center: [0, 0],

      zoom: isEqualEarth ? 1 : 1.8,

      showFullExtent: true,
    })
  )

  await Promise.all([
    loadFlatGeobuf(
      '/data/ocean.fgb',
      oceanSource,
      transformFn
    ),

    loadGraticule(
      '/data/graticules.fgb',
      graticuleSource,
      transformFn
    ),

    loadFlatGeobuf(
      '/data/countries3.fgb',
      countriesSource,
      transformFn
    ),
  ])

//   // map.getView().fit(oceanSource.getExtent(), {
//   // padding: [40, 40, 40, 40],
//   // duration: 0,
//   // zoom: isEqualEarth ? 1 : 1.7,
// })
}

loadProjection('EPSG:8857')

let currentProjection = 'EPSG:8857'

const projectionLabel =
  document.getElementById('projection-label')



toggleButton.addEventListener('click', async () => {
  toggleButton.disabled = true

  if (currentProjection === 'EPSG:8857') {
    await loadProjection('EPSG:3857')

    currentProjection = 'EPSG:3857'
    toggleButton.textContent = 'Switch to Equal Earth'
    projectionName.textContent = 'Web Mercator'
projectionDescription.textContent = 'EPSG:3857 · Conformal'
toggleButton.textContent = 'Switch to Equal Earth'
    
    
  } else {
    await loadProjection('EPSG:8857')

    currentProjection = 'EPSG:8857'
    toggleButton.textContent = 'Switch to Web Mercator'
    projectionName.textContent = 'Equal Earth'
projectionDescription.textContent = 'EPSG:8857 · Equal-area'
toggleButton.textContent = 'Switch to Web Mercator'
  }

  toggleButton.disabled = false
})