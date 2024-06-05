<template>
  <div class="card">
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
    <BarChart ref="chartRef" @changeSelect="changeSelect" :isExport="row.isExport" />
    <ComDialog ref="chartDialogRef" :dialogTitle="row.name" :fullScreen="true" :hiddenFooter="true">
      <div class="charBox">
        <div class="card-title">
          <div class="left">
            <div class="tip-dot" />
            <span class="name">{{ row.name }}</span>
          </div>
          <div style="display: flex; align-items: center;">
            <el-button size="small" type="info" v-if="row.isExport && selectItem">已选择{{selectItem}}</el-button>
            <el-button size="small" type="info" v-if="row.isExport && selectItem">导出选中</el-button>
            <el-button size="small" type="info" v-if="row.isExport">全部导出</el-button>
          </div>
        </div>
        <BarChart v-if="showChart" ref="chartsRef" boxHeight="calc(100vh - 110px)" @changeSelect="changeSelect"  :isExport="row.isExport"/>
      </div>
    </ComDialog>
  </div>
</template>

<script setup>
import {ref,reactive, nextTick, onMounted } from 'vue'
import {Rank} from '@element-plus/icons-vue'
import BarChart from './barChart.vue'
import ComDialog from '@/components/comDialog/index.vue'
  const props = defineProps({
    row: {
      type: Object,
      default: {} 
    }
  })
  const selectItem = ref(null)
  defineExpose({ refreshData })
  const chartDialogRef = ref(false)
  const showChart = ref(false)
  const chartRef = ref(null)
  const chartsRef = ref(null)
  const productQC = ref(null)
  function handleClose() {
    chartDialogRef.value.visible = false
    showChart.value = false
  }
  function handleOpen() {
    chartDialogRef.value.visible = true
    showChart.value = true
    nextTick(() => {
      nextTick(() => {
      refreshData(productQC.value)
    })
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
  function refreshData(params) {
    productQC.value = params
    switch (props.row.name) {
      case '来料合格率趋势图':
        getTrendRate(params)
        break
      case '工厂来料合格率':
        getFactoryRate(params)
        break
      case '供应商来料合格率':
        getSupplierRate(params)
        break
      case '物料类型合格率':
        getMaterialTypeRate(params)
        break
      case '物料编码合格率':
        getMaterialCodeRate(params)
        break
      case '物料编码不良数量柏拉图':
        getMaterialCodePlato(params)
        break
      case '检测项目不良数量柏拉图':
        getProdcutQCTestItemPlato(params)
        break
    }
  }
  // 来料合格率处理方法
  function getTrendRate(val) {
    const xAxis_data = []
    const amount = [] // 生产数量
    const poorAmount = [] // 不良数量
    const rate = [] // 合格率
    const purpose = [] // 目标
    const data = val.chartData.materialQC.trendRate
    const parmas = val.params
    if(parmas.quantityCalcSwitch) { //按批次数量
      if(parmas.yearDemintion) { // 时间维度年
        data.quantityYearTrend.map(item => {
          xAxis_data.push(item.year+'年')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
      }
      if(parmas.seasonDemintion) { // 时间维度季
        data.quantitySeasonTrend.map(item => {
          xAxis_data.push(item.year+'年-'+item.season+'季度')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
      }
      if(parmas.monthDemintion) { // 时间维度月
        data.quantityMonthTrend.map(item => {
          xAxis_data.push(item.year+'年-'+item.month+'月')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
        console.log('月')
      }
      if(parmas.weekDemintion) { // 时间维度周
        data.quantityWeekTrend.map(item => {
          xAxis_data.push(item.year+'年-'+item.week+'周')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
      }
      if(parmas.dayDemintion) { // 时间维度日
        data.quantityDayTrend.map(item => {
          xAxis_data.push(item.year+'年-'+item.month+'月-'+item.day+'日')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
      }
    } else { //按批次重量
      if(parmas.yearDemintion) { // 时间维度年
        data.weightYearTrend.map(item => {
          xAxis_data.push(item.year+'年')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
      }
      if(parmas.seasonDemintion) { // 时间维度季
        data.weightSeasonTrend.map(item => {
          xAxis_data.push(item.year+'年-'+item.season+'季度')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
      }
      if(parmas.monthDemintion) { // 时间维度月
        data.weightMonthTrend.map(item => {
          xAxis_data.push(item.year+'年-'+item.month+'月')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
        console.log('月')
      }
      if(parmas.weekDemintion) { // 时间维度周
        data.weightWeekTrend.map(item => {
          xAxis_data.push(item.year+'年-'+item.week+'周')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
      }
      if(parmas.dayDemintion) { // 时间维度日
        data.weightDayTrend.map(item => {
          xAxis_data.push(item.year+'年-'+item.month+'月-'+item.day+'日')
          amount.push(item.amount)
          poorAmount.push(item.poorAmount)
          rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
          purpose.push(item.purpose)
        })
      }
    }
    const chartData = {
      xAxis_data: xAxis_data,
      yAxis_data: {
        amount: amount,
        poorAmount: poorAmount,
        rate: rate,
        purpose: purpose
      },
      names: [parmas.quantityCalcSwitch ? '生产数量' : '生产重量', parmas.quantityCalcSwitch ? '不良数量' : '不良重量', '合格率', '目标'],
      type: parmas.quantityCalcSwitch ? '数量' : '重量'
    }
    console.log(chartData)
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
  // 工厂来料合格率处理方法
  function getFactoryRate(val) {
    let xAxis_data = []
    let amount = []
    let poorAmount = []
    let rate = []
    let purpose = []
    const data = val.chartData.materialQC.factoryRate
    const parmas = val.params
    if(parmas.quantityCalcSwitch) { //按批次数量
      data.quantityFactory.map(item => {
        xAxis_data.push(item.factory)
        amount.push(item.amount)
        poorAmount.push(item.poorAmount)
        rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
        purpose.push(item.purpose)
      })
    } else {
      data.weightFactory.map(item => {
        xAxis_data.push(item.factory)
        amount.push(item.amount)
        poorAmount.push(item.poorAmount)
        rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
        purpose.push(item.purpose)
      })
    }
    const chartData = {
      xAxis_data: xAxis_data,
      yAxis_data: {
        amount: amount,
        poorAmount: poorAmount,
        rate: rate,
        purpose: purpose
      },
      names: [parmas.quantityCalcSwitch ? '生产数量' : '生产重量', parmas.quantityCalcSwitch ? '不良数量' : '不良重量', '合格率', '目标'],
      type: parmas.quantityCalcSwitch ? '数量' : '重量'
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
  // 供应商来料合格率处理方法
  function getSupplierRate(val) {
    let xAxis_data = []
    let amount = []
    let poorAmount = []
    let rate = []
    let purpose = []
    const data = val.chartData.materialQC.supplierRate
    const parmas = val.params
    if(parmas.quantityCalcSwitch) { //按批次数量
      data.quantitySupplier.map(item => {
        xAxis_data.push(item.supplier)
        amount.push(item.amount)
        poorAmount.push(item.poorAmount)
        rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
        purpose.push(item.purpose)
      })
    } else {
      data.weightSupplier.map(item => {
        xAxis_data.push(item.supplier)
        amount.push(item.amount)
        poorAmount.push(item.poorAmount)
        rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
        purpose.push(item.purpose)
      })
    }
    const chartData = {
      xAxis_data: xAxis_data,
      yAxis_data: {
        amount: amount,
        poorAmount: poorAmount,
        rate: rate,
        purpose: purpose
      },
      names: [parmas.quantityCalcSwitch ? '生产数量' : '生产重量', parmas.quantityCalcSwitch ? '不良数量' : '不良重量', '合格率', '目标'],
      type: parmas.quantityCalcSwitch ? '数量' : '重量'
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
  // 物料类型合格率处理方法
  function getMaterialTypeRate(val) {
    let xAxis_data = []
    let amount = []
    let poorAmount = []
    let rate = []
    let purpose = []
    const data = val.chartData.materialQC.materialTypeRate
    const parmas = val.params
    if(parmas.quantityCalcSwitch) { //按批次数量
      data.quantityMaterialType.map(item => {
        xAxis_data.push(item.materialType)
        amount.push(item.amount)
        poorAmount.push(item.poorAmount)
        rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
        purpose.push(item.purpose)
        })
    } else {
      data.weightMaterialType.map(item => {
        xAxis_data.push(item.materialType)
        amount.push(item.amount)
        poorAmount.push(item.poorAmount)
        rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
        purpose.push(item.purpose)
      })
    }
    const chartData = {
      xAxis_data: xAxis_data,
      yAxis_data: {
        amount: amount,
        poorAmount: poorAmount,
        rate: rate,
        purpose: purpose
      },
      names: [parmas.quantityCalcSwitch ? '生产数量' : '生产重量', parmas.quantityCalcSwitch ? '不良数量' : '不良重量', '合格率', '目标'],
      type: parmas.quantityCalcSwitch ? '数量' : '重量'
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }

  }
  // 物料编码合格率处理方法
  function getMaterialCodeRate(val) {
    let xAxis_data = []
    let amount = []
    let poorAmount = []
    let rate = []
    let purpose = []
    const data = val.chartData.materialQC.materialCodeRate
    const parmas = val.params
    if(parmas.quantityCalcSwitch) { //按批次数量
      data.quantityMaterialCode.map(item => {
        xAxis_data.push(item.materialCode)
        amount.push(item.amount)
        poorAmount.push(item.poorAmount)
       rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
        purpose.push(item.purpose)
      })
    } else {
      data.weightMaterialCode.map(item => {
        xAxis_data.push(item.materialCode)
        amount.push(item.amount)
        poorAmount.push(item.poorAmount)
       rate.push(item.rate ? item.rate.toFixed(2) * 100 : 0)
        purpose.push(item.purpose)
      })
    }
    const chartData = {
      xAxis_data: xAxis_data,
      yAxis_data: {
        amount: amount,
        poorAmount: poorAmount,
        rate: rate,
        purpose: purpose
      },
      names: [parmas.quantityCalcSwitch ? '生产数量' : '生产重量', parmas.quantityCalcSwitch ? '不良数量' : '不良重量', '合格率', '目标'],
      type: parmas.quantityCalcSwitch ? '数量' : '重量'
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }

  }
  // 物料编码不良数量柏拉图处理方法
  function getMaterialCodePlato(val) {
    let xAxis_data = []
    let amount = []
    let poorAmount = []
    let rate = []
    let purpose = []
    const data = val.chartData.materialQC.materialCodePlato
    const parmas = val.params
    if(parmas.quantityCalcSwitch) { //按批次数量
      data.quantityMaterialCodePlato.map(item => {
        xAxis_data.push(item.materialCode)
        amount.push(item.poorAmount)
        rate.push(item.proportion?item.proportion.toFixed(2) * 100 : 0)
      })
    } else {
      data.weightMaterialCodePlato.map(item => {
        xAxis_data.push(item.materialCode)
        amount.push(item.poorAmount)
        item.proportion?item.proportion.toFixed(2) * 100 : 0
      })
    }
    const chartData = {
      xAxis_data: xAxis_data,
      yAxis_data: {
        amount: amount,
        poorAmount: poorAmount,
        rate: rate,
        purpose: purpose
      },  
      names: [parmas.quantityCalcSwitch ? '不合格数量' : '不合格重量', '累计占比'],
      type: parmas.quantityCalcSwitch ? '数量' : '重量'
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }

  }
  // 检测项目不良数量柏拉图处理方法
  // 检测项目不良数量柏拉图数据获取
  function getProdcutQCTestItemPlato(val) {}
</script>

<style lang="scss" scoped>
  .card{
    border-radius: 4px;
    height: 400px;
    width: calc(33% - 12px);
    background-color: #c6d3df;
    margin: 5px;
    box-shadow: 3px 3px 10px 0 rgba(58, 59, 69, 0.15);
    font-size: 14px;
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
    padding: 5px;
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