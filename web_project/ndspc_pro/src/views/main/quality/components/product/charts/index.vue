<template>
  <div class="card-list">
    <Row v-for="(row, index) in list" :key="row.id" :row="row" :ref="el => setComponentRef(el, index)"/>
  </div>
</template>

<script setup>
import { reactive,defineExpose,ref, nextTick } from 'vue'
import {productQC} from '@/api/quality/product'
import Row from './row.vue'
defineExpose({ handleSearch })
const componentRefs = ref([])// 用于存储组件引用的数组
const list = reactive([
  { id: 1, name: '来料合格趋势图', isExport: true, chartData: {} },
  { id: 2, name: '工厂来料合格率', chartData: {}},
  { id: 3, name: '供应商来料合格率', chartData: {}},
  { id: 4, name: '物料类型合格率', chartData: {}},
  { id: 5, name: '物料编码合格率', chartData: {}},
  { id: 6, name: '检测项目合格率', chartData: {}},
  { id: 7, name: '物料编码不良数量柏拉图', chartData: {}},
  { id: 8, name: '检测项目不良数量柏拉图', chartData: {}}
])
// 设置组件引用的函数
function setComponentRef(el, index) {
  componentRefs.value[index] = el
}
async function handleSearch(params) {
  getData(params)
  nextTick// 等待 Vue 渲染完成后再进行操作
  await nextTick()
  componentRefs.value.map(item => {
    item.handleSearch(params)
  })
}
function getData(params) {
  productQC({input: params}).then(res => {
    console.log(res)
  }).catch(error => {
    console.log(error)
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
</style>