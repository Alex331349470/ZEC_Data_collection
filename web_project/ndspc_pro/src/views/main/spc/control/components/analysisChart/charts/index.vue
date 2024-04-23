<template>
  <div class="card-list">
    <div class="card-left">
      <Row v-for="row in list" :key="row.id" :row="row" />
    </div>
    <div class="card-right">
      <CapabilityRow :row="capabilityRow" />
      <ZhengtaiRow :row="zhengtaiRow" />
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import Row from './row.vue'
import ZhengtaiRow from './zhengtaiBox.vue'
import CapabilityRow from './capability.vue'
export default defineComponent({
  components: { Row, ZhengtaiRow, CapabilityRow },
  setup() {
    const list = [
      { id: 1, name: '来料合格趋势图', data: '100000', color: '#4e73df', icon: 'sfont system-yonghu', isExport: true },
      { id: 2, name: '工厂来料合格率', data: '30', color: '#1cc88a', icon: 'sfont system-xiaoxi' }
    ]
    const zhengtaiRow = { id: 2, name: '拟合正态', data: '30', color: '#1cc88a', icon: 'sfont system-xiaoxi' }
    const capabilityRow = { id: 2, name: '过程能力', data: '30', color: '#1cc88a', icon: 'sfont system-xiaoxi' }
    return {
      list,
      zhengtaiRow,
      capabilityRow
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
  .card-left {
    width: 55%;
  }
  .card-right {
    width: 44%;
    margin-left: 5px;
  }
</style>