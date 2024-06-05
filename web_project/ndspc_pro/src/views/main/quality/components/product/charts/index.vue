<template>
  <div class="card-list" >
    <Row v-loading="loading" v-for="(row, index) in list" :key="row.id" :row="row" :ref="el => setComponentRef(el, index)"/>
  </div>
</template>

<script setup>
import { reactive,defineExpose,ref, nextTick } from 'vue'
import {productQC} from '@/api/quality/product'
import Row from './row.vue'
defineExpose({ handleSearch })
const componentRefs = ref([])// 用于存储组件引用的数组
const loading = ref(true)
const list = reactive([
  { id: 1, name: '成品合格趋势图', isExport: true },
  { id: 2, name: '工厂合格率' },
  { id: 3, name: '车间合格率' },
  { id: 4, name: '产线合格率' },
  { id: 5, name: '物料类型合格率' },
  { id: 6, name: '物料编码合格率' },
  { id: 7, name: '物料编码不良数量柏拉图'},
  { id: 8, name: '检测项目不良数量柏拉图'}
])
// 设置组件引用的函数
function setComponentRef(el, index) {
  componentRefs.value[index] = el
}
async function handleSearch(params) {
  loading.value = true
  nextTick// 等待 Vue 渲染完成后再进行操作
  await nextTick()
  productQC({input: params}).then(res => { // 柏拉图数据在组件里请求
    componentRefs.value.map(item => {
      item.refreshData({chartData: res.data, params: params})
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
</style>