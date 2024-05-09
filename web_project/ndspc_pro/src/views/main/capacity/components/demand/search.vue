<template>
  <div class="search-box">
    <el-form :model="searchForm" label-width="100px" :class="isExpand ? 'height' : 'maxHeight'" size="default">
      <el-form-item label="投产时间：" >
        <el-radio-group v-model="searchForm.timeArea" @change="radioChange" style="margin-top: -3px;">
          <el-radio :label="1">全部时间</el-radio>
          <el-radio :label="2">本年度</el-radio>
          <el-radio :label="3">本季度</el-radio>
          <el-radio :label="4">本月度</el-radio>
          <el-radio :label="6">自定义</el-radio>
        </el-radio-group>
        <el-form-item label="开始时间：" >
          <el-date-picker v-model="searchForm.startTime" type="date"  placeholder="选择日期" style="width: 150px" />
        </el-form-item>
        <el-form-item label="结束时间：" >
          <el-date-picker v-model="searchForm.endTime" type="date"  placeholder="选择日期" style="width: 150px" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="客户信息：" >
        <el-form-item label="客户名称" label-width="80px" >
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="客户代码" label-width="80px" >
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="物料信息：" >
        <el-form-item label="物料类型" label-width="80px" >
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容"  ></el-input>
        </el-form-item>
        <el-form-item label="物料编码" label-width="80px" >
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容"  ></el-input>
        </el-form-item>
        <el-form-item label="CATL物料编码" label-width="130px" >
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容"  ></el-input>
        </el-form-item>
        <el-button type="success" size="small" style="margin-left: 25px" @click="handleSearch">查询</el-button>
        <el-button type="success" size="small" @click="handleReset">重置</el-button>
      </el-form-item>
      <div class="control-panel">
        <el-button type="success" size="small" style="margin-left: 25px" @click="handleAdd">数据录入</el-button>
        <el-button type="success" size="small" @click="handleImport">数据导入</el-button>
        <el-button type="warning" size="small" :disabled="isdisabed" @click="handleEdit">修改数据</el-button>
        <el-button type="danger" size="small" :disabled="isdisabed" @click="handleDelete">删除数据</el-button>
        <el-button type="success" size="small" @click="handleDownload">导入模板下载</el-button>
          <el-button type="success" size="small" @click="handleExport">导出当前数据</el-button>
      </div> 
    </el-form>
    <div class="search-box-bottom">
      <el-icon color="#fff" size="22" v-show="!isExpand" @click="expandSearch(true)"><ArrowDown /></el-icon>
      <el-icon color="#fff" size="22" v-show="isExpand" @click="expandSearch(false)"><ArrowUp /></el-icon>
    </div>
  </div>
</template>

<script setup>
  import { defineComponent, onMounted, ref,watch } from 'vue'
  import { ArrowDown, ArrowUp } from '@element-plus/icons'
  const emit = defineEmits([
  'handleAdd',
  'handleEdit',
  'handleDelete',
  'handleSearch',
  'handleImport',
  'handleExport',
  'handleDownload'
])
  const props = defineProps({
  selectionItem: {
    type: Array,
    default: []
  }
  })
  // parmas
  const searchForm = ref({
    timeArea: 2,
    dateArea: ['年', '月'],
    kaifaArea: 1,
    startTime: '',
    endTime: '',
    gongchang: '',
    jisuanArea: ''
  })
  const isdisabed = ref(false)
  const isExpand = ref(true)
  const DateOptions = ref(['年', '季', '月', '周', '日'])
  // function
  function expandSearch(val) {
    isExpand.value = val
  }
  function radioChange() {}
  function handleCheckedDateArea() {}
  // 检查表格选中变化
  watch(() => props.selectionItem, (newVal) => {
    isdisabed.value = newVal.length === 0
  }, { deep: true })
  // 数据录入
  function handleAdd() {
    emit('handleAdd')
  }
  // 修改数据
  function handleEdit() {
    emit('handleEdit')
  }
  // 删除数据
  function handleDelete() {
    emit('handleDelete')
  }
  // 查询
  function handleSearch() {
    emit('handleSearch')
  }
  // 重置
  function handleReset() {
    // 重置
  }
  // 数据导入
  function handleImport() {
    emit('handleImport')
  }
  // 导出当前数据
  function handleExport() {
    emit('handleExport')
  }
  // 导入模板下载
  function handleDownload() {
    emit('handleDownload')
  }
</script>

<style lang="scss" scoped>
.search-box {
  padding-top: 10px;
  width: 100%;
  background: #2c2d31;
}
.control-panel {
  text-align: left;
  margin: 10px;
}
.height {
  min-height: 80px;
}
.maxHeight {
  height: 0;
  overflow: hidden;
}
.search-box-bottom {
  background: #2d3340;
  width: 100%;
  height: 25px;
}
:deep(.el-form-item__label), :deep(.el-form-item__content), :deep(.el-checkbox__label),:deep(.el-radio__label){
  color: #fff;
}
:deep(.el-radio__input.is-checked+.el-radio__label), :deep(.el-checkbox__input.is-checked+.el-checkbox__label){
  color: var(--system-primary-color)!important;
  
}
:deep(.el-radio__input.is-checked .el-radio__inner), :deep(.el-checkbox__input.is-checked .el-checkbox__inner), :deep(.el-button--success){
  border-color: var(--system-primary-color)!important;;
  background: var(--system-primary-color)!important;
}
</style>