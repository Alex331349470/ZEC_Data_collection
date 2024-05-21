<template>
  <div class="card-box">
    <div class="card-list">
      <Row v-for="row in list" :key="row.id" :row="row" v-loading="loading" />
    </div>
    <div class="pagination">
      <Pagination :page_num="searchForm.pageNum"
        :page_size="searchForm.pageSize"
        @update:getData="handleSearch"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup>
import Row from './row.vue'
import Pagination from '@/components/pagination/index.vue'
import {ref, reactive} from 'vue'
defineExpose({ handleSearch })
const searchForm = ref({
  pageSize: 2,
  pageNum: 1
})
const total = ref(10)
const list = reactive([{ id: 1, name: 'SPC异常点整体看板'}])
const loading = ref(true)
function handleSearch(parmas) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
  console.log(parmas)
}
</script>

<style lang="scss" scoped>
  .card-box {
    width: 100%;
    background: #2c2d31;
    position: relative;
  }
  .card-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 60px;
  }
  .pagination {
    position: absolute;
    bottom: 0;
    width: calc(100% - 30px);
    background: #2c2d31;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 25px;
    // border-top: 1px solid #ddd;
  }
</style>