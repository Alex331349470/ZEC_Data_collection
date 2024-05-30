<template>
  <div class="box">
    <div class="search-box">
      <div class="search-contral">
        <div class="tabs-contral flex">
          <div :class="searchForm.typeName == '中间品' ? 'active_tab tab_btn':'tab_btn'">
            <el-button class="btn_bule" type="primary" size="default" @click="changeTab('中间品')">中间品</el-button>
          </div>
          <div :class="searchForm.typeName == '成品' ? 'active_tab tab_btn':'tab_btn'">
            <el-button class="btn_orange" type="warning" size="default" @click="changeTab('成品')">成品</el-button>
          </div>
        </div>
        <el-button class="system-btn" type="success"  @click="checkCarts" :disabled="!selectionItem || selectionItem.length !== 1">查看分析型控制图</el-button>
      </div>
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
        @update:getData="getData"
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
/* ------parmas--------- */
const searchForm = ref({
  pageSize: 2,
  pageNum: 1,
  typeName: '成品'
})
const selectionItem = ref(null)
const chartDialogRef = ref(false)
const drawer = ref(false)
const detailDialogRef = ref(false)
const total = ref(10)
const tableData = ref([
  {bianma: 'abc2133241', status: '分析中', bianNum: '1' },
  {bianma: 'abc2133242', status: '分析中', bianNum: '2' },
  {bianma: 'abc2133243', status: '分析中', bianNum: '3' },
  {bianma: 'abc2133244', status: '分析中', bianNum: '4' },
  {bianma: 'abc2133245', status: '分析中', bianNum: '5' }
])

/* ------function--------- */
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
    margin-bottom: 10px!important;
  }
}
.search-contral {
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
  justify-content: space-between;
  align-items: center;
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
.tab_btn {
  width: 120px;
  padding: 8px 0;
  margin: 0 10px;
  .el-button {
    width: 120px;
  }
}
.btn_bule {
  background: #6f93c6;
}
.active_tab {
  border-top: 2px solid #4dc86f;
}
.btn_orange {
  background: #c2a97e;
}
</style>  