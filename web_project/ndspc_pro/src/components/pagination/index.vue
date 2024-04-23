<template>
  <div class="">
    <el-pagination
      @current-page="currentPage"
      @page-size="pageSize"
      :page-sizes="pageSizes"
      mini
      background
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup>
import { computed } from 'vue'
const emit = defineEmits([
  'update:page_num',
  'update:page_size',
  'update:getData',
])
const props = defineProps({
  //页码
  page_num: {
    type: Number,
    default: 1,
  },
  //每页条数
  page_size: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 50],
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
})
const currentPage = computed({
  get: () => {
    return props.page_num
  },
  set: (val) => {
    emit('update:page_num', val)
  },
})
const pageSize = computed({
  get: () => {
    return props.page_size
  },
  set: (val) => {
    emit('update:page_size', val)
  },
})
//每页条数
const handleSizeChange = (val) => {
  emit('update:getData', { page_num: currentPage.value, page_size: val })
}
//页码
const handleCurrentChange = (val) => {
  emit('update:getData', { page_num: val, page_size: pageSize.value })
}
</script>
<style lang="scss" scoped>
:deep(.el-pagination.is-background .el-pager li), :deep(.el-pagination.is-background .btn-next), :deep(.el-pagination.is-background .btn-prev) {
  background-color: #fff;
}
:deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: var(--system-primary-color)!important;
}
</style>