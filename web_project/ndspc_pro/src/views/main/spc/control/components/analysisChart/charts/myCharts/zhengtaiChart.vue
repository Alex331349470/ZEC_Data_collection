<template>
  <div class="box">
    <Chart ref="myChart" :option="options" />
    <div class="back_writhe">拟合优度检验</div>
    <el-row>
      <el-col :span="8">
        <div class="back_writhe">Anderson-Darling</div>
      </el-col>
      <el-col :span="8">
        <div>A2</div>
        <div>模拟的P值</div>
      </el-col>
      <el-col :span="8">
        <div>{{chartData.a2_value}}</div>
        <div>{{chartData.p_value}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Chart from '@/components/charts/index.vue'
import {getOption} from './modules/zhengtai.js'
defineExpose({ initChart})
const options = ref(null)
const chartData = ref({})
function initChart(data) {
  if(data.xAxis_data.length) {
    chartData.value = data
    options.value = getOption(data)
  } else {
    chartData.value = {}
    options.value = {}
  }
}
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 350px;
    background: #c6d3df;
    overflow: hidden;
    .chart {
      height: 80%;
    }
    font-weight: bold;
  }
  .back_writhe {
    background: rgba(255, 255, 255, 0.5);
    padding: 5px;
    width: 100%;
    text-align: left;
    margin: 0 0 5px 5px;
  }

</style>