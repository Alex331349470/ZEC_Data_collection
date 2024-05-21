<template>
  <div class="box">
    <Search @handleSearch="handleSearch" />
    <Charts ref="chartsRef"/>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import Search from './analysisChart/search.vue'
import Charts from './analysisChart/charts/index.vue'
import { ref } from 'vue'
const chartsRef = ref(null)
function handleSearch(params) {
  if(chartsRef.value) {
    chartsRef.value.handleSearch(params)
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 40px);
  overflow: auto;
  background: #2d3340;
}
</style>