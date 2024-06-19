<template>
  <div class="card-list">
    <div class="card-left">
      <Row v-for="(row, index) in list" :key="row.id" :row="row" v-loading="loading" :ref="el => setComponentRef(el, index)" />
    </div>
    <div class="card-right">
      <CapabilityRow :row="capabilityRow" v-loading="loading" ref="capRef"/>
      <ZhengtaiRow :row="zhengtaiRow" v-loading="loading" ref="zhengtaiRef"/>
    </div>
  </div>
</template>

<script setup>
import Row from './row.vue'
import ZhengtaiRow from './zhengtaiBox.vue'
import CapabilityRow from './capability.vue'
import {reactive, ref, nextTick } from 'vue'
import {spcProductAnalyze} from '@/api/spc/analysis'
import config from '@/utils/system/config'
defineExpose({ handleSearch })
const list = reactive([{ id: 1, name: 'I控制图'},{ id: 2, name: 'MR控制图'}])
const zhengtaiRow = reactive({ id: 1, name: '拟合正态'})
const capabilityRow = reactive({ id: 1, name: '过程能力'})
const loading = ref(true)
const componentRefs = ref([])// 用于存储组件引用的数组
const capRef = ref(null) // 过程能力组件引用
const zhengtaiRef = ref(null) // 拟合正态组件引用
// 设置组件引用的函数
function setComponentRef(el, index) {
  componentRefs.value[index] = el
}
async function handleSearch(params) {
  loading.value = true
  nextTick// 等待 Vue 渲染完成后再进行操作
  await nextTick()
  spcProductAnalyze({input: params}).then(res => { // 柏拉图数据在组件里请求
    componentRefs.value.map(item => {
      item.refreshData({chartData: res.data.spcProductAnalyze, params: params})
    })
    capRef.value.refreshData(res.data.spcProductAnalyze.processCapability)
    zhengtaiRef.value.refreshData(res.data.spcProductAnalyze.normalDistribution)
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