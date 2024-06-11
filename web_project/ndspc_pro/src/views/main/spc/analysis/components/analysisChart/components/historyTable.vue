<template>
  <div class="box">
    <div class="content-box">
      <el-table :data="tableData" style="width: 100%; font-size: 13px" ref="multipleTable" :header-cell-style="{background:'#f0f2f5'}">
        <el-table-column prop="analyze_num" label="分析控制图编码" :show-overflow-tooltip="true" sortable width="160" align="center" />
        <el-table-column prop="status" label="分析状态" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="change_time" label="变更次数" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="material_code" label="物料编码" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="analyze_column" label="检测项目" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="factory" label="工厂名称" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="workshop" label="车间" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="line" label="产线" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="material_type" label="物料类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="control_type" label="控制图类型" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="group_type" label="子组件大小" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="property_type" label="特性类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
      </el-table>
    </div>
    <!-- <div class="pagination">
      <Pagination @page_num="searchForm.pageNum"
        @page_size="searchForm.pageSize"
        @update:getData="getData"
        :total="total"
      />
    </div> -->
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Pagination from '@/components/pagination/index.vue'
import {SpcHistory} from '@/api/spc/analysis'
defineExpose({ getData })
const tableData = ref([])
async function getData(parmas) {
  const res = await SpcHistory({input: parmas})
  const data = res.data?.spcProductSelectHisValues || []
  data.map(item => {
    item.status = item.status === 0 ? '未接入' : item.status === 1? '分析中' : '分析完成'
  })
  tableData.value = data
}
</script>

<style lang="scss" scoped>
.content-box {
  padding-bottom: 20px;
}
</style>  