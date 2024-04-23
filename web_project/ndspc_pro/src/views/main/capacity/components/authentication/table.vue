<template>
  <div class="content-box">
    <el-table :data="tableData" style="width: 100%" ref="multipleTable" :header-cell-style="{background:'#f0f2f5'}">
        <el-table-column type="index" label="序号" width="50" fixed="left" align="center"  />
        <el-table-column prop="bianma" label="客户名称" :show-overflow-tooltip="true" sortable width="100" align="center" />
        <el-table-column prop="status" label="客户代码" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="bianNum" label="物料类型" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="物料编码" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="bianNum" label="CATL物料编码" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="status" label="加工类型" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="bianNum" label="公司名称" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="工厂" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="bianNum" label="车间" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="工序" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="bianNum" label="产线" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="设备类型" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="bianNum" label="设备代码" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="理论产能" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="综合收率" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="综合优率" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="bianNum" label="综合产能" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="认证状态" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="认证时间" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="更新时间" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="status" label="更新人" sortable :show-overflow-tooltip="true" width="100" align="center" />
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