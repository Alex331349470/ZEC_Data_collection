<template>
  <div class="card" v-loading="loading">
    <div class="card-title">
      <div class="left">
        <div class="tip-dot" />
        <span class="name">{{ row.name }}</span>
      </div>
      <div style="display: flex; align-items: center;">
        <el-button size="small" type="info" v-if="row.isExport && selectItem">已选择{{selectItem}}</el-button>
        <el-button size="small" type="info" v-if="row.isExport && selectItem">导出选中</el-button>
        <el-button size="small" type="info" v-if="row.isExport">全部导出</el-button>
        <el-icon @click="handleOpen" style="margin-left: 10px"><Rank /></el-icon>
      </div>
    </div>
    <BarChart v-if="chartData" @changeSelect="changeSelect" :chartData="chartData" :isExport="row.isExport"/>
    <el-dialog v-model="dialogVisible" width="80%" :before-close="handleClose" :close-on-click-modal="false" :fullscreen="true">
      <div class="charBox">
        <div class="card-title">
          <div class="left">
            <div class="tip-dot" />
            <span class="name">{{ row.name }}</span>
          </div>
          <div style="display: flex; align-items: center;">
          <el-button size="small" type="info" v-if="row.isExport">全部导出</el-button>
        </div>
        </div>
        <BarChart v-if="showChart" boxHeight="calc(100vh - 110px)" @changeSelect="changeSelect" :chartData="chartData" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref,reactive, nextTick, onMounted } from 'vue'
import {Rank} from '@element-plus/icons-vue'
import BarChart from './barChart.vue'
  const props = defineProps({
    row: {
      type: Object,
      default: {}
    }
  })
  const selectItem = ref(null)
  defineExpose({ handleSearch })
  const dialogVisible = ref(false)
  const showChart = ref(false)
  const chartData = ref(null)
  const loading = ref(true)
  function handleClose() {
    dialogVisible.value = false
    showChart.value = false
  }
  function handleOpen() {
    dialogVisible.value = true
    nextTick(() => {
      showChart.value = true
    })
  }
  // echart选择事件
  function changeSelect(parmas) {
    if(selectItem.value === parmas.name) {
      selectItem.value = null
    } else {
      selectItem.value = parmas.name
    }
  }
  function handleSearch(params) {
    loading.value = true
    setTimeout(() => {
      chartData.value = {
        xAxis_data: ["01月", "02月", "03月", "04月", "05月", "06月", "07月", "08月", "09月", "10月", "11月", "12月"],
        yAxis_data: {
          data_A: [820, 932, 901, 934, 1290, 1330, 1320, 720, 832, 501, 334, 990],
          // data_B: [720, 832, 501, 334, 990, 830, 720, 620, 732, 801, 1134, 908],
          data_C: [68, 73, 80, 34, 98, 30, 20, 80, 32, 91, 34, 29],
          // data_D: [85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85],
        },
        // yAxis_data: null,
        // names: ['来料数量', '不良数量', '合格率', '目标'],
        names: ['不合格数量', '累计百分比'],
        units: ['', '', '%', '%']
      }
      loading.value = false
    }, 800)
  }
</script>

<style lang="scss" scoped>
  .card{
    border-radius: 4px;
    height: 400px;
    width: calc(33% - 12px);
    background-color: #c6d3df;
    margin: 5px;
    box-shadow: 3px 3px 10px 0 rgba(58, 59, 69, 0.15);
    &-title {
      margin: 10px;
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
  :deep(.el-button--info) {
    border-color: #014D64!important;
    background: #014D64!important;
  }
  @media screen and ( max-width: 1200px ) {
    .card {
      width: calc(50% - 26px);
    }
  }
  @media screen and ( max-width: 500px ) {
    .card {
      width: calc(100% - 26px);
    }
  }
</style>