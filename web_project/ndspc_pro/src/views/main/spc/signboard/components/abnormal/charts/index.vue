<template>
  <div class="card-list">
    <Row v-loading="loading" v-for="(row, index) in list" :key="row.id" :row="row" :ref="el => setComponentRef(el, index)"/>
  </div>
</template>

<script setup>
import Row from './row.vue'
import {reactive, ref, nextTick} from 'vue'
import {SpcProductOCC} from '@/api/spc/signboard'
defineExpose({ handleSearch })
const list = reactive([
  { id: 1, name: 'OOC数量趋势图'},
  { id: 3, name: '工厂OOC数量'},
  { id: 4, name: '车间OOC数量'},
  { id: 5, name: '产线OOC数量'},
  { id: 7, name: '物料类型OOC数量'},
  { id: 8, name: '物料编码OOC数量' },
  { id: 9, name: '物料编码OOC柏拉图'},
  { id: 10, name: '检测数量OOC柏拉图'}
])
const loading = ref(true)
const componentRefs = ref([])// 用于存储组件引用的数组
// 设置组件引用的函数
function setComponentRef(el, index) {
  componentRefs.value[index] = el
}
async function handleSearch(params) {
  loading.value = true
  nextTick// 等待 Vue 渲染完成后再进行操作
  await nextTick()
  SpcProductOCC({input: params}).then(res => { // 柏拉图数据在组件里请求
    componentRefs.value.map(item => {
      item.refreshData({chartData: res.data.spcProductOCC, params: params})
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