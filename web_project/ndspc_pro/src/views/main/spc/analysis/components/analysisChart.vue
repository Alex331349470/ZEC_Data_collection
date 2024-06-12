<template>
  <div class="box">
    <Search ref="searchRef" @handleSearch="handleSearch" @closeAllDialog="closeAllDialog"/>
    <Charts ref="chartsRef"/>
  </div>
</template>

<script setup>
import Search from './analysisChart/search.vue'
import Charts from './analysisChart/charts/index.vue'
import { ref } from 'vue'
defineExpose({ getData })
const emit = defineEmits(['closeAllDialog'])
const chartsRef = ref(null)
const searchRef = ref(null)
function getData(data) {
  searchRef.value.getData(data)
}
function handleSearch(params) {
  if(chartsRef.value) {
    chartsRef.value.handleSearch(params)
  }
}
// 关闭弹窗
function closeAllDialog() {
  emit('closeAllDialog')
}
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 40px);
  overflow: auto;
  background: #2d3340;
}
</style>