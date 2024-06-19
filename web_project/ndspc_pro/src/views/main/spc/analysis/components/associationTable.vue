<template>
  <div class="box">
    <div class="content-box">
      <el-table :data="tableData" v-loading="loading" style="width: 100%; font-size: 13px; font-size: 13px" ref="multipleTable" @selection-change="handleSelectionChange" :header-cell-style="{background:'#f0f2f5'}">
        <el-table-column type="selection" width="40" align="center" fixed="left" />
        <el-table-column prop="status" label="分析状态" sortable :show-overflow-tooltip="true" width="120" align="center">
          <template #default="scope">
            <span  class="table_tag">{{getStatusLabel(scope.row.status).label}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="change_time" label="分析次数" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="status" label="物料编码" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="serial_num" label="分析参数序号" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="product_value" label="均值/单值" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="sigma_in" label="组内标准差" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="r_value" label="极差" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="control_type" label="控制图类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="group_type" label="子组大小" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template #default="scope">
            <el-button @click.prevent="handleDetail(scope.$index, tableData)" type="success" >明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <Pagination :page_num="searchForm.pageNum"
        :page_size="searchForm.pageSize"
        @update:pageChange="pageChange"
        :total="total"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive} from 'vue'
import {SpcProductSelectConnectValue} from '@/api/spc/analysis'
import Pagination from '@/components/pagination/index.vue'
import config from '@/utils/system/config'
defineExpose({ getInfo })
const total = ref(0)
const tableData = ref([])
const selectItem = reactive([])
const StatusOptions = config.status // 状态标签
const loading = ref(true)
const searchForm = reactive({
  pageSize: 10,
  pageNum: 1,
  analyzeNum: ''
})
function getInfo (row) {
  searchForm.analyzeNum = row.analyze_num
  getData()
}
async function getData() {
  loading.value = true
  const res = await SpcProductSelectConnectValue({input: searchForm})
  const data = res.data?.spcProductSelectConnectValue
  total.value = data.total
  tableData.value = data.list
  loading.value = false
}
function handleSelectionChange(val) {
  selectItem.value = val
}
function pageChange(parmas ) {
  searchForm.pageNum = parmas.page_num
  searchForm.pageSize = parmas.page_size
  getData()
}
// 获取状态标签
function getStatusLabel(status) {
  const mapping = StatusOptions.find(item => item.value === status)
  return mapping ? {label: mapping.label, color: mapping.color} : {label: '未接入', color: '#b2091e'};
}
</script>
<style scoped>
.pagination {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 25px;
  border-top: 1px solid #ddd;
}
</style>