<template>
  <div class="box">
    <div class="content-box">
      <el-table :data="tableData" v-loading="loading"  style="width: 100%; font-size: 13px" ref="multipleTable" :height="500" :header-cell-style="{background:'#f0f2f5'}">
        <el-table-column prop="date_time" label="变更时间" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="review" label="变更人" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="change_time" label="变更次数" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="backup" label="变更原因" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="material_code" label="物料编码" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="analyze_column" label="检测项目" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="factory" label="工厂名称" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="workshop" label="车间" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="line" label="产线" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="material_type" label="物料类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="control_type" label="控制图类型" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="group_type" label="子组件大小" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="property_type" label="特性类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="lsl" label="规格线下限" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="usl" label="规格线上限" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="lcl" label="控制线下限" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="ucl" label="控制线上限" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="cov_purpose" label="cov目标值" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="cpk" label="cpk值" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="mean" label="mean偏移量" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template #default="scope">
            <el-button @click.prevent="checkCarts(scope.row)" link type="primary" >查看分析型控制图</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ComDialog ref="chartDialogRef" dialogTitle="查看分析控制图" :fullScreen="true" :hiddenFooter="true">
      <AnalysisChart ref="chartRef" @closeAllDialog="closeAllDialog"/>
    </ComDialog>
    <!-- <div class="pagination">
      <Pagination @page_num="searchForm.pageNum"
        @page_size="searchForm.pageSize"
        @update:pageChange="pageChange"
        :total="total"
      />
    </div> -->
  </div>
</template>
<script setup>
import { ref, nextTick} from 'vue'
import Pagination from '@/components/pagination/index.vue'
import ComDialog from '@/components/comDialog/index.vue'
import AnalysisChart from '../../analysisChart.vue'
import {SpcHistory} from '@/api/spc/analysis'
import config from '@/utils/system/config'
defineExpose({ getData })
const tableData = ref([])
const StatusOptions = config.status // 状态标签
const selectionItem = ref(null)
const chartDialogRef = ref(false)
const chartRef = ref(false)
const loading = ref(true)
const defaultForm = {
  materialCode: '',
  materialType: '',
  factory: '',
  line: '',
  review: '',
  propertyType: '',
  workshop: '',
  testItem: '',
  controlType: '',
  groupType: '',
  lsl: '',
  usl: '',
  lcl: '',
  ucl: '',
  covPurpose: '',
  cpk: '',
  mean:'',
  rule1: '',
  rule1Status: false,
  rule2: '',
  rule2Status: false,
  rule3: '',
  rule3Status: false,
  rule4: '',
  rule4Status: false,
  rule5: '',
  rule5Status: false,
  rule6: '',
  rule6Status: false,
  rule7: '',
  rule7Status: false,
  rule8: '',
  rule8Status: false,
  rule9_a1: '',
  rule9_a2: '',
  rule9Status: false,
  rule10_a1: '',
  rule10_a2: '',
  rule10_a3: '',
  rule10Status: false,
  rule11_a1: '',
  rule11_a2: '',
  rule11Status: false,
  rule12_a1: '',
  rule12_a2: '',
  rule12Status: false
}
async function getData(parmas) {
  const res = await SpcHistory({input: parmas})
  const data = res.data?.spcProductSelectHisValues || []
  tableData.value = data
  loading.value = false
}
// 获取状态标签
function getStatusLabel(status) {
  const mapping = StatusOptions.find(item => item.value === status)
  return mapping ? {label: mapping.label, color: mapping.color} : {label: '未接入', color: '#b2091e'};
}
async function checkCarts(row) {
  chartDialogRef.value.visible = true
  await nextTick()
  chartRef.value.getData(reduceData(row))
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
  for (const key of addFormKeys) {
    newForm[key] = option[key]
  }
  newForm.analyzeCode = option.analyze_num
  return newForm
}
function closeAllDialog() {
  chartDialogRef.value.visible = false
}
</script>

<style lang="scss" scoped>
.content-box {
  padding-bottom: 20px;
}
.table_tag {
  padding: 2px 8px;
  color: #fff;
  font-size: 12px;
}
</style>  