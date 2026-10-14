<script setup>
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
import { useIsSlideActive } from '@slidev/client'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorSource from 'ol/source/Vector.js'
import VectorLayer from 'ol/layer/Vector.js'
import { Fill, Stroke, Style } from 'ol/style.js'
import { register } from 'ol/proj/proj4.js'
import proj4 from 'proj4'
import 'ol/ol.css'

const target = ref(null), display = ref('UKRAINE:ALBERS'), error = ref('')
const active = useIsSlideActive()
let map, source, boundary, rawGrid, rawBoundary, resizeObserver
function fitMap() {
  if (!map || !target.value?.clientWidth || !target.value?.clientHeight) return
  map.updateSize()
  map.getView().fit(boundary.getExtent(), { size: map.getSize(), padding: [24,24,24,24], duration: 0 })
}
function refresh() {
  if (!map) return
  const format = new GeoJSON()
  const options = { dataProjection: 'EPSG:4326', featureProjection: display.value }
  source.clear(); source.addFeatures(format.readFeatures(rawGrid, options))
  boundary.clear(); boundary.addFeatures(format.readFeatures(rawBoundary, options))
  map.setView(new View({ projection: display.value, center: [0,0], zoom: 1 }))
  fitMap()
}
watch(display, refresh)
watch(active, async value => {
  if (!value) return
  display.value = 'UKRAINE:ALBERS'
  await nextTick()
  refresh()
})
onMounted(async () => {
  try {
    const result = await Promise.all(['grid-summary.json','ukraine-boundary.geojson','albers-grid.geojson'].map(async f => {
      const response = await fetch(import.meta.env.BASE_URL + 'hex-comparison/' + f)
      if (!response.ok) throw new Error('Could not load ' + f)
      return response.json()
    }))
    proj4.defs('UKRAINE:ALBERS', result[0].albers_definition); register(proj4)
    rawBoundary = result[1]; rawGrid = result[2]
    source = new VectorSource({ wrapX: false }); boundary = new VectorSource({ wrapX: false })
    const cells = new VectorLayer({ source, style: new Style({ fill: new Fill({ color: '#c5dbd8' }), stroke: new Stroke({ color: '#7ea5a5', width: 0.6 }) }) })
    const outline = new VectorLayer({ source: boundary, style: new Style({ stroke: new Stroke({ color: '#18373b', width: 2 }) }) })
    await nextTick()
    map = new Map({ target: target.value, layers: [cells,outline], controls: [], view: new View({ projection: 'UKRAINE:ALBERS', center: [0,0], zoom: 1 }) })
    refresh()
    resizeObserver = new ResizeObserver(fitMap)
    resizeObserver.observe(target.value)
  } catch (e) { error.value = e.message }
})
onBeforeUnmount(() => { resizeObserver?.disconnect(); map?.setTarget(undefined) })
</script>
<template>
  <div class="comparison-controls">
    <label>Map projection <select v-model="display" aria-label="Map projection"><option value="UKRAINE:ALBERS">Ukraine Albers equal area</option><option value="EPSG:3857">Web Mercator</option></select></label>
  </div>
  <div ref="target" class="hex-map" aria-label="Ukraine equal-ground-area hex comparison"></div>
  <div class="comparison-result"><strong>Same 1,000 km² cells</strong></div>
  <p v-if="error" class="comparison-error" role="alert">{{error}}</p>
</template>
<style scoped>
.comparison-controls { font-size:16px; margin-bottom:8px; }
select { padding:5px; border-bottom:1px solid #287a7d; background:#f4f1e9; color:#18373b; }
.hex-map { height:350px; width:100%; background:#f4f1e9; }
.comparison-result { margin-top:8px; font-size:17px; }
.comparison-error { font-size:14px; color:#a13232; }
</style>