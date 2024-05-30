<template>
  <div class="box">
    <el-table :data="tableData" style="width: 100%; font-size: 13px;height: calc(100vh - 40px)" ref="multipleTable" @selection-change="handleSelectionChange" :header-cell-style="{background:'#f0f2f5'}">
      <el-table-column type="selection" width="40" align="center" fixed="left" />
      <el-table-column prop="bianma" label="控制图编码" :show-overflow-tooltip="true" sortable width="160" align="center" />
      <el-table-column prop="status" label="运行状态" sortable :show-overflow-tooltip="true" width="120" align="center" />
      <el-table-column prop="bianNum" label="最后接入数据时间" sortable :show-overflow-tooltip="true" width="160" align="center" />
      <el-table-column prop="status" label="工厂" sortable :show-overflow-tooltip="true" width="120" align="center" />
      <el-table-column prop="bianNum" label="车间" sortable :show-overflow-tooltip="true" width="120" align="center" />
      <el-table-column prop="status" label="产线" sortable :show-overflow-tooltip="true" width="120" align="center" />
      <el-table-column prop="bianNum" label="工序" sortable :show-overflow-tooltip="true" width="120" align="center" />
      <el-table-column prop="status" label="设备" sortable :show-overflow-tooltip="true" width="120" align="center" />
      <el-table-column prop="bianNum" label="物料类型" sortable :show-overflow-tooltip="true" width="100" align="center" />
      <el-table-column prop="status" label="物料编码" sortable :show-overflow-tooltip="true" width="100" align="center" />
      <el-table-column prop="bianNum" label="特性类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
      <el-table-column prop="status" label="检测项目" sortable :show-overflow-tooltip="true" width="140" align="center" />
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template #default="scope">
          <el-button @click.prevent="handleAssociation(scope.$index, tableData)" type="primary" >查看控制图</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
const props = defineProps({
  tableData: {
    type: Array,
    default: []
  }
})
</script>
<style scoped>

</style>