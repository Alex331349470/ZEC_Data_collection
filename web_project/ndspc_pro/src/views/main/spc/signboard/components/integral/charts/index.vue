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
      { id: 1, name: 'SPC异常点整体看板', data: '100000', color: '#4e73df', icon: 'sfont system-yonghu', isExport: true }
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