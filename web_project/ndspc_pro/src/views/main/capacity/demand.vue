<template>
  <div class="box">
    <Search :selectionItem="selectionItem" @handleAdd="handleAdd" @handleEdit="handleEdit" 
      @handleDelete="handleDelete" @handleSearch="getData" @handleImport="handleImport" 
      @handleExport="handleExport" @handleDownload="handleDownload" />
    <div class="content-box">
      <el-table :data="tableData" style="width: 100%" ref="multipleTable" show-summary @selection-change="handleSelectionChange" :header-cell-style="{background:'#f0f2f5'}">
        <el-table-column type="selection" width="40" align="center" fixed="left" />
        <el-table-column prop="bianma" label="需求时间" :show-overflow-tooltip="true" sortable align="center" />
        <el-table-column prop="status" label="客户名称" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="bianNum" label="客户代码" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="status" label="物料类型" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="bianNum" label="CATL物料编码" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="status" label="物料编码" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="bianNum" label="需求产能" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="bianNum" label="最后更新时间" sortable :show-overflow-tooltip="true" align="center" />
        <el-table-column label="变更履历" width="120" align="center" fixed="right">
          <template #default="scope">
            <el-button @click.prevent="checkDetail(scope.$index, tableData)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <Pagination @page_num="searchForm.pageNum"
          @page_size="searchForm.pageSize"
          @update:getData="getData"
          :pageSizes="[10, 20, 30, 50]"
          :total="total"
        />
      </div>
    </div>
    <ComDialog ref="dialogRef" :dialogTitle="dialogTitle" @confirmEmitBtn="confirmBtn" >
      <el-form ref="workRef" :model="addForm" width="400px" :rules="rules" style="margin-top: 15px;">
        <el-form-item label="开始时间" prop="bianma" label-width="100px">
          <el-input v-model="addForm.bianma" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="status" label-width="100px">
          <el-input v-model="addForm.status" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
      </el-form>
    </ComDialog>
    <ComDialog ref="dialogRef2" dialogTitle="变更履历" :hiddenFooter="true" popupWidth="80%">
      <HistoryTable :tableData="historyList"/>
    </ComDialog>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Search from './components/demand/search.vue'
import Pagination from '@/components/pagination/index.vue'
import ComDialog from '@/components/comDialog/index.vue'
import HistoryTable from './components/demand/table.vue'
import { disConnect } from 'echarts'

const searchForm = ref({
  pageSize: 2,
  pageNum: 1
})
const total = ref(10)
const addForm = ref({})
const dialogTitle = ref('数据录入')
const selectionItem = ref(null)
const workRef = ref(null)
const dialogRef = ref(false)
const dialogRef2 = ref(false)
const historyList = ref([
  {bianma: 'abc2133241', status: '分析中', bianNum: '1' },
  {bianma: 'abc2133242', status: '分析中', bianNum: '2' },
  {bianma: 'abc2133243', status: '分析中', bianNum: '3' },
  {bianma: 'abc2133244', status: '分析中', bianNum: '4' },
  {bianma: 'abc2133245', status: '分析中', bianNum: '5' }
])
const tableData = ref([
  {bianma: 'abc2133241', status: '分析中', bianNum: '1' },
  {bianma: 'abc2133242', status: '分析中', bianNum: '2' },
  {bianma: 'abc2133243', status: '分析中', bianNum: '3' },
  {bianma: 'abc2133244', status: '分析中', bianNum: '4' },
  {bianma: 'abc2133245', status: '分析中', bianNum: '5' }
])
const rules = ref({
  bianma: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }],
})
function handleSelectionChange(val) {
  selectionItem.value = val
}
// 数据录入
function handleAdd() {
  addForm.value = {}
  dialogTitle.value = '数据录入'
  dialogRef.value.visible = true
}
// 数据修改
function handleEdit() {
  addForm.value = selectionItem.value[0]
  dialogTitle.value = '修改'
  dialogRef.value.visible = true
}
// 数据删除
function handleDelete() {
  selectionItem.value.forEach(item => {
    tableData.value.forEach((item2, index) => {
      if (item.bianma === item2.bianma) {
        tableData.value.splice(index, 1)
      }
    })
  })
}
// 数据导入
function handleImport() {
  // 导入操作
}
// 导出当前数据
function handleExport() {
  // 导出操作
}
// 下载模板
function handleDownload() {
  //下载操作
}
// 查看变更履历
function checkDetail(index, rows) {
  dialogRef2.value.visible = true
}
// 数据更新
function getData(val) {
  console.log(searchForm.value)
}
function confirmBtn() {
  workRef.value.validate(async (valid) => {
    if (valid) {
      dialogRef.value.addLoading = true
      try {
        ElMessage({
          message: addForm.value.id ? '编辑成功' : '新增成功',
          type: 'success',
        })
      } finally {
        dialogRef.value.visible = false
        dialogRef.value.addLoading = false
      }
    }
  })
}
</script>
  
<style lang="scss" scoped>
.box {
  padding-top: 8px;
  background: #fff;
  height: 100%;
}
.pagination {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 25px;
  border-top: 1px solid #ddd;
  z-index: 2
}
</style>