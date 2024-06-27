<template>
  <div class="card-list" v-loading="loading">
    <div class="card">
      <div class="flex">
        <div class="card-title defalt-width" ref="boxRef">工厂</div>
        <div class="card-title defalt-width">车间</div>
        <div class="card-title auto-width" ref="autoRef">产线</div>
      </div>
      <el-empty v-if="factories.length === 0 && !loading" />
      <div v-else>
        <div class="charBox flex" v-for="(factory, index) in factories" :key="index">
          <div class="chart" :style="{width: boxWidth +'px'}">
            <div class="left">
              <div class="tip">{{factory.factory}}</div>
              <div v-for="(status, idx) in factory.colorList" :key="idx" class="flex" style="font-size: 12px; margin-top: 5px;">
                <div :style="{background: status.color}" class="shape"></div>
                <div>{{status.name}}</div>
              </div>
            </div>
            <div class="center-flex">
              <BarChart :boxWidth="300" :chartData="factory"/>
            </div>
          </div>
          <div>
            <div class="charBox flex" v-for="(workshop, idx) in factory.workshops" :key="idx">
              <div class="chart" :style="{width: boxWidth +'px'}">
                <div class="tip left">{{workshop.workshop}}</div>
                <div class="center-flex">
                  <BarChart :boxWidth="300" :chartData="workshop"/>
                </div>
              </div>
              <div :style="{width: autoWidth +'px', overflow: 'auto'}" class="flex">
                <div v-for="(line, idxx) in workshop.lines" :key="idxx">
                  <div class="chart">
                    <div class="tip">{{line.line}}</div>
                    <div class="center-flex">
                      <BarChart :boxWidth="300" :chartData="line"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BarChart from './charts.vue'
import { useStore } from "vuex";
import {ref, onMounted, nextTick, onBeforeUnmount, watch, computed } from 'vue'
import {SpcProductConnect} from '@/api/spc/signboard'
defineExpose({ handleSearch })
const store = useStore()
const factories = ref([])
const loading = ref(true)
let boxWidth = ref(0)
let boxRef = ref(null)
let autoRef = ref(null)
let autoWidth = ref(0)
const isCollapse = computed(() => store.state.app.isCollapse)
watch(isCollapse, (newVal) => {
  setTimeout(() => {
    resizeHandler()
  }, 300)
})
onMounted(() => {
  if(boxRef.value && autoRef.value) {
    window.addEventListener('resize', resizeHandler)
    nextTick(() => {
      boxWidth.value = boxRef.value.offsetWidth
      autoWidth.value = autoRef.value.offsetWidth
    })
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
function resizeHandler() {
  nextTick(() => {
    autoWidth.value = autoRef.value.offsetWidth
    boxWidth.value = boxRef.value.offsetWidth
  })
}
async function handleSearch(params) {
  loading.value = true
  await nextTick()
  SpcProductConnect({input: params}).then(res => {
    processResponseData(res.data.spcProductConnect)
    loading.value = false
  }).catch(error => {
    console.log(error)
    loading.value = false
  });
}
function processResponseData(data) {
  const factoryConnectStatus = data.factoryConnectStatus.map(factory => ({
    factory: factory.factory,
    connect: factory.connect,
    disconnect: factory.disconnect,
    noDataConnect: factory.noDataConnect,
    total: factory.connect + factory.disconnect + factory.noDataConnect,
    workshops: data.workshopConnectStatus.map(workshop => ({
      workshop: workshop.workshop,
      connect: workshop.connect,
      disconnect: workshop.disconnect,
      noDataConnect: workshop.noDataConnect,
      total: workshop.connect + workshop.disconnect + workshop.noDataConnect,
      lines: data.lineConnectStatus.map(line => ({
        line: line.line,
        connect: line.connect,
        disconnect: line.disconnect,
        noDataConnect: line.noDataConnect,
        total: line.connect + line.disconnect + line.noDataConnect
      }))
    }))
  }))
  factoryConnectStatus.map(factory => {
    factory.colorList = getColor0(factory)
  })
  console.log(factoryConnectStatus)
  factories.value = factoryConnectStatus
}
function getColor0(item) {
  const colorList = [
    {name: '总数', color: '#10904a'},
    {name: '正常运行', color: '#2fc06f'},
    {name: '停止运行', color: '#da998c'},
    {name: '未运行', color: '#f7e89b'}
  ]
  if (item.noDataConnect > item.disconnect + item.connect) {
    colorList[0].color = '#FF0000' // 红色
  } else if (item.noDataConnect < item.disconnect && item.noDataConnect < item.connect) {
    colorList[0].color = '#00FF00' // 绿色
  } else {
    colorList[0].color = '#FFFF00' // 黄色
  }
  return colorList
}
</script>

<style lang="scss" scoped>
  .card-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #343541;
  }
  .auto-width {
    width: calc(100% - 840px)!important;
    max-width: unset!important;
    min-width: 35%;
    overflow: auto;
  }
  .defalt-width {
    width: 400px;
    max-width: 28%;
  }
  .card{
    border-radius: 4px;
    margin: 5px;
    box-shadow: 3px 3px 10px 0 rgba(58, 59, 69, 0.15);
    width: 100%;
    font-size: 14px;;
    &-title {
      text-align: center;
      background: #10904a;
      padding: 5px;
      color: #fff;
      margin-left: 10px;
    }
    /* 整个滚动条 */
    ::-webkit-scrollbar {
      height: 5px; /* 设置滚动条的宽度 */
    }
    
    /* 滚动条轨道 */
    ::-webkit-scrollbar-track {
      background: #f1f1f1; /* 设置滚动条轨道的背景颜色 */
    }
    
    /* 滚动条的滑块 */
    ::-webkit-scrollbar-thumb {
      background: #888; /* 设置滚动条滑块的背景颜色 */
    }
    
    /* 当鼠标悬停在滑块上 */
    ::-webkit-scrollbar-thumb:hover {
      background: #b1afaf; /* 设置滚动条滑块的背景颜色 */
    }
  }
  .left {
    float: left;
  }
  .charBox {
    .chart {
      padding-top: 5px;
      margin-top: 10px;
      background-color: #ebffea;
      margin-left: 10px;
    }
  }
  .center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .tip {
    padding: 3px;
    margin-left: 5px;
    background: #2fc06f;
    width: 70px;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
  .shape {
    width: 10px;
    margin: 2px 5px;
  }
</style>