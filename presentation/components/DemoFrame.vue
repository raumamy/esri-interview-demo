<script setup>
import { ref } from 'vue'
const demoUrl = import.meta.env.VITE_DEMO_URL || (import.meta.env.PROD ? import.meta.env.BASE_URL + 'demo/' : 'http://localhost:5173')
const active = ref(false)
</script>
<template>
  <div class="demo-wrap">
    <iframe v-if="active" :src="demoUrl" title="Equal Earth and Web Mercator projection comparison" />
    <div v-else class="demo-prompt">
      <p>One dataset. Two projections.</p>
      <p class="small">EPSG:4326 FlatGeobuf → proj4js → OpenLayers</p>
      <button @click="active = true">Load live comparison</button>
      <p class="small">Explore the same data in both projections.</p>
    </div>
  </div>
  <div class="demo-links"><a :href="demoUrl" target="_blank" rel="noopener">Open demo full-screen ↗</a><button v-if="active" @click="active = false">Return to cue</button></div>
</template>
<style scoped>
.demo-wrap { height: 365px; background: #e6ebe6; border: 1px solid #afc0bd; }
iframe { width: 100%; height: 100%; border: 0; }
.demo-prompt { text-align: center; padding: 55px 20px; }
.demo-prompt p { margin: 8px 0; }
button { background: #205c60; color: white; padding: 10px 18px; cursor: pointer; font-size: 17px; border: 0; margin: 14px 0; }
.demo-links { display: flex; align-items: center; justify-content: space-between; font-size: 16px; }
.demo-links button { font-size: 13px; padding: 5px 10px; }
</style>
