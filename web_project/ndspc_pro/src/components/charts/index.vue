/**
* 使用说明：用户只需传入options即可，options请参照官网示例中的options
* 本组件采用整包引入echarts的方法，用于适配所有的echarts控件
* 如需按需加载引入echarts，可参照写法：echarts官网/在打包环境中使用ECharts
*/
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

const chart = ref(null)
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
      console.log(params)
    })
    // 监听窗口大小变化，自动调整图表大小
    const resizeHandler = () => {
      myChart && myChart.resize()
    }
    window.addEventListener('resize', resizeHandler)
    // 销毁时移除resize事件监听器
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler)
      myChart && myChart.dispose()
    })
  }
})
watch(() => props.option, (newVal) => {
  // 当 props.option 改变时更新图表数据
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