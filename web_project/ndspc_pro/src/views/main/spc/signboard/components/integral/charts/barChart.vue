<template>
  <div class="box" ref="boxRef">
    <el-scrollbar style="height: 100%">
      <Chart v-if="width" :option="options" id="barchart" :style="{height: height, width: width}" />
    </el-scrollbar>
  </div>
</template>

<script setup>
  import {onMounted,ref,reactive,nextTick } from 'vue'
  import Chart from '@/components/charts/index.vue'
  import {getOption} from './modules/bar.js'
  defineExpose({ initChart })
  const boxRef = ref(null)
  const options = ref(null)
  const width = ref(null)
  const height = ref(null)
  async function initChart(data) {
    width.value = data.xAxis_data[0].length > 15 ? (data.yAxis_data.length * 90) + 'px' : boxRef.value.offsetWidth + 'px'
    height.value = (data.yAxis_data.length * 80) +'px'
    await nextTick()
    options.value = getOption(data)
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    background: #c6d3df;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
</style>