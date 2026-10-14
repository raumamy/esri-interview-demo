<script setup>
import { computed, onMounted, ref } from 'vue'
import { geoArea, geoEqualEarth, geoMercator, geoGraticule10, geoPath } from 'd3-geo'
import { deserialize } from 'flatgeobuf/lib/mjs/geojson.js'

const features = ref([])
const selected = ref('equal')
const hovered = ref('')
const error = ref('')
const svg = ref(null)
const projection = computed(() => (selected.value === 'equal' ? geoEqualEarth() : geoMercator())
  .fitExtent([[12, 8], [888, 344]], { type: 'Sphere' }))
const path = computed(() => geoPath(projection.value))
const countryPaths = computed(() => features.value.map(f => ({
  id: f.id,
  name: f.properties.NAME || f.properties.ADMIN || 'Country',
  d: path.value(f),
})))
// D3's spherical winding convention differs from RFC 7946. Normalize a copy only.
function normalize(geometry) {
  if (geometry.type === 'Polygon') {
    return geoArea({type:'Polygon',coordinates:geometry.coordinates}) > 2*Math.PI
      ? {type:'Polygon',coordinates:geometry.coordinates.map(r => [...r].reverse())} : geometry
  }
  if (geometry.type === 'MultiPolygon') return {
    type:'MultiPolygon', coordinates:geometry.coordinates.map(c => normalize({type:'Polygon',coordinates:c}).coordinates),
  }
  return geometry
}
onMounted(async () => {
  try {
    const response = await fetch(import.meta.env.BASE_URL + 'world/countries.fgb')
    if (!response.ok) throw new Error('Countries failed to load')
    const data=[]
    for await (const feature of deserialize(response.body)) {
      data.push({...feature, id:data.length, geometry:normalize(feature.geometry)})
    }
    features.value=data
  } catch (e) { error.value=e.message }
})
function download() {
  if (!svg.value) return
  const body = new XMLSerializer().serializeToString(svg.value)
  const url = URL.createObjectURL(new Blob([body],{type:'image/svg+xml'}))
  const link=document.createElement('a')
  link.href=url; link.download=`world-d3-${selected.value}.svg`; link.click()
  setTimeout(()=>URL.revokeObjectURL(url),1000)
}
</script>
<template>
  <div class="svg-controls">
    <label><input v-model="selected" type="radio" value="equal"> Equal Earth</label>
    <label><input v-model="selected" type="radio" value="mercator"> Web Mercator</label>
    <button @click="download" :disabled="!features.length">Save SVG</button>
  </div>
  <svg ref="svg" viewBox="0 0 900 352" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="D3 SVG world map from the same FlatGeobuf countries as the OpenLayers demo" style="width:100%;height:330px;background:#f4f1e9">
    <path :d="path({type:'Sphere'})" fill="#b9ced1" />
    <path v-for="f in countryPaths" :key="f.id" :d="f.d" :fill="hovered === f.name ? '#c8bda5' : '#e8e1d5'" stroke="#55524d" stroke-width="0.5" @mouseenter="hovered=f.name" @mouseleave="hovered=''">
      <title>{{ f.name }}</title>
    </path>
    <path :d="path(geoGraticule10())" fill="none" stroke="#536b6b" stroke-opacity="0.35" stroke-width="0.6" />
  </svg>
  <p class="svg-caption">{{ error || (features.length ? `${features.length} country features · Same EPSG:4326 FlatGeobuf · ${selected==='equal'?'Equal Earth':'Web Mercator'} → SVG · ${hovered}` : 'Loading the same FlatGeobuf countries…') }}</p>
</template>
<style scoped>
.svg-controls { display:flex; gap:24px; align-items:center; font-size:17px; }
label { cursor:pointer; }
input { accent-color:#287a7d; }
button { margin-left:auto; padding:6px 14px; background:#205c60; color:white; cursor:pointer; font-size:15px; }
.svg-caption { font-size:15px !important; margin:0 !important; color:#5b7476; }
</style>
