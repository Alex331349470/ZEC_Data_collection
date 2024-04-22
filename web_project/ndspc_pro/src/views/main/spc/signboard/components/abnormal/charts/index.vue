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
      { id: 1, name: 'OOC数量趋势图', data: '100000', color: '#4e73df', icon: 'sfont system-yonghu'},
      { id: 2, name: '工序OOC数量', data: '30', color: '#1cc88a', icon: 'sfont system-xiaoxi' },
      { id: 3, name: '工厂OOC数量', data: '20000', color: '#36b9cc', icon: 'sfont system-shuliang_mianxing' },
      { id: 4, name: '车间OOC数量', data: '20,000', color: '#f6c23e', icon: 'sfont system-jindutiaoshouyidaozhang' },
      { id: 5, name: '产线OOC数量', data: '100000', color: '#4e73df', icon: 'sfont system-yonghu' },
      { id: 6, name: '设备编号OOC数量', data: '30', color: '#1cc88a', icon: 'sfont system-xiaoxi' },
      { id: 7, name: '物料类型OOC数量', data: '20000', color: '#36b9cc', icon: 'sfont system-shuliang_mianxing' },
      { id: 8, name: '物料编码OOC数量', data: '20,000', color: '#f6c23e', icon: 'sfont system-jindutiaoshouyidaozhang' },
      { id: 9, name: '物料编码OOC柏拉图', data: '20,000', color: '#f6c23e', icon: 'sfont system-jindutiaoshouyidaozhang' },
      { id: 10, name: '检测数量OOC柏拉图', data: '20,000', color: '#f6c23e', icon: 'sfont system-jindutiaoshouyidaozhang' }
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