<template>
  <div class="box">
    <Search />
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
      <div class="pagination">
        <Pagination v-model:page_num="searchForm.pageNum"
          v-model:page_size="searchForm.pageSize"
          @update:getData="getData"
          :pageSizes="[10, 20, 30, 50]"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent,ref } from 'vue'
import Search from './components/design/search.vue'
import Pagination from '@/components/pagination/index.vue'

const searchForm = ref({
  pageSize: 2,
  pageNum: 1
})
const total = ref(10)
const tableData = ref([
  {bianma: 'abc2133241', status: '分析中', bianNum: '1' },
  {bianma: 'abc2133242', status: '分析中', bianNum: '2' },
  {bianma: 'abc2133243', status: '分析中', bianNum: '3' },
  {bianma: 'abc2133244', status: '分析中', bianNum: '4' },
  {bianma: 'abc2133245', status: '分析中', bianNum: '5' }
])
function handleSelectionChange(val) {}
</script>

<style lang="scss" scoped>
.box {
  padding-top: 8px;
  background: #2c2d31;
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