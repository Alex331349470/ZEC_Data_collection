<template>
  <div class="box">
    <Search @handleSearch="handleSearch"/>
    <Charts ref="chartsRef"/>
  </div>
</template>

<script setup>
  import Search from './components/process/search.vue'
  import Charts from './components/process/charts/index.vue'
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
    padding-top: 8px;
    background: #2c2d31;
    height: 100%;
}
</style>