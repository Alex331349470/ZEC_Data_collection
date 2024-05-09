<template>
  <div ref="chart" :style="{'width': boxWidth+'px', 'height': '100px'}"></div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import { DatasetComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CustomChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([DatasetComponent, TooltipComponent, VisualMapComponent, CustomChart, CanvasRenderer])
import * as d3 from 'd3'
import { ref, onMounted,nextTick } from 'vue'

const props = defineProps({
  boxWidth: {
    type: Number,
    default: 300
  },
})
const chart = ref(null)

const colorList = [
  '#10904a',
  '#2fc06f',
  '#da998c',
  '#f7e89b',
  '#fff000',
]

let option = {}
let seriesData = [
  {
    depth: 1,
    id: 'city',
    index: 0,
    value: 2
  },
  {
    depth: 1,
    id: 'city.孝感',
    index: 6,
    value: 6
  },
  {
    depth: 1,
    id: 'city.武汉',
    index: 1,
    value: 36
  },
  {
    depth: 1,
    id: 'city.荆州',
    index: 2,
    value: 26
  },
  {
    depth: 1,
    id: 'city.咸宁',
    index: 3,
    value: 16
  }
]

let displayRoot = stratify1()

function stratify1() {
  return d3
    .stratify()
    .parentId(function (d) {
      return d.id.substring(0, d.id.lastIndexOf('.'))
    })(seriesData)
    .sum(function (d) {
      return d.value || 0
    })
    .sort(function (a, b) {
      return b.value - a.value
    })
}

function overallLayout(params, api) {
  let context = params.context
  d3
    .pack()
    .size([api.getWidth() - 2, api.getHeight() - 2])
    .padding(0)(displayRoot)
  context.nodes = {}

  displayRoot.descendants().forEach(function (node) {
    context.nodes[node.id] = node
  })
}

function renderItem(params, api) {
  let context = params.context
  let idx = params.dataIndex

  // Only do that layout once in each time `setOption` called.
  // 每次调用“setOption”时，只能进行一次布局。
  if (!context.layout) {
    context.layout = true
    overallLayout(params, api)
  }

  let nodePath = api.value('id')
  const nodeValue = api.value('value')
  let nodeName = nodeValue
  let node = context.nodes[nodePath]
  if (node.id === 'city') {
    node.r = 0
  }
  if (!node) {
    // Reder nothing.
    return
  }

  let colorTop = colorList[idx % colorList.length]

  // 创建对象
  let linearGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: colorTop },
    { offset: 1, color: colorTop }
  ])

  let z2 = api.value('depth') * 2
  return {
    type: 'circle',
    shape: {
      cx: node.x,
      cy: node.y,
      r: node.r
    },
    transition: ['shape'],
    z2: z2,
    textContent: {
      type: 'text',
      style: {
        text: nodeName,
        fill: '#fff',
        fontFamily: 'Arial',
        width: node.r * 1.3,
        overflow: 'truncate',
        fontSize: Math.max(node.r / 2, 12)
      },
      emphasis: {
        style: {
          overflow: null,
          fontSize: Math.max(node.r / 2, 12)
        }
      }
    },
    textConfig: {
      position: 'inside'
    },
    style: {
      fill: linearGradient
    },
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

option = {
  dataset: {
    source: seriesData
  },
  tooltip: {},
  hoverLayerThreshold: Infinity,
  series: [
    {
      type: 'custom',
      colorBy: 'data',
      renderItem: renderItem,
      progressive: 0,
      coordinateSystem: 'none',
      encode: {
        tooltip: 'value',
        itemName: 'id'
      }
    }
  ]
}

const initEcharts = () => {
  const myChart = echarts.init(chart.value)
  myChart.setOption(option)
}

onMounted(() => {
  nextTick(() => {
    if(chart.value) {
      initEcharts()
    }
  })
})
</script>
