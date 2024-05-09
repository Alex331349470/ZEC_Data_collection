<template>
  <div class="card-list">
    <div class="card">
      <div class="flex">
        <div class="card-title defalt-width" ref="boxRef">工厂</div>
        <div class="card-title defalt-width">车间</div>
        <div class="card-title auto-width" ref="autoRef">产线</div>
      </div>
      <div class="charBox flex" v-for="(item, index) in list" :key="index">
        <div class="chart" :style="{width: boxWidth +'px'}">
          <div class="tip">{{item.name}}</div>
          <div class="center-flex">
            <BarChart :boxWidth="300"/>
          </div>
        </div>
        <div>
          <div class="charBox flex" v-for="(row, idx) in item.workshop" :key="idx">
            <div class="chart" :style="{width: boxWidth +'px'}">
              <div class="tip">{{row.name}}</div>
              <div class="center-flex">
                <BarChart :boxWidth="300"/>
              </div>
            </div>
            <div :style="{width: autoWidth +'px', overflow: 'auto'}" class="flex">
              <div v-for="(row1, idx1) in row.producLine" :key="idx1">
                <div class="chart" >
                    <div class="tip">{{row1.name}}</div>
                    <div class="center-flex">
                      <BarChart :boxWidth="300"/>
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
import Row from './row.vue'
import BarChart from './charts.vue'
import { useStore } from "vuex";
import {ref, onMounted, nextTick, onBeforeUnmount, watch, computed } from 'vue'
const store = useStore()
const list = [
  {id: 1, name: '1000', workshop: [{id: 1-1, name: 'M15', producLine: [{id: 1-1-1, name: 'Bo1'}]}]},
  {id: 2, name: 'FST', workshop: [{id: 2-1, name: 'SJ1', producLine: [{id: 2-1-1, name: 'Ao1'}, {id: 2-1-2, name: 'Ao2'},{id: 2-1-3, name: 'Ao5'}]},{id: 2-2, name: 'SJ2', producLine: [{id: 2-2-1, name: 'Ao3'},{id: 2-2-2, name: 'Ao4'}]}]},
]
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
function resizeHandler() {
  nextTick(() => {
    autoWidth.value = autoRef.value.offsetWidth
    boxWidth.value = boxRef.value.offsetWidth
  })
}
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
    height: 60%;
  }
  .tip {
    padding: 4px;
    margin-left: 5px;
    background: #2fc06f;
    width: 70px;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
</style>