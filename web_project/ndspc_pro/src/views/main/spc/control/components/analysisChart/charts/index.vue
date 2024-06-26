<template>
  <div class="card-list">
    <div class="card-left">
      <Row v-for="(row, index) in list" :key="row.id" :row="row" v-loading="loading" :ref="el => setComponentRef(el, index)" />
    </div>
    <div class="card-right">
      <CapabilityRow :row="capabilityRow" v-loading="loading" ref="capRef"/>
      <ZhengtaiRow :row="zhengtaiRow" v-loading="loading" ref="zhengtaiRef"/>
    </div>
    <TrendRow v-for="(row, index) in trendChartRow" :key="row.id" :row="row" v-loading="loading" :ref="el => setTrendComponentRef(el, index)"/>
  </div>
</template>

<script setup>
import Row from './row.vue'
import TrendRow from './trendRow.vue'
import ZhengtaiRow from './zhengtaiBox.vue'
import CapabilityRow from './capability.vue'
import {spcProductControl} from '@/api/spc/control'
import {reactive, ref, nextTick} from 'vue'
defineExpose({ handleSearch })
const list = reactive([{ id: 1, name: 'I控制图'},{ id: 2, name: 'MR控制图'}])
const zhengtaiRow = reactive({ id: 1, name: '拟合正态'})
const capabilityRow = reactive({ id: 1, name: '过程能力'})
const trendChartRow = reactive([
  { id: 1, name: 'I控制图异常点数量趋势图'},
  { id: 2, name: 'MR控制图异常点数量趋势图'},
  { id: 3, name: 'Mean偏移趋势图'},
  { id: 4, name: 'Cp/Cpk趋势图'},
  { id: 4, name: 'Cov趋势图'}
])
const componentRefs = ref([])// 用于存储组件引用的数组
const trendComponentRefs = ref([])// 用于存储趋势图组件引用的数组
const capRef = ref(null) // 过程能力组件引用
const zhengtaiRef = ref(null) // 拟合正态组件引用
const loading = ref(true)
// 设置组件引用的函数
function setComponentRef(el, index) {
  componentRefs.value[index] = el
}
// 设置趋势图组件引用的函数
function setTrendComponentRef(el, index) {
  trendComponentRefs.value[index] = el
}
async function handleSearch(params) {
  loading.value = true
  nextTick// 等待 Vue 渲染完成后再进行操作
  await nextTick()
  spcProductControl({input: params}).then(res => {
    componentRefs.value.map(item => {
      item.refreshData({chartData: res.data.spcProductControl, params: params})
    })
    capRef.value.refreshData(res.data.spcProductControl.processCapability)
    zhengtaiRef.value.refreshData(res.data.spcProductControl.normalDistribution)
    trendComponentRefs.value.map(item => {
      item.refreshData({chartData: res.data.spcProductControl, params: params})
    })
    loading.value = false
  }).catch(error => {
    console.log(error)
    loading.value = false
  });
}
</script>

<style lang="scss" scoped>
  .card-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #343541;
  }
  .card-left {
    width: 55%;
  }
  .card-right {
    width: calc(45% - 30px);
    margin-left: 5px;
  }
</style>