<template>
  <div class="box">
    <div class="search-box">
      <el-form ref="form" :model="searchForm" label-width="80px" size="small">
        <el-form-item label="来料信息：">
          <el-form-item label="工厂" label-width="40px" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="factory"
              @handleChange='searchForm.factory=$event' />
          </el-form-item>
          <el-form-item label="车间" label-width="60px" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="workshop"
              @handleChange='searchForm.workshop=$event' />
          </el-form-item>
          <el-form-item label="产线" label-width="80px" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="line"
              @handleChange='searchForm.line=$event' />
          </el-form-item>
        </el-form-item>
        <el-form-item label="物料信息：" >
          <el-form-item label="物料类型" label-width="60px" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="materialType"
              @handleChange='searchForm.materialType=$event' />
          </el-form-item>
          <el-form-item label="物料编码" label-width="80px" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="materialCode"
              @handleChange='searchForm.materialCode=$event' />
          </el-form-item>
        </el-form-item>
        <el-form-item label="检测信息：" >
          <el-form-item label="特性类型" label-width="60px" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="propertyType"
              @handleChange='searchForm.propertyType=$event' />
          </el-form-item>
          <el-form-item label="检测项目" label-width="80px" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="testItem"
              @handleChange='searchForm.testItem=$event' />
          </el-form-item>
          <el-button type="success" size="small"  @click="getData" style="margin-left: 25px;margin-top: -10px">查询</el-button>
        </el-form-item>
        <div class="search-contral">
          <el-input placeholder="分析型控制图编码" v-model="searchForm.analyze_num"></el-input>
          <el-button class="system-btn" type="success"  @click="checkCarts" :disabled="!selectionItem || selectionItem.length !== 1">查看分析型控制图</el-button>
          <!-- <el-button type="danger" @click="handleDelete" :disabled="!selectionItem || selectionItem.length === 0">删除</el-button> -->
        </div>
      </el-form>
    </div>
    <div class="content-box">
      <el-table :data="tableData" style="width: 100%; font-size: 13px" size="default" ref="multipleTable" @selection-change="handleSelectionChange" :header-cell-style="{background:'#f0f2f5'}">
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
            <el-button @click.prevent="handleAssociation(scope.$index, tableData)" link type="primary" >关联</el-button>
            <el-button @click.prevent="handleDetail(scope.$index, tableData)" link type="primary" >明细</el-button>
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
    <!-- 控制图 -->
    <ComDialog ref="chartDialogRef" dialogTitle="查看分析控制图" :fullScreen="true" :hiddenFooter="true">
      <AnalysisChart />
    </ComDialog>
    <!-- 关联表格 -->
    <el-drawer v-model="drawer" :with-header="false" size="80%">
      <AssociationTable />
    </el-drawer>
    <!-- 明细 -->
    <ComDialog ref="detailDialogRef" dialogTitle="明细" :hiddenFooter="true" >
      <DetailForm />
    </ComDialog>
  </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import ComDialog from '@/components/comDialog/index.vue'
import Pagination from '@/components/pagination/index.vue'
import AnalysisChart from './components/analysisChart.vue'
import AssociationTable from './components/associationTable.vue'
import DetailForm from './components/detailForm.vue'
import MultipleSelect from '@/components/multipleSelect/index.vue'
import config from '@/utils/system/config'
import {SpcProductSelect} from '@/api/spc/analysis'
/* ------parmas--------- */
const searchForm = ref({
  pageSize: 2,
  pageNum: 1
})
const selectionItem = ref(null)
const chartDialogRef = ref(false)
const drawer = ref(false)
const detailDialogRef = ref(false)
const total = ref(10)
const options = ref({})
const inputSelect = config.spcSelect
const tableData = ref([
  {bianma: 'abc2133241', status: '分析中', bianNum: '1' },
  {bianma: 'abc2133242', status: '分析中', bianNum: '2' },
  {bianma: 'abc2133243', status: '分析中', bianNum: '3' },
  {bianma: 'abc2133244', status: '分析中', bianNum: '4' },
  {bianma: 'abc2133245', status: '分析中', bianNum: '5' }
])
onMounted(() => {
  getInputSelect()
})
/* ------function--------- */
// 检索查询
async function getInputSelect() {
  const res = await SpcProductSelect({input:inputSelect})
  const data = res.data.spcProductSelect
  if(data) {
    options.value = data
  }
}
function checkCarts() {
  chartDialogRef.value.visible = true
}
function handleAssociation(row) {
  drawer.value = true
}
function handleDetail(row) {
  detailDialogRef.value.visible = true
}
function changeTab(val) {
  searchForm.value.typeName = val
  searchForm.value.pageNum = 1
  getData()
}
function getData() {}
function handleSelectionChange(val) {
  selectionItem.value = val
}
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  background: #fff;
  padding-top: 7px;
  border-bottom: 1px solid #ddd;
  .el-form-item {
    margin-bottom: 5px!important;
  }
}
.search-box {
  padding-top: 10px;
  width: 100%;
  background: #f2f2f5;
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
  z-index: 999;
}
.search-contral{
  display: flex;
}
.el-button--success {
  border-color: var(--system-primary-color);
  background: var(--system-primary-color);
  color: #fff!important;
}
.el-button.is-disabled {
  background-color: var(--el-button-disabled-bg-color)!important;
  border-color: var(--el-button-disabled-border-color)!important
}
.table_tag {
  padding: 2px 8px;
  color: #fff;
  font-size: 12px;
}
</style>  