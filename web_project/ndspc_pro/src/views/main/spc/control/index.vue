<template>
  <div class="box">
    <div class="search-box">
      <div class="search-contral">
        <el-input placeholder="关键字搜索" v-model="searchForm.query" @keyup.enter="getData">
          <template #append>
            <el-button :icon="Search" @click="getData"/>
          </template>
        </el-input>
        <el-button class="system-btn" type="success" style="margin-left: 10px;"  @click="checkCarts" :disabled="!selectionItem || selectionItem.length !== 1">查看控制型控制图</el-button>
      </div>
    </div>
    <div class="content-box">
      <el-table :data="tableData" v-loading="loading" style="width: 100%; font-size: 13px" size="default" ref="multipleTable" @selection-change="handleSelectionChange" :header-cell-style="{background:'#f0f2f5'}">
        <el-table-column type="selection" width="40" align="center" fixed="left" />
        <el-table-column prop="connect_status" label="分析状态" sortable :show-overflow-tooltip="true" width="120" align="center">
          <template #default="scope">
            <span :style="{background: getStatusLabel(scope.row.connect_status).color}" class="table_tag">{{getStatusLabel(scope.row.connect_status).label}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="material_type" label="物料类型" :show-overflow-tooltip="true" sortable width="160" align="center" />
        <el-table-column prop="material_code" label="物料编码" :show-overflow-tooltip="true" sortable width="160" align="center" />
        <el-table-column prop="analyze_column" label="检测项" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="factory" label="工厂" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="workshop" label="车间" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="line" label="产线" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="property_type" label="特性类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="analyze_num" label="控制图编码" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="control_type" label="控制图类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="group_type" label="子组件大小" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template #default="scope">
            <el-button @click.prevent="handleAssociation(scope.row)" link type="primary" >关联</el-button>
            <el-button @click.prevent="handleDetail(scope.row)" link type="primary" >明细</el-button>
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
    <ComDialog ref="chartDialogRef" dialogTitle="查看控制型控制图" :fullScreen="true" :hiddenFooter="true">
      <AnalysisChart ref="chartRef" @closeAllDialog="closeAllDialog"/>
    </ComDialog>
    <!-- 关联表格 -->
    <el-drawer v-model="drawer" :with-header="false" size="80%">
      <AssociationTable ref="associatRef"/>
    </el-drawer>
    <!-- 明细 -->
    <ComDialog ref="detailDialogRef" dialogTitle="明细" :hiddenFooter="true">
      <DetailForm ref="detailRef"/>
    </ComDialog>
  </div>
</template>
<script setup>
import { defineComponent, onMounted, nextTick, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import ComDialog from '@/components/comDialog/index.vue'
import Pagination from '@/components/pagination/index.vue'
import AnalysisChart from './components/analysisChart.vue'
import AssociationTable from './components/associationTable.vue'
import DetailForm from './components/detailForm.vue'
import MultipleSelect from '@/components/multipleSelect/index.vue'
import {getSpcDataList} from '@/api/spc/control'
import config from '@/utils/system/config'
import { Search } from '@element-plus/icons'
/* ------parmas--------- */
const searchForm = reactive({
  pageSize: 10,
  pageNum: 1,
  query: ''
})
const selectionItem = ref(null)
const chartDialogRef = ref(false)
const chartRef = ref(null)
const drawer = ref(false)
const detailDialogRef = ref(false)
const detailRef = ref(null)
const total = ref(0)
const options = ref({})
const tableData = ref()
const loading = ref(true)
const associatRef = ref(null)
const StatusOptions = config.connect_status // 状态标签
const defaultForm = config.control_input
onMounted(() => {
  getData()
})
function checkCarts() {
  chartDialogRef.value.visible = true
  nextTick(() => {
    chartRef.value.getData(reduceData(selectionItem.value[0]))
  })
}
function handleAssociation(row) {
  drawer.value = true
  nextTick(() => {
    associatRef.value.getInfo(row)
  })
}
function handleDetail(row) {
  detailDialogRef.value.visible = true
  nextTick(() => {
    detailRef.value.getInfo(row)
  })
}
function changeTab(val) {
  searchForm.typeName = val
  searchForm.pageNum = 1
  getData()
}
async function getData() {
  loading.value = true
  let res = await getSpcDataList({input: searchForm})
  const data = res.data?.spcProductControlSelect || {}
  tableData.value = data.list || []
  total.value = data.total || 0
  loading.value = false
}
function handleSelectionChange(val) {
  selectionItem.value = val
}
function pageChange(parmas) {
  searchForm.pageNum = parmas.page_num
  searchForm.pageSize = parmas.page_size
  getData()
}
// 获取状态标签
function getStatusLabel(status) {
  const mapping = StatusOptions.find(item => item.value === status)
  return mapping ? {label: mapping.label, color: mapping.color} : {label: '未接入', color: '#b2091e'};
}
// table数据处理
function reduceData(option) {
  const newForm = {...defaultForm}
  const addFormKeys = Object.keys(newForm)
  option.materialCode = option.material_code
  option.materialType = option.material_type
  option.propertyType = option.property_type
  option.testItem = option.analyze_column
  option.groupType = option.group_type
  option.controlType = option.control_type
  option.covPurpose = option.cov_purpose
  option.rule1Status = option.rule1_status
  option.rule2Status = option.rule2_status
  option.rule3Status = option.rule3_status
  option.rule4Status = option.rule4_status
  option.rule5Status = option.rule5_status
  option.rule6Status = option.rule6_status
  option.rule7Status = option.rule7_status
  option.rule8Status = option.rule8_status
  option.rule9Status = option.rule9_status
  option.rule10Status = option.rule10_status
  option.rule11Status = option.rule11_status
  option.rule12Status = option.rule12_status
  option.analyzeNum = option.analyze_num
  option.changeTime = option.change_time
  option.poorAmount = option.poor_amount
  option.sourceType = option.source_type
  for (const key of addFormKeys) {
    newForm[key] = option[key]
  }
  return newForm
}
function closeAllDialog() {
  importDialogRef.value.visible = false
  chartDialogRef.value.visible = false
  getData()
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