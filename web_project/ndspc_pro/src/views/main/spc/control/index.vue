<template>
  <div class="box">
    <div class="search-box">
      <el-form ref="form" :model="searchForm" label-width="100px" size="mini">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="SPC分类：" size="mini">
              <el-select v-model="searchForm.fenlei" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="物料类型：" size="mini">
              <el-select v-model="searchForm.leixing" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="分析型控制编码：" label-width="130px" size="mini">
              <el-select v-model="searchForm.bianma" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="物料代码：" size="mini">
              <el-select v-model="searchForm.daima" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目：" label-width="80px" size="mini">
              <el-select v-model="searchForm.xiangmu" placeholder="请选择" size="small" style="width: 100px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-button class="system-btn" type="success" size="small" style="margin-left: 10px;">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="search-contral">
          <el-button class="system-btn" type="success" size="small" @click="checkCarts">查看分析型控制图</el-button>
          <el-button  class="system-btn" type="success" size="small" @click="addFile">新增控制图</el-button>
          <el-button class="system-btn" type="success" size="small" @click="editFile">修改</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </div>
      </el-form>
    </div>
    <div class="content-box">
      <el-table :data="tableData" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" :header-cell-style="{background:'#f0f2f5'}">
        <el-table-column type="selection" width="40" align="center" fixed="left" />
        <el-table-column prop="bianma" label="分析控制图编码" :show-overflow-tooltip="true" sortable width="160" align="center" />
        <el-table-column prop="status" label="分析状态" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="bianNum" label="变更次数" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="status" label="物料编码" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="bianNum" label="物料名称" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="status" label="检测项目" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="bianNum" label="工厂编码" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="status" label="工厂名称" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="bianNum" label="车间" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="status" label="产线" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="bianNum" label="物料类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="status" label="控制图类型" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="bianNum" label="子组件大小" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="status" label="特性类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template #default="scope">
            <el-button @click.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">关联</el-button>
            <el-button @click.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <Pagination v-model:page_num="searchForm.pageNum"
        v-model:page_size="searchForm.pageSize"
        @update:getData="getData"
        :pageSizes="[10, 20, 30, 50]"
        :total="total"
      />
    </div>
    <ComDialog ref="dialogRef" :dialogTitle="dialogTitle" @confirmEmitBtn="confirmBtn" >
      <el-form ref="workRef" :model="addForm" width="400px" :rules="rules" style="margin-top: 15px;">
        <el-form-item label="开始时间" prop="data1" label-width="100px">
          <el-input v-model="addForm.data1" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="data2" label-width="100px">
          <el-input v-model="addForm.data2" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
      </el-form>
    </ComDialog>
    <ComDialog ref="chartDialogRef" dialogTitle="查看分析控制图" :fullScreen="true" :hiddenFooter="true">
      <AnalysisChart />
    </ComDialog>
  </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import ComDialog from '@/components/comDialog/index.vue'
import Pagination from '@/components/pagination/index.vue'
import AnalysisChart from './components/analysisChart.vue'

import { ElMessage } from 'element-plus'
/* ------parmas--------- */
const searchForm = ref({
  pageSize: 2,
  pageNum: 1
})
const addForm = ref({})
const dialogTitle = ref('新增分析型控制图')
const dialogRef = ref(false)
const chartDialogRef = ref(false)
const total = ref(10)
const options = ref([{value: '1', label: '全部'}, {value: '2', label: '未分析'}, {value: '3', label: '已分析'}])
const tableData = ref([
  {bianma: 'abc2133241', status: '分析中', bianNum: '1' },
  {bianma: 'abc2133242', status: '分析中', bianNum: '2' },
  {bianma: 'abc2133243', status: '分析中', bianNum: '3' },
  {bianma: 'abc2133244', status: '分析中', bianNum: '4' },
  {bianma: 'abc2133245', status: '分析中', bianNum: '5' }
])
const workRef = ref(null)
const rules = ref({
  data1: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
  data2: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }],
})

/* ------function--------- */
function onChangePage(index) {
  searchForm.pagesNum.value = index
}
function addFile() {
  dialogRef.value.visible = true
}
function editFile() {
  addForm.value = {data1: 'abc2133241', data2: '分析中' }
  dialogRef.value.visible = true
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
function checkCarts() {
  chartDialogRef.value.visible = true
}
function getData() {}
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  background: #fff;
  padding-top: 7px;
  border-bottom: 1px solid #ddd;
  .el-form-item {
    margin-bottom: 10px!important;
  }
}
.search-contral {
  padding: 10px;
  border-top: 1px solid #ddd;
  .el-button {
    margin-left: 10px;
  }
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
}
.search-contral{
  display: flex;
}
.system-btn {
  border-color: var(--system-primary-color)!important;;
  background: var(--system-primary-color)!important;
  color: #fff!important;
}
</style>  