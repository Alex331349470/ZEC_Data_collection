<template>
  <div class="card-list">
    <div class="card-left">
      <Row v-for="row in list" :key="row.id" :row="row" v-loading="loading"/>
    </div>
    <div class="card-right">
      <CapabilityRow :row="capabilityRow" v-loading="loading"/>
      <ZhengtaiRow :row="zhengtaiRow" v-loading="loading"/>
    </div>
  </div>
</template>

<script setup>
import Row from './row.vue'
import ZhengtaiRow from './zhengtaiBox.vue'
import CapabilityRow from './capability.vue'
import {reactive, ref} from 'vue'
defineExpose({ handleSearch })
const list = reactive([{ id: 1, name: '来料合格趋势图'},{ id: 2, name: '工厂来料合格率'}])
const zhengtaiRow = reactive({ id: 1, name: '拟合正态'})
const capabilityRow = reactive({ id: 1, name: '过程能力'})
const loading = ref(true)
async function handleSearch(params) {
  setTimeout(() => {
    loading.value = false
  }, 1000);
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