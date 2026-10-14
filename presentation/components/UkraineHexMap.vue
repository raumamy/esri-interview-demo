<script setup>
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorSource from 'ol/source/Vector.js'
import VectorLayer from 'ol/layer/Vector.js'
import { Fill, Stroke, Style } from 'ol/style.js'
import { createEmpty, extend } from 'ol/extent.js'
import { register } from 'ol/proj/proj4.js'
import proj4 from 'proj4'
import 'ol/ol.css'

const target=ref(null), display=ref('UKRAINE:ALBERS'), closeup=ref(false), meta=ref(null), error=ref('')
const detail=ref(''), all={}
let map, source, boundary, sharedExtent, zoomExtent
function refresh() {
  if (!map) return
  const format=new GeoJSON(), options={dataProjection:'EPSG:4326',featureProjection:display.value}
  all.grid=format.readFeatures(all.rawGrid,options)
  boundary.clear(); boundary.addFeatures(format.readFeatures(all.rawBoundary,options))
  sharedExtent=boundary.getExtent(); zoomExtent=createEmpty()
  extend(zoomExtent,all.grid.find(f=>f.get('cell_id')===meta.value.reference_cell_id).getGeometry().getExtent())
  source.clear(); source.addFeatures(all.grid)
  const reference=all.grid.find(f=>f.get('cell_id')===meta.value.reference_cell_id)
  detail.value=`Cell ${meta.value.reference_cell_id} · ground area ${Number(reference.get('ground_km2')).toLocaleString('en-US',{maximumFractionDigits:3})} km²`
  map.setView(new View({projection:display.value,center:[0,0],zoom:1}))
  map.getView().fit(closeup.value?zoomExtent:sharedExtent,{padding:[20,20,20,20],duration:0})
}
watch([display,closeup],refresh)
onMounted(async()=>{
  try {
    const result=await Promise.all(['grid-summary.json','ukraine-boundary.geojson','albers-grid.geojson'].map(async f=>{
      const r=await fetch(import.meta.env.BASE_URL+'hex-comparison/'+f); if(!r.ok)throw new Error('Could not load '+f); return r.json()
    }))
    meta.value=result[0]; proj4.defs('UKRAINE:ALBERS',meta.value.albers_definition); register(proj4)
    all.rawBoundary=result[1]; all.rawGrid=result[2]
    const format=new GeoJSON(), options={dataProjection:'EPSG:4326',featureProjection:'UKRAINE:ALBERS'}
    all.grid=format.readFeatures(result[2],options)
    boundary=new VectorSource({features:format.readFeatures(result[1],options),wrapX:false})
    sharedExtent=boundary.getExtent(); zoomExtent=createEmpty()
    extend(zoomExtent,all.grid.find(f=>f.get('cell_id')===meta.value.reference_cell_id).getGeometry().getExtent())
    source=new VectorSource({wrapX:false})
    const cells=new VectorLayer({source,style:new Style({fill:new Fill({color:'#70a6ad'}),stroke:new Stroke({color:'#18373b',width:1.2})})})
    const outline=new VectorLayer({source:boundary,style:new Style({stroke:new Stroke({color:'#18373b',width:1.5})})})
    await nextTick()
    map=new Map({target:target.value,layers:[cells,outline],controls:[],view:new View({projection:'UKRAINE:ALBERS',center:[0,0],zoom:1})})
    map.on('singleclick',e=>{
      const f=map.forEachFeatureAtPixel(e.pixel,f=>f.get('cell_id')!==undefined?f:undefined)
      if(f)detail.value=`Cell ${f.get('cell_id')} · ground area ${Number(f.get('ground_km2')).toLocaleString('en-US',{maximumFractionDigits:3})} km² · created in Ukraine Albers equal area`
    })
    refresh()
  }catch(e){error.value=e.message}
})
onBeforeUnmount(()=>map?.setTarget(undefined))
</script>
<template>
  <div class="comparison-controls">
    <label>Map projection <select v-model="display" aria-label="Map projection"><option value="UKRAINE:ALBERS">Ukraine Albers equal area</option><option value="EPSG:3857">Web Mercator</option></select></label>
    <button @click="closeup=!closeup">{{closeup?'Show Ukraine locations':'Show matched cell'}}</button>
  </div>
  <div ref="target" class="hex-map" aria-label="Ukraine equal-ground-area hex comparison"></div>
  <div class="comparison-result"><strong>Same 1,000 km² cells</strong><span>{{display==='UKRAINE:ALBERS'?'Regular hexes in Albers':'Same cells reprojected to Mercator'}}</span></div>
  <p class="comparison-caption">{{error || detail}}</p>
  <p class="comparison-caption">Natural Earth 1:50m outline · Selected map projection · {{meta?.cells_per_dataset || ''}} adjoining full cells created in Albers · Ground areas remain unchanged</p>
</template>
<style scoped>
.comparison-controls { display:flex; justify-content:space-between; font-size:16px; align-items:center; margin-bottom:8px; }
select { padding:5px; border-bottom:1px solid #287a7d; background:#f4f1e9; color:#18373b; }
button { font-size:14px; padding:6px 12px; background:#205c60; color:white; cursor:pointer; }
.hex-map { height:315px; width:100%; background:#f4f1e9; }
.comparison-result { display:flex; justify-content:space-between; margin-top:4px; font-size:17px; }
.comparison-result span { color:#5b7476; }
.comparison-caption { font-size:13px !important; line-height:1.4 !important; margin:5px 0 0 !important; color:#5b7476; }
</style>
