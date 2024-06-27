<template>
  <div class="box">
    <div ref="chart" :style="{width: boxWidth + 'px', height: '100px'}"></div>
    <!-- <ComDialog ref="dialogRef" dialogTitle="控制图清单" :fullScreen="true" :hiddenFooter="true">
      <TableData :data="tableData"/>
    </ComDialog> -->
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import * as d3 from 'd3'
import ComDialog from '@/components/comDialog/index.vue'
import TableData from './tableData.vue'
import { ref, onMounted, nextTick, reactive } from 'vue'

const props = defineProps({
  boxWidth: {
    type: Number,
    default: 300
  },
  chartData: {
    type: Object,
    default: () => ({})
  }
})

const dialogRef = ref(false)
const chart = ref(null)
const colorList = ['#10904a', '#2fc06f', '#da998c', '#f7e89b']
const option = ref({})
const seriesData = ref([])
const displayRoot = ref(null)
const tableData = reactive([])

function stratify1() {
  return d3
    .stratify()
    .parentId(d => d.id.substring(0, d.id.lastIndexOf('.')))
    (seriesData.value)
    .sum(d => d.value || 0)
    .sort((a, b) => b.value - a.value)
}

function overallLayout(params, api) {
  const context = params.context
  d3.pack().size([api.getWidth() - 2, api.getHeight() - 2]).padding(0)(displayRoot.value)
  context.nodes = {}
  displayRoot.value.descendants().forEach(node => {
    context.nodes[node.id] = node
  })
}

function renderItem(params, api) {
  const context = params.context
  if (!context.layout) {
    context.layout = true
    overallLayout(params, api)
  }

  const nodePath = api.value('id')
  const nodeValue = api.value('value')
  const node = context.nodes[nodePath]
  if (!node || node.id === 'name') {
    return
  }

  const colorTop = colorList[node.data.index]
  const linearGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: colorTop },
    { offset: 1, color: colorTop }
  ])

  return {
    type: 'circle',
    shape: { cx: node.x, cy: node.y, r: node.r },
    transition: ['shape'],
    z2: api.value('depth') * 2,
    textContent: {
      type: 'text',
      style: {
        text: nodeValue,
        fill: '#626262',
        fontFamily: 'Arial',
        width: node.r * 1.3,
        overflow: 'truncate',
        fontSize: Math.max(node.r / 2, 12)
      },
      emphasis: { style: { overflow: null, fontSize: Math.max(node.r / 2, 12) } }
    },
    textConfig: { position: 'inside' },
    style: { fill: linearGradient },
    emphasis: {
      style: {
        fontFamily: 'Arial',
        fontSize: 12,
        shadowBlur: 20,
        shadowOffsetX: 3,
        shadowOffsetY: 5,
        shadowColor: 'rgba(0,0,0,0.3)'
      }
    }
  }
}

function initEcharts() {
  const myChart = echarts.init(chart.value)
  myChart.setOption(option.value)
  myChart.on('click', params => {
    console.log('点击', params)
    // dialogRef.value.visible = true
  })
}

function getSerieData() {
  getColor0()
  seriesData.value = [
    { depth: 1, id: 'name', index: 0, value: 0 },
    { depth: 1, id: 'name.总数', index: 0, value: props.chartData.total },
    { depth: 1, id: 'name.正常运行', index: 1, value: props.chartData.connect },
    { depth: 1, id: 'name.停止运行', index: 2, value: props.chartData.disconnect },
    { depth: 1, id: 'name.未运行', index: 3, value: props.chartData.noDataConnect }
  ]
  displayRoot.value = stratify1()
  option.value = getOption()
  initEcharts()
}

function getColor0() {
  if (props.chartData.noDataConnect > props.chartData.disconnect + props.chartData.connect) {
    colorList[0] = '#FF0000' // 红色
  } else if (props.chartData.noDataConnect < props.chartData.disconnect && props.chartData.noDataConnect < props.chartData.connect) {
    colorList[0] = '#00FF00' // 绿色
  } else {
    colorList[0] = '#FFFF00' // 黄色
  }
}

function getOption() {
  return {
    dataset: { source: seriesData.value },
    tooltip: {
      formatter: function (param) {
        const seriesName = param.name.split('.')[1]
        const value = param.data.value
        const color = colorList[param.data.index]
        return `<div>
                  <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${color};"></span>
                  ${seriesName}：${value}<br/>
                </div>`
      }
    },
    hoverLayerThreshold: Infinity,
    series: [
      {
        type: 'custom',
        colorBy: 'data',
        renderItem: renderItem,
        progressive: 0,
        coordinateSystem: 'none',
        selectedMode: 'single',
        encode: { tooltip: 'value', itemName: 'id' }
      }
    ]
  }
}

onMounted(() => {
  nextTick(getSerieData)
})
</script>
