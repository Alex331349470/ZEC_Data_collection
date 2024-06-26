<template>
  <div class="card">
    <div class="card-title">
      <div class="left">
        <div class="tip-dot" />
        <span class="name">{{ row.name }}</span>
      </div>
      <div style="display: flex; align-items: center;">
        <el-icon @click="handleOpen" style="margin-left: 10px"><Rank /></el-icon>
      </div>
    </div>
    <Chart ref="chartRef"/>
    <el-dialog v-model="dialogVisible" width="80%" :before-close="handleClose" :close-on-click-modal="false">
      <div class="charBox">
        <div class="card-title">
          <div class="left">
            <div class="tip-dot" />
            <span class="name">{{ row.name }}</span>
          </div>
        </div>
        <Chart v-if="showChart" ref="chartRef"/>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import {Rank} from '@element-plus/icons-vue'
import Chart from './myCharts/zhengtaiChart.vue'
const props = defineProps({
  row: {
    type: Object,
    default: {} 
  }
})
defineExpose({ refreshData })
const dialogVisible = ref(false)
const showChart = ref(false)
const chartRef = ref(null)
const chartData = ref(null)
function handleClose() {
  dialogVisible.value = false
  showChart.value = false
}
function handleOpen() {
  dialogVisible.value = true
  showChart.value = true
  nextTick(() => {
    chartRef.value.initChart(chartData.value)
  })
}
function refreshData(data) {
  chartData.value = data
  chartRef.value.initChart(data)
}
</script>

<style lang="scss" scoped>
  .card{
    border-radius: 4px;
    height: 400px;
    width: 100%;
    background-color: #c6d3df;
    margin: 5px;
    box-shadow: 3px 3px 10px 0 rgba(58, 59, 69, 0.15);
    &-title {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      .left {
        text-align: left;
        display: flex;
        align-items: center;
        .tip-dot {
          height: 9px;
          width: 18px;
          background: #7c260b;
          margin: 0 10px;
          }
        }
      }
    }
  .charBox {
    width: 100%;
    height: 400px;
  }
  :deep( .el-dialog__header) {
    padding: var(--el-dialog-padding-primary)!important;
    margin-right: 10px!important;
    display: block!important;
    justify-content: unset;
    background: #fff!important;
    color: #333;
  }
  :deep( .el-dialog__body) {
    padding: 10!important;
  }
  :deep(.el-button--info) {
    border-color: #014D64!important;
    background: #014D64!important;
  }
</style>