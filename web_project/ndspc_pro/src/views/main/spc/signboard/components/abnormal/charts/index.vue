<template>
  <div class="card-list">
    <Row v-for="row in list" :key="row.id" :row="row" v-loading="loading" />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import Row from './row.vue'
import {reactive, ref} from 'vue'
defineExpose({ handleSearch })
const list = reactive([
  { id: 1, name: 'OOC数量趋势图'},
  { id: 2, name: '工序OOC数量'},
  { id: 3, name: '工厂OOC数量'},
  { id: 4, name: '车间OOC数量'},
  { id: 5, name: '产线OOC数量'},
  { id: 6, name: '设备编号OOC数量'},
  { id: 7, name: '物料类型OOC数量'},
  { id: 8, name: '物料编码OOC数量' },
  { id: 9, name: '物料编码OOC柏拉图'},
  { id: 10, name: '检测数量OOC柏拉图'}
])
const loading = ref(true)
function handleSearch(parmas) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
  console.log(parmas)
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