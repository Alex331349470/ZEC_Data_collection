<template>
  <div class="box">
    <div class="search-box">
      <el-form ref="form" :model="searchForm" label-width="120px" size="small">
        <el-row>
          <el-col :span="4">
            <el-form-item label="SPC分类：" >
              <el-select v-model="searchForm.fenlei" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="物料类型：" >
              <el-select v-model="searchForm.leixing" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分析型控制编码：" label-width="130px" clearable>
              <el-select v-model="searchForm.bianma" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="物料代码：" >
              <el-select v-model="searchForm.daima" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="项目：" label-width="80px" >
              <el-select v-model="searchForm.xiangmu" placeholder="请选择" style="width: 100px" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-button class="system-btn" type="success"  style="margin-left: 10px;" >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="search-contral">
          <el-button class="system-btn" type="success"  @click="addFile">新增控制图</el-button>
          <el-button class="system-btn" type="success"  @click="exportFile" >数据导入</el-button>
          <el-button class="system-btn" type="success"  @click="editFile" :disabled="!selectionItem || selectionItem.length !== 1">修改</el-button>
          <el-button class="system-btn" type="success"  @click="checkCarts" :disabled="!selectionItem || selectionItem.length !== 1">查看分析型控制图</el-button>
          <el-button type="danger" @click="handleDelete" :disabled="!selectionItem || selectionItem.length === 0">删除</el-button>
        </div>
      </el-form>
    </div>
    <div class="content-box">
      <el-table :data="tableData" style="width: 100%" size="default" ref="multipleTable" @selection-change="handleSelectionChange" :header-cell-style="{background:'#f0f2f5'}">
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
    <!-- 新增/修改 -->
    <ComDialog ref="dialogRef" :dialogTitle="dialogTitle" @confirmEmitBtn="confirmBtn" top="0">
      <div style="padding: 20px;height: calc(100vh - 134px);overflow: auto;">
        <el-form ref="workRef" :model="addForm" width="400px" :rules="rules" style="margin-top: 15px;">
          <el-divider content-position="center"><span style="color: red">*</span>基础信息</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="物料编码：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="检测项目：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="工厂：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="车间：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="工序：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="特性类型：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="控制图类型：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="分析控制图编码：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物料名称：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="检测项目名称：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="工厂名称：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="产线：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="物料类型：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="负责人：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="子组大小：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center">规格</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="上限值：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下限值：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>统计目标</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="Mean偏移目标线：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
              <el-form-item label="COV目标线：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Cpk目标线：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center">控制限</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="上控制限：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下控制限：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则①:1个点距离中心线大于_个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则②:连续_点在中心线的同一侧</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则③:连续_点全部递增或者递减</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则④:连续_点上下交错</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑤:_点(K)中存在K-1个点距离中心线(同侧)大于两个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑥:_点(K)中存在K-1个点距离中心线(同侧)大于一个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑦:连续 点距离中心线(任一侧)1个标准差以内</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑧:连续_点距离中心线(任一侧)大于1个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑨:连续_点偏移_个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="参数1：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="参数2：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑩:连续_点中存在_点以上距离中心线大于_个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="参数1：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="参数2：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="参数3：" prop="bianma" label-width="120px" required>
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center">判异准则⑪:超出内控线</el-divider>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="状态:" prop="bianma" label-width="120px">
                <el-checkbox v-model="addForm.checked" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="控制线上限：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="控制线下限：" prop="bianma" label-width="120px">
                <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </ComDialog>
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
    <!-- 数据导入 -->
    <ComDialog ref="exportDialogRef" dialogTitle="数据导入" @confirmEmitBtn="confirmExport" >
      <ExportFile ref="exportRef" @closeAllDialog="closeAllDialog"/>
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
import ExportFile from './components/exportFile.vue'
/* ------parmas--------- */
const searchForm = ref({
  pageSize: 2,
  pageNum: 1
})
const selectionItem = ref(null)
const addForm = ref({})
const dialogTitle = ref('新增分析型控制图')
const dialogRef = ref(false)
const chartDialogRef = ref(false)
const drawer = ref(false)
const detailDialogRef = ref(false)
const exportDialogRef = ref(false)
const exportRef = ref(null)
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
function handleDelete() {
  ElMessage({ message: '删除成功', type: 'success'})
}
function handleAssociation(row) {
  drawer.value = true
}
function handleDetail(row) {
  detailDialogRef.value.visible = true
}
function exportFile() {
  exportDialogRef.value.visible = true
}
function confirmExport() {
  exportRef.value.handleUpload()
}
function closeAllDialog() {
  exportDialogRef.value.visible = false
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
.el-button--success {
  border-color: var(--system-primary-color);
  background: var(--system-primary-color);
  color: #fff!important;
}
.el-button.is-disabled {
  background-color: var(--el-button-disabled-bg-color)!important;
  border-color: var(--el-button-disabled-border-color)!important
}
</style>  