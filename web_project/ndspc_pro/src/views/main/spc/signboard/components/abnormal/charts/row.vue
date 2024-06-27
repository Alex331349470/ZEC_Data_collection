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
    <BarChart ref="chartRef" @changeSelect="changeSelect" />
    <ComDialog ref="chartDialogRef" :dialogTitle="row.name" :fullScreen="true" :hiddenFooter="true" @handleClose="handleClose">
      <div class="charBox">
        <div class="card-title">
          <div class="left">
            <div class="tip-dot" />
            <span class="name">{{ row.name }}</span>
          </div>
        </div>
        <BarChart v-if="showChart" ref="chartsRef" boxHeight="calc(100vh - 110px)" @changeSelect="changeSelect"/>
      </div>
    </ComDialog>
  </div>
</template>

<script setup>
import {ref,reactive, nextTick } from 'vue'
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
      case 'OOC数量趋势图':
        getOOCTrend(params)
        break
      case '工厂OOC数量':
        getOOCFactory(params)
        break
      case '车间OOC数量':
        getOOCWorkShop(params)
        break
      case '产线OOC数量':
        getOOCLine(params)
        break
      case '物料类型OOC数量':
        getOOCMaterialType(params)
        break
      case '物料编码OOC数量':
        getOOCMaterialCode(params)
        break
      case '物料编码OOC柏拉图':
        getOOCMaterialCodePlato(params)
        break
      case '检测数量OOC柏拉图':
        getOOCTestItemPlatoPlato(params)
        break
    }
  }
  // OOC数量趋势图处理方法
  function getOOCTrend(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const data = val.chartData.oocTrend
    const parmas = val.params
    if(parmas.yearDemintion) { // 时间维度年
      data.yearTrend.map(item => {
        xAxis_data.push(item.year+'年')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.seasonDemintion) { // 时间维度季
      data.seasonTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.season+'季度')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.monthDemintion) { // 时间维度月
      data.monthTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.month+'月')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.weekDemintion) { // 时间维度周
      data.weekTrend.map(item => {
        xAxis_data.push(item.year+'年-'+item.week+'周')
        amount.push(item.poorAmount)
      })
    }
    if(parmas.dayDemintion) { // 时间维度日
      data.dayTrend.map(item => {
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
  // 工厂OOC数量处理方法
  function getOOCFactory(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const data = val.chartData.oocFactory
    data.map(item => {
      xAxis_data.push(item.factory)
      amount.push(item.poorAmount)
    })
    const series = [{ // 设置series
      type: 'bar',
      name: '异常点数量',
      data: amount,
      color: '#014d64', //设置颜色
      barWidth: 30,
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
  // 车间OOC数量处理方法
  function getOOCWorkShop(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const data = val.chartData.oocWorkShop
    data.map(item => {
      xAxis_data.push(item.workshop)
      amount.push(item.poorAmount)
    })
    const series = [{ // 设置series
      type: 'bar',
      name: '异常点数量',
      data: amount,
      color: '#014d64', //设置颜色
      barWidth: 30,
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
  // 产线OOC数量处理方法
  function getOOCLine(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const data = val.chartData.oocLine
    data.map(item => {
      xAxis_data.push(item.line)
      amount.push(item.poorAmount)
    })
    const series = [{ // 设置series
      type: 'bar',
      name: '异常点数量',
      data: amount,
      color: '#014d64', //设置颜色
      barWidth: 30,
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
  // 物料类型OOC数量处理方法
  function getOOCMaterialType(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const data = val.chartData.oocMaterialType
    data.map(item => {
      xAxis_data.push(item.materialType)
      amount.push(item.poorAmount)
    })
    const series = [{ // 设置series
      type: 'bar',
      name: '异常点数量',
      data: amount,
      color: '#014d64', //设置颜色
      barWidth: 30,
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
  // 物料编码OOC数量处理方法
  function getOOCMaterialCode(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const data = val.chartData.oocMaterialCode
    data.map(item => {
      xAxis_data.push(item.materialCode)
      amount.push(item.poorAmount)
    })
    const series = [{ // 设置series
      type: 'bar',
      name: '异常点数量',
      data: amount,
      color: '#014d64', //设置颜色
      barWidth: 30,
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
  // 物料编码OOC柏拉图处理方法
  function getOOCMaterialCodePlato(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const proportion = [] //百分比
    const data = val.chartData.oocMaterialCodePlato
    data.map(item => {
      xAxis_data.push(item.materialCode)
      amount.push(item.poorAmount)
      proportion.push(item.proportion ? item.proportion.toFixed(2) : 0)
    })
    const series = [
      { // 设置series
        type: 'bar',
        name: '异常点数量',
        data: amount,
        color: '#014d64', //设置颜色
        barWidth: 30,
        lineStyle: {
          width: 2,
          type: 'solid'
        },
        yAxisIndex: 0
      },{
				type: 'line',
				name: '累计百分比',
				data: proportion,
				color: '#10a5d9', //设置颜色
				smooth: false, // 是否平滑曲线显示
				symbolSize: 0, //设置拐点大小
				lineStyle: {
					width: 3,
					type: 'dashed'  //'dotted'虚线 'solid'实线
				},
				label: {
					show: true,
					position: 'top', // 显示位置
					formatter: `{c} %` // 格式化显示内容，{c} 表示数值
				},
				yAxisIndex: 1
			}
    ]
    const chartData = {
      xAxis_data: xAxis_data,
      names: ['异常点数量','累计百分比'],
      series: series
    }
    if(chartDialogRef.value.visible) { // 弹窗内的
      chartsRef.value.initChart(chartData)
    } else {
      chartRef.value.initChart(chartData)
    }
  }
  // 检测数量OOC柏拉图处理方法
  function getOOCTestItemPlatoPlato(val) {
    const xAxis_data = []
    const amount = [] // 异常数
    const proportion = [] //百分比
    const data = val.chartData.oocTestItemPlato
    data.map(item => {
      xAxis_data.push(item.testItem)
      amount.push(item.poorAmount)
      proportion.push(item.proportion ? item.proportion.toFixed(2) : 0)
    })
    const series = [
      { // 设置series
        type: 'bar',
        name: '不合格数量',
        data: amount,
        color: '#014d64', //设置颜色
        barWidth: 30,
        lineStyle: {
          width: 2,
          type: 'solid'
        },
        yAxisIndex: 0
      },{
				type: 'line',
				name: '累计百分比',
				data: proportion,
				color: '#10a5d9', //设置颜色
				smooth: false, // 是否平滑曲线显示
				symbolSize: 0, //设置拐点大小
				lineStyle: {
					width: 3,
					type: 'dashed'  //'dotted'虚线 'solid'实线
				},
				label: {
					show: true,
					position: 'top', // 显示位置
					formatter: `{c} %` // 格式化显示内容，{c} 表示数值
				},
				yAxisIndex: 1
			}
    ]
    const chartData = {
      xAxis_data: xAxis_data,
      names: ['不合格数量','累计百分比'],
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