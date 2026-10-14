<script setup>
const props = defineProps({ src: String })
const base = import.meta.env.BASE_URL
</script>
<template><img :src="base + props.src" /></template>
