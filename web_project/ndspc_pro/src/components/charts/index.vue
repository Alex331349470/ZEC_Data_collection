
<template>
  <div ref="chart" class="chart" />
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick} from 'vue'
import * as echarts from 'echarts'
import { useEventListener } from '@vueuse/core'
const props = defineProps({
  option: Object
})
defineExpose({ cancelSelected })
const emit = defineEmits(['onSelect'])
const seriesName = ['生产数量','生产重量']
const chart = ref(null)
const highlightedIndex = ref(null)
let myChart = null
onMounted(async () => {
  const dom = chart.value
  if (dom) {
    // nextTick等待dom渲染完成
    await nextTick()
    // 初始化echarts对象
    myChart = echarts.init(dom)
    myChart.setOption(props.option || {})
    // 监听点击事件
    myChart.on('click', function (params) {
      var dataIndex = params.dataIndex
      if(seriesName.includes(params.seriesName)) {
        emit('onSelect', params)
      }
      console.log(params)
      if(params.componentType === 'series' && params.seriesType === 'line' && params.seriesName == 'I值' && params.data.jugeStatus) {
        if (highlightedIndex.value === dataIndex) {// 取消拐点高亮
          cancelHighlight(params)
        } else { // 设置高亮
          setHighlight(params)
        }
      }
    })
    window.addEventListener('resize', resizeHandler)
  }
})
// 监听窗口大小变化，自动调整图表大小
const resizeHandler = () => {
  myChart && myChart.resize()
}
// 销毁时移除resize事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  myChart && myChart.dispose()
})
// 取消折线图拐点高亮
function cancelHighlight(params) {
  var dataIndex = params.dataIndex
  myChart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: highlightedIndex.value
  })
  myChart.setOption({
    series: [{
      data: props.option.series[0].data.map((item, index) => {
        return {
          ...item,
          itemStyle: {
            color: item.jugeStatus ? '#782d19' : '#014d64'
          }
        }
      })
    }]
  })
  highlightedIndex.value = null
  emit('onSelect', false)
}
// 设置折线图拐点高亮
function setHighlight(params) {
  var dataIndex = params.dataIndex
  // 如果点击的是其他点，先恢复之前变化颜色的点，然后改变当前点的颜色
  if (highlightedIndex.value !== null) {
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: highlightedIndex.value
    })
    myChart.setOption({
      series: [{
        data: props.option.series[0].data.map((item, index) => {
          return {
            ...item,
            itemStyle: {
              color: item.jugeStatus ? '#782d19' : '#014d64'
            }
          }
        })
      }]
    })
  }
  myChart.setOption({
    series: [{
      data: props.option .series[0].data.map((item, index) => {
        return {
          ...item,
          itemStyle: {
            color: index === dataIndex ? '#ff0000' : item.jugeStatus ? '#782d19' : '#014d64'
          }
        }
      })
    }]
  })
  highlightedIndex.value = dataIndex
  // 获取拐点位置
  const pointPosition = myChart.convertToPixel({ seriesIndex: params.seriesIndex }, [params.dataIndex, params.value]);
  emit('onSelect', {data: params, position: {top: pointPosition[1], left: pointPosition[0] + 10 }})
}
// 取消所有系列的选中状态
function cancelSelected(params) {
  console.log(params)
  if(params.componentType === 'series' && params.seriesType === 'line' && params.seriesName == 'I值' && params.data.jugeStatus) {
    cancelHighlight(params)
  } else {
    myChart.dispatchAction({
      type: 'unselect',
      seriesIndex: params.seriesIndex,
      dataIndex: params.dataIndex
    })
  }
}
watch(() => props.option, (newVal) => {
  if (myChart) {
    myChart.setOption(newVal)
  }
}, { deep: true })
</script>

<style lang="scss" scoped>
  .chart {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
</style>