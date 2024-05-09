<template>
  <div class="card-list">
    <Row v-for="row in list" :key="row.id" :row="row" />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import Row from './row.vue'
export default defineComponent({
  components: { Row },
  setup() {
    const list = [
      { id: 1, name: '来料合格趋势图', isExport: true },
      { id: 2, name: '工厂来料合格率'},
      { id: 3, name: '供应商来料合格率'},
      { id: 4, name: '物料类型合格率'},
      { id: 5, name: '物料编码合格率'},
      { id: 6, name: '检测项目合格率'},
      { id: 7, name: '物料编码不良数量柏拉图'},
      { id: 8, name: '检测项目不良数量柏拉图'}
    ]
    return {
      list
    }
  }
})
</script>

<style lang="scss" scoped>
  .card-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #343541;
  }
</style>