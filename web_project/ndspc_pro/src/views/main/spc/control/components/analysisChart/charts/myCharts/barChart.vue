<template>
  <div class="box" :style="{height: boxHeight}">
    <el-empty :image-size="100"  v-if="isEmpty"/>
    <Chart ref="chartRef" :option="options" @onSelect="onSelect" v-else />
  </div>
</template>

<script setup>
  import {ref } from 'vue'
  import Chart from '@/components/charts/index.vue'
  import {getOption} from './modules/bar.js'
  const emit = defineEmits(['changeSelect'])
  defineExpose({ initChart, cancelSelected })
  const props = defineProps({
    boxHeight: {
      type: String,
      default: '350px'
    }
  })
  const options = ref(null)
  const isEmpty = ref(false)
  const chartRef = ref(null)
  function initChart(data) {
    if(data.xAxis_data.length) {
      options.value = getOption(data)
    } else {
      options.value = {}
    }
  }
  function onSelect(parmas) {
    emit('changeSelect', parmas)
  }
  function cancelSelected(parmas) {
    chartRef.value.cancelSelected(parmas)
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 350px;
    background: #c6d3df;
    overflow: hidden;
  }
</style>