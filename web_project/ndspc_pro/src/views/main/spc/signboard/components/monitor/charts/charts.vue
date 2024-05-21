<template>
  <div class="box">
    <div ref="chart" :style="{'width': boxWidth+'px', 'height': '100px'}"></div>
    <ComDialog ref="dialogRef" dialogTitle="控制图清单" :fullScreen="true" :hiddenFooter="true" >
      <TableData :data="tableData"/>
    </ComDialog>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import * as d3 from 'd3'
import ComDialog from '@/components/comDialog/index.vue'
import TableData from './tableData.vue'
import { ref, onMounted,nextTick,reactive } from 'vue'
const props = defineProps({
  boxWidth: {
    type: Number,
    default: 300
  }
})
const dialogRef = ref(false)
const chart = ref(null)
const colorList = [
  '#10904a',
  '#2fc06f',
  '#da998c',
  '#f7e89b'
]
let option = {}
let seriesData = [
  { depth: 1, id: 'name', index: 0, value: 2 },
  { depth: 1, id: 'name.总数',index: 0,value: 20},
  { depth: 1, id: 'name.正常运行',index: 1,value: 5},
  { depth: 1, id: 'name.停止运行',index: 2,value: 10},
  { depth: 1, id: 'name.未运行',index: 3,value: 5},
]
let displayRoot = stratify1()
const tableData = reactive([])
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
  if (node.id === 'name') {
    node.r = 0
  }
  if (!node) {
    // Reder nothing.
    return
  }
  let colorTop = colorList[node.data.index]
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
  tooltip: {
    formatter: function (param, ticket, callback) {
      var htmlStr = '';
      var seriesName = param.name.split('.')[1];//图例名称
      var value = param.data.value;//y轴值
      var color = colorList[param.data.index];//图例颜色
      htmlStr += '<div>';
      htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';//一个点
      htmlStr += seriesName + '：' + value + '<br/>';//图例名称：y轴值圆点后面显示的文本
      htmlStr += '</div>';
      return htmlStr;
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
  // 监听点击事件
  myChart.on('click', function (params) {
    console.log('点击',params)
    dialogRef.value.visible = true
  })
}

onMounted(() => {
  nextTick(() => {
    if(chart.value) {
      initEcharts()
    }
  })
})
</script>
