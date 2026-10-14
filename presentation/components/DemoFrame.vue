<script setup>
import { ref, onBeforeUnmount } from 'vue'

const demoUrl = import.meta.env.VITE_DEMO_URL || (import.meta.env.DEV
  ? 'http://localhost:5173/'
  : `${import.meta.env.BASE_URL}world-map/`)
const frame = ref(null)
const links = ref(null)
let removeKeyboardBridge

function bridgeKeyboard() {
  removeKeyboardBridge?.()
  // Hosted builds share an origin. Keep Slidev shortcuts after clicking the map.
  // Separate localhost servers cannot share keyboard events across origins.
  try {
    const doc = frame.value.contentWindow.document
    const handler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        links.value.focus()
        return
      }
      if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return
      if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(event.key)) return
      event.preventDefault()
      event.stopImmediatePropagation()
      window.dispatchEvent(new KeyboardEvent(event.type, {
        key: event.key, code: event.code, bubbles: true,
        shiftKey: event.shiftKey, ctrlKey: event.ctrlKey,
        altKey: event.altKey, metaKey: event.metaKey,
      }))
    }
    doc.addEventListener('keydown', handler, true)
    doc.addEventListener('keyup', handler, true)
    removeKeyboardBridge = () => {
      doc.removeEventListener('keydown', handler, true)
      doc.removeEventListener('keyup', handler, true)
    }
  } catch { /* Cross-origin override: click the footer to restore deck focus. */ }
}
onBeforeUnmount(() => removeKeyboardBridge?.())
</script>

<template>
  <div class="demo-wrap">
    <iframe ref="frame" :src="demoUrl" loading="eager"
      title="Equal Earth and Web Mercator projection comparison" @load="bridgeKeyboard" />
  </div>
  <div ref="links" class="demo-links" tabindex="0" @pointerdown="links.focus()">
    <a :href="demoUrl" target="_blank" rel="noopener">Open demo full-screen ↗</a>
  </div>
</template>

<style scoped>
.demo-wrap { height: 365px; overflow: hidden; background: #e6ebe6; border: 1px solid #afc0bd; }
iframe { display: block; width: 100%; height: 100%; border: 0; }
.demo-links { display: flex; align-items: center; justify-content: space-between; font-size: 16px; min-height: 32px; }
.demo-links:focus-visible { outline: 2px solid #205c60; outline-offset: 2px; }
</style>

