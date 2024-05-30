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
  const boxRef = ref(null)
  const options = ref(null)
  const width = ref(null)
  const height = ref(null)
  const chartData = reactive({
    hours: ['P03',"B02","B03","A01","A02","A03","A04",'P03',"B02","B03","A01","A02","A03","A04",'P03',"B02","B03","A01","A02","A03","A04"],
    data: [6,3,4,6,34,4,6,3,4,6,34,4,6,3,4,6,34,4],
    days: ['2023年7月','2023年7月','2023年7月','2023年7月','2023年7月','2023年7月']
  })
  onMounted(async() => {
    await nextTick()
    width.value = chartData.hours.length > 15 ? (chartData.hours.length * 90) + 'px' : boxRef.value.offsetWidth + 'px'
    height.value = (chartData.days.length * 80) +'px'
    options.value = getOption(chartData)
  })
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    background: #c6d3df;
    overflow: hidden;
    display: flex;
    // height: 550px;
    justify-content: center;
  }
</style>