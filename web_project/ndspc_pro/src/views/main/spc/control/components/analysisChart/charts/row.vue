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
    <ComDialog ref="chartDialogRef" :dialogTitle="row.name" :fullScreen="true" :hiddenFooter="true" @handleClose="handleClose">
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
        <BarChart v-if="showChart" ref="chartsRef" boxHeight="calc(100vh - 110px)" @changeSelect="changeSelect" />
        <div class="rule-box" v-show="showRule1"  :style="{ top: `${dialogPosition.top}px`, left: `${dialogPosition.left}px` }">
          <div class="rule-header">
            <div>规则</div>
            <el-icon style="margin-left: 10px" @click="handleRuleClose"><Close /></el-icon>
          </div>
          <div class="rule-content">
            <p>高亮异常点</p>
            <div class="flex pane-input">
              <el-checkbox v-model="ruleStatus" />
              <div class="flex input">
                <span>判异准则⑤:3点(K)中存在K-1个点距离中心线(同侧)大于两个标准差</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComDialog>
    <div class="rule-box" v-show="showRule"  :style="{ top: `${dialogPosition.top}px`, left: `${dialogPosition.left}px` }">
      <div class="rule-header">
        <div>规则</div>
        <el-icon style="margin-left: 10px" @click="handleRuleClose"><Close /></el-icon>
      </div>
      <div class="rule-content">
        <p>高亮异常点</p>
        <div class="flex pane-input">
          <el-checkbox v-model="ruleStatus" />
          <div class="flex input">
            <span>判异准则⑤:3点(K)中存在K-1个点距离中心线(同侧)大于两个标准差</span>
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
  const chartDialogRef = ref(false)
  const showRule = ref(false)
  const showRule1 = ref(false)
  const showChart = ref(false)
  const chartRef = ref(null)
  const chartsRef = ref(null)
  const selectItem = ref(null)
  const ruleStatus = ref(false)
  const dialogPosition = reactive({
    top: 0,
    left: 0
  })
  onMounted(() => {
    nextTick(() => {
      chartRef.value.initChart()
    })
  })
  // echart选择事件
  function changeSelect(parmas) {
    console.log(parmas)
    if(parmas) {
      selectItem.value = parmas.data
      dialogPosition.top = parmas.position.top
      dialogPosition.left = parmas.position.left
      if(chartDialogRef.value.visible) {
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
    chartDialogRef.value.visible = false
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
    chartDialogRef.value.visible = true
    showChart.value = true
    nextTick(() => {
      chartsRef.value.initChart()
    })
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
  :deep(.el-button--info) {
    border-color: #014D64!important;
    background: #014D64!important;
  }
</style>