<template>
  <div class="card">
    <div class="card-title">
      <div class="left">
        <div class="tip-dot" />
        <span class="name">{{ row.name }}</span>
      </div>
      <div style="display: flex; align-items: center;">
        <el-button size="small" type="info" v-if="row.isExport">全部导出</el-button>
        <el-icon @click="handleOpen" style="margin-left: 10px"><Rank /></el-icon>
      </div>
    </div>
    <BarChart ref="chartRef" @changeSelect="changeSelect" />
    <el-dialog v-model="dialogVisible" width="80%" :before-close="handleClose" :close-on-click-modal="false">
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
        <BarChart v-if="showChart" ref="chartsRef" @changeSelect="changeSelect" />
        <div class="rule-box" v-show="showRule1"  :style="{ top: `${dialogPosition.top}px`, left: `${dialogPosition.left}px` }">
          <div class="rule-header">
            <div>规则</div>
            <el-icon style="margin-left: 10px" @click="handleRuleClose"><Close /></el-icon>
          </div>
          <div class="rule-content">
            <p>高亮异常点</p>
            <div class="flex pane-input" v-for="(item, index) in ruleArr" :key="index">
              <el-checkbox v-model="isCheck" disabled />
              <div class="flex input">
                <div >{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <div class="rule-box" v-show="showRule"  :style="{ top: `${dialogPosition.top}px`, left: `${dialogPosition.left}px` }">
      <div class="rule-header">
        <div>规则</div>
        <el-icon style="margin-left: 10px" @click="handleRuleClose"><Close /></el-icon>
      </div>
      <div class="rule-content">
        <p>高亮异常点</p>
        <div class="flex pane-input" v-for="(item, index) in ruleArr" :key="index">
          <el-checkbox v-model="isCheck" disabled />
          <div class="flex input">
            <div >{{item}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, nextTick,onMounted,reactive } from 'vue'
  import {Rank,Close} from '@element-plus/icons-vue'
  import BarChart from './myCharts/barChart.vue'
  import ComDialog from '@/components/comDialog/index.vue'
  const props = defineProps({
    row: {
      type: Object,
      default: {} 
    }
  })
  defineExpose({ refreshData })
  const dialogVisible = ref(false)
  const showRule = ref(false)
  const showRule1 = ref(false)
  const showChart = ref(false)
  const chartRef = ref(null)
  const chartsRef = ref(null)
  const selectItem = ref(null)
  const ruleStatus = ref(false)
  const isCheck = ref(true)
  const ruleArr = ref([])
  const chartData = ref(null)
  const dialogPosition = reactive({
    top: 0,
    left: 0
  })
  // echart选择事件
  function changeSelect(parmas) {
    if(parmas) {
      ruleArr.value = parmas.data.data.jugeArr
      selectItem.value = parmas.data
      dialogPosition.top = parmas.position.top
      dialogPosition.left = parmas.position.left
      if(dialogVisible.value) {
        showRule1.value = true
      } else {
        showRule.value = true
      }
    } else {
      showRule1.value = false
      showRule.value = false
    }
  }
  function handleClose() {
    dialogVisible.value = false
    showChart.value = false
  }
  function handleRuleClose() {
    showRule.value = false
    showRule1.value = false
    if(showChart.value) {
      chartsRef.value.cancelSelected(selectItem.value)
    } else {
      chartRef.value.cancelSelected(selectItem.value)
    }
  }
  function handleOpen () {
    dialogVisible.value = true
    showChart.value = true
    showRule.value = false
    nextTick(() => {
      refreshData(chartData.value)
    })
  }
  function refreshData(params) {
    chartData.value = params
    switch (props.row.name) {
      case 'I控制图':
        getIControl(params)
        break
      case 'MR控制图':
        getMrControl(params)
        break
    }
  }
  // 处理I控制图数据
  function getIControl(params) {
    const xAxis_data = []
    const productI = []
    const usl = []
    const lsl = []
    const ucl = []
    const cl = []
    const lcl = []
    const data = params.chartData.iControl
    data.forEach(item => {
      xAxis_data.push(item.productPatch)
      productI.push({value: item.productI || 0, jugeStatus: item.jugeStatus, jugeArr: item.jugeArr})
      usl.push(item.usl)
      lsl.push(item.lsl)
      ucl.push(item.ucl)
      cl.push(item.cl)
      lcl.push(item.lcl)
    })
    const chartData = {
      xAxis_data: xAxis_data,
      yAxis_data: {
        productI: productI,
        usl: usl,
        lsl: lsl,
        ucl: ucl,
        cl: cl,
        lcl: lcl
      },
      names: ['I值', 'UCL', 'CL', 'LCL', 'USL', 'LSL'],
      type: ''
    }
    if(dialogVisible.value) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
  function getMrControl(params) {
    const xAxis_data = []
    const productI = []
    const ucl = []
    const lcl = []
    const cl = []
    const data = params.chartData.mrControl
    data.forEach(item => {
      xAxis_data.push(item.productPatch)
      productI.push(item.productMR)
      ucl.push(item.uclr)
      cl.push(item.clr)
      lcl.push(item.lclr)
    })
    const chartData = {
      xAxis_data: xAxis_data,
      yAxis_data: {
        productI: productI,
        ucl: ucl,
        cl: cl,
        lcl: lcl
      },
      names: ['MR值', 'UCL', 'CL', 'LCL'],
      type: ''
    }
    if(dialogVisible.value) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
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
    position: relative;
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
    position: relative;
  }
  .rule-box {
    position: absolute;
    z-index: 99999;
    box-shadow: -3px 5px 9px;
    .rule-header {
      padding: 10px 10px 10px 10px!important;
      margin-right: 0!important;
      display: flex!important;
      justify-content: space-between;
      background: var(--el-color-success-dark-2);
      color: #fff;
      width: 600px;
    }
    .rule-content {
      padding: 10px;
      background: #fff;
      width: 600px;
    }
    .rule-content {
      text-align: left;
      .pane-input {
        align-items: center;
        .el-checkbox {
          margin-right: 20px;
        }
      }
    }
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