<template>
  <div class="content-box">
    <el-table :data="tableData" style="width: 100%; font-size: 13px" ref="multipleTable" :header-cell-style="{background:'#f0f2f5'}">
        <el-table-column type="index" label="序号" width="50" fixed="left" align="center"  />
        <el-table-column prop="bianma" label="需求时间" :show-overflow-tooltip="true" sortable align="center" />
        <el-table-column prop="status" label="客户名称" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="bianNum" label="客户代码" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="status" label="物料类型" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="bianNum" label="CATL物料编码" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="status" label="物料编码" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="bianNum" label="需求产能" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="status" label="更新时间" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="status" label="更新人" sortable :show-overflow-tooltip="true" align="center" />
      </el-table>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const props = defineProps({
  tableData: {
    type: Array,
    default: []
  }
})
</script>

<style lang="scss" scoped>
.content-box {
  padding-bottom: 20px;
}
</style>