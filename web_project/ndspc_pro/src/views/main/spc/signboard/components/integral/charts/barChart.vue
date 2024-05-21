<template>
  <div class="box">
    <Chart :option="options" />
  </div>
</template>

<script setup>
  import {onMounted,ref } from 'vue'
  import Chart from '@/components/charts/index.vue'
  import {getOption} from './modules/bar.js'
  const options = ref(null)
  onMounted(() => {
    options.value = getOption()
  })
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    background: #c6d3df;
    overflow: hidden;
    display: flex;
    height: 350px;
    justify-content: center;
  }
</style>