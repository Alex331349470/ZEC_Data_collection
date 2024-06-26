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
    <TrendChart ref="chartRef" @changeSelect="changeSelect" />
    <ComDialog ref="chartDialogRef" :dialogTitle="row.name" :fullScreen="true" :hiddenFooter="true" @handleClose="handleClose">
      <div class="charBox">
        <div class="card-title">
          <div class="left">
            <div class="tip-dot" />
            <span class="name">{{ row.name }}</span>
          </div>
        </div>
        <TrendChart v-if="showChart" ref="chartsRef" boxHeight="calc(100vh - 110px)" @changeSelect="changeSelect"/>
      </div>
    </ComDialog>
  </div>
</template>

<script setup>
import {ref,reactive, nextTick } from 'vue'
import {Rank} from '@element-plus/icons-vue'
import TrendChart from './myCharts/trendChart.vue'
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
  const header_data = reactive({
    '时间':'time',
    '生产数量':'amount',
    '不良数量':'poorAmount',
    '合格率': 'rate',
    '目标值': 'purpose'
  })
  const all_data = ref(null)
  const select_data = ref(null)
  function handleClose() {
    if(selectItem.value) {
      chartsRef.value.cancelSelected(selectItem.value)
      selectItem.value = null
    }
    chartDialogRef.value.visible = false
    showChart.value = false
  }
  function handleOpen() {
    if(selectItem.value) {
      chartRef.value.cancelSelected(selectItem.value)
      selectItem.value = null
    }
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
    if(selectItem.value && selectItem.value.name === parmas.name) {
      selectItem.value = null
    } else {
      selectItem.value = parmas
      select_data.value = all_data.value.filter(item => item.time === parmas.name)
    }
  }
  function refreshData(params) {
    productQC.value = params
    switch (props.row.name) {
      case 'I控制图异常点数量趋势图':
        getIControlTrendRate(params)
        break
      case 'MR控制图异常点数量趋势图':
        getMrControlTrendRate(params)
        break
      case 'Mean偏移趋势图':
        getMeanTrendRate(params)
        break
      case 'Cp/Cpk趋势图':
        getCPKTrendRate(params)
        break
      case 'Cov趋势图':
        getCovTrendRate(params)
        break
    }
  }
  // I控制图异常点数量趋势图处理方法
  function getIControlTrendRate(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const data = val.chartData.iControlJugeTrend
    const parmas = val.params
    if(parmas.yearDemintion) { // 时间维度年
      data.spcProductIControlJugeYearTrend.map(item => {
        xAxis_data.push(item.year+'年')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.seasonDemintion) { // 时间维度季
      data.spcProductIControlJugeSeasonTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.season+'季度')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.monthDemintion) { // 时间维度月
      data.spcProductIControlJugeMonthTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.month+'月')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.weekDemintion) { // 时间维度周
      data.spcProductIControlJugeWeekTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.week+'周')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.dayDemintion) { // 时间维度日
      data.spcProductIControlJugeDayTrend.map(item => {
        xAxis_data.push(item.day)
        amount.push(item.poorAmount)
      })
    }
    const series = [{ // 设置series
      type: 'line',
      name: '异常点数量',
      data: amount,
      areaStyle: {},
      color: '#014d64', //设置颜色
      lineStyle: {
        width: 2,
        type: 'solid'
      }
    }]
    const chartData = {
      xAxis_data: xAxis_data,
      names: ['异常点数量'],
      series: series
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
  // MR控制图异常点数量趋势图处理方法
  function getMrControlTrendRate(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const data = val.chartData.mrControlJugeTrend
    const parmas = val.params
    if(parmas.yearDemintion) { // 时间维度年
      data.spcProductMRControlJugeYearTrend.map(item => {
        xAxis_data.push(item.year+'年')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.seasonDemintion) { // 时间维度季
      data.spcProductMRControlJugeSeasonTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.season+'季度')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.monthDemintion) { // 时间维度月
      data.spcProductMRControlJugeMonthTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.month+'月')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.weekDemintion) { // 时间维度周
      data.spcProductMRControlJugeWeekTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.week+'周')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.dayDemintion) { // 时间维度日
      data.spcProductMRControlJugeDayTrend.map(item => {
        xAxis_data.push(item.day)
        amount.push(item.poorAmount)
      })
    }
    const series = [{ // 设置series
      type: 'line',
      name: '异常点数量',
      data: amount,
      areaStyle: {},
      color: '#014d64', //设置颜色
      lineStyle: {
        width: 2,
        type: 'solid'
      }
    }]
    const chartData = {
      xAxis_data: xAxis_data,
      names: ['异常点数量'],
      series: series
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
  // Mean偏移趋势图处理方法
  function getMeanTrendRate(val) {
    const xAxis_data = []
    const purpose = []
    const mean = []
    const data = val.chartData.iControlMeanTrend
    const parmas = val.params
    if(parmas.yearDemintion) { // 时间维度年
      data.spcProductIControlMeanYearTrend.map(item => {
        xAxis_data.push(item.year+'年')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        mean.push(item.mean ? item.mean.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.seasonDemintion) { // 时间维度季
      data.spcProductIControlMeanSeasonTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.season+'季度')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        mean.push(item.mean ? item.mean.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.monthDemintion) { // 时间维度月
      data.spcProductIControlMeanMonthTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.month+'月')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        mean.push(item.mean ? item.mean.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.weekDemintion) { // 时间维度周
      data.spcProductIControlMeanWeekTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.week+'周')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        mean.push(item.mean ? item.mean.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.dayDemintion) { // 时间维度日
      data.spcProductIControlMeanDayTrend.map(item => {
        xAxis_data.push(item.day)
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        mean.push(item.mean ? item.mean.toFixed(2) * 100 : 0)
      })
    }
    const series = [
      { // 设置series
        type: 'line',
        name: 'Mean偏移百分比',
        data: mean,
        areaStyle: {},
        color: '#014d64', //设置颜色
        lineStyle: {
          width: 2,
          type: 'solid'
        }
      },
      {
        type: 'line',
        name:'目标',
        data: purpose,
        color: '#782d19', //设置颜色
        smooth: false, // 是否平滑曲线显示
        symbolSize: 0, //设置拐点大小
        lineStyle: {
          width: 3,
          type: 'dashed'  //'dotted'虚线 'solid'实线
        }
      }
    ]
    const chartData = {
      xAxis_data: xAxis_data,
      names: ['Mean偏移百分比','目标'],
      series: series
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
  // Cp/Cpk趋势图处理方法
  function getCPKTrendRate(val) {
    const xAxis_data = []
    const purpose = []
    const cp = []
    const cpk = []
    const data = val.chartData.iControlCpCpkTrend
    const parmas = val.params
    if(parmas.yearDemintion) { // 时间维度年
      data.spcProductIControlCpCpkYearTrend.map(item => {
        xAxis_data.push(item.year+'年')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cp.push(item.cp ? item.cp.toFixed(2) * 100 : 0)
        cpk.push(item.cpk ? item.cpk.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.seasonDemintion) { // 时间维度季
      data.spcProductIControlCpCpkSeasonTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.season+'季度')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cp.push(item.cp ? item.cp.toFixed(2) * 100 : 0)
        cpk.push(item.cpk ? item.cpk.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.monthDemintion) { // 时间维度月
      data.spcProductIControlCpCpkMonthTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.month+'月')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cp.push(item.cp ? item.cp.toFixed(2) * 100 : 0)
        cpk.push(item.cpk ? item.cpk.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.weekDemintion) { // 时间维度周
      data.spcProductIControlCpCpkWeekTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.week+'周')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cp.push(item.cp ? item.cp.toFixed(2) * 100 : 0)
        cpk.push(item.cpk ? item.cpk.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.dayDemintion) { // 时间维度日
      data.spcProductIControlCpCpkDayTrend.map(item => {
        xAxis_data.push(item.day)
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cp.push(item.cp ? item.cp.toFixed(2) * 100 : 0)
        cpk.push(item.cpk ? item.cpk.toFixed(2) * 100 : 0)
      })
    }
    const series = [
      {
        type: 'line',
        name: 'Cp',
        data: cp,
        areaStyle: {},
        color: '#20a9d9',
        lineStyle: {
          width: 2,
          type: 'solid'
        }
      },
      {
        type: 'line',
        name: 'Cpk',
        data: cpk,
        areaStyle: {},
        color: '#014d64',
        lineStyle: {
          width: 2,
          type: 'solid'
        }
      },
      {
        type: 'line',
        name: '目标值Cpk',
        data: purpose,
        color: '#782d19',
        smooth: false,
        symbolSize: 0,
        lineStyle: {
          width: 3,
          type: 'dashed'
        }
      }
    ]
    const chartData = {
      xAxis_data: xAxis_data,
      names: ['Cp','Cpk','目标值Cpk'],
      series: series
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
  // Cov趋势图处理方法
  function getCovTrendRate(val) {
    const xAxis_data = []
    const purpose = []
    const cov = []
    const data = val.chartData.iControlCovTrend
    const parmas = val.params
    if(parmas.yearDemintion) { // 时间维度年
      data.spcProductIControlCovYearTrend.map(item => {
        xAxis_data.push(item.year+'年')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cov.push(item.cov ? item.cov.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.seasonDemintion) { // 时间维度季
      data.spcProductIControlCovSeasonTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.season+'季度')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cov.push(item.cov ? item.cov.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.monthDemintion) { // 时间维度月
      data.spcProductIControlCovMonthTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.month+'月')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cov.push(item.cov ? item.cov.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.weekDemintion) { // 时间维度周
      data.spcProductIControlCovWeekTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.week+'周')
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cov.push(item.cov ? item.cov.toFixed(2) * 100 : 0)
      })
    }
    if(parmas.dayDemintion) { // 时间维度日
      data.spcProductIControlCovDayTrend.map(item => {
        xAxis_data.push(item.day)
        purpose.push(item.purpose ? item.purpose.toFixed(2) * 100 : 0)
        cov.push(item.cov ? item.cov.toFixed(2) * 100 : 0)
      })
    }
    const series = [
      { // 设置series
        type: 'line',
        name: 'COV',
        data: cov,
        areaStyle: {},
        color: '#014d64', //设置颜色
        lineStyle: {
          width: 2,
          type: 'solid'
        }
      },
      {
        type: 'line',
        name:'目标',
        data: purpose,
        color: '#782d19', //设置颜色
        smooth: false, // 是否平滑曲线显示
        symbolSize: 0, //设置拐点大小
        lineStyle: {
          width: 3,
          type: 'dashed'  //'dotted'虚线 'solid'实线
        }
      }
    ]
    const chartData = {
      xAxis_data: xAxis_data,
      names: ['COV','目标'],
      series: series
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/style/row.scss';
</style>