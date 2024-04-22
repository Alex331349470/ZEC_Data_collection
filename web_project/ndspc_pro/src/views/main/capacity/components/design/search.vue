<template>
  <div class="search-box">
    <el-form ref="form" :model="searchForm" label-width="100px" :class="isExpand ? 'height' : 'maxHeight'" size="mini">
      <el-form-item label="投产时间：" size="mini">
        <el-radio-group v-model="searchForm.timeArea" @change="radioChange" style="margin-top: -3px;">
          <el-radio :label="1">全部时间</el-radio>
          <el-radio :label="2">本年度</el-radio>
          <el-radio :label="3">本季度</el-radio>
          <el-radio :label="4">本月度</el-radio>
          <el-radio :label="5">当天</el-radio>
          <el-radio :label="6">自定义</el-radio>
        </el-radio-group>
        <el-form-item label="开始时间：" size="mini">
          <el-date-picker v-model="searchForm.startTime" type="date" size="mini" placeholder="选择日期" style="width: 150px" />
        </el-form-item>
        <el-form-item label="结束时间：" size="mini">
          <el-date-picker v-model="searchForm.endTime" type="date" size="mini" placeholder="选择日期" style="width: 150px" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="投产信息：" size="mini">
        <el-form-item label="投产状态" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="委外性质：" size="mini">
        <el-form-item label="加工类型" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="生产信息：" size="mini">
        <el-form-item label="公司名称" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini" ></el-input>
        </el-form-item>
        <el-form-item label="工厂" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini" ></el-input>
        </el-form-item>
        <el-form-item label="车间" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini" ></el-input>
        </el-form-item>
        <el-form-item label="产线" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini" ></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="设备信息：" size="mini">
        <el-form-item label="设备类型" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini" ></el-input>
        </el-form-item>
        <el-form-item label="设备代码" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini" ></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="工序信息：" size="mini">
        <el-form-item label="工序" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
          <el-button type="success" size="small" style="margin-left: 25px">查询</el-button>
          <el-button type="success" size="small">重置</el-button>
      </el-form-item>
      <div class="control-panel">
        <el-button type="success" size="small" style="margin-left: 25px">数据录入</el-button>
        <el-button type="success" size="small">数据导入</el-button>
        <el-button type="warning" size="small">修改数据</el-button>
        <el-button type="danger" size="small">删除数据</el-button>
        <el-button type="success" size="small">导入模板下载</el-button>
          <el-button type="success" size="small">导出当前数据</el-button>
      </div>
    </el-form>
    <div class="search-box-bottom">
      <el-icon color="#fff" size="22" v-show="!isExpand" @click="expandSearch(true)"><ArrowDown /></el-icon>
      <el-icon color="#fff" size="22" v-show="isExpand" @click="expandSearch(false)"><ArrowUp /></el-icon>
    </div>
  </div>
</template>

<script setup>
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import { ArrowDown, ArrowUp } from '@element-plus/icons'
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
  const isExpand = ref(true)
  const DateOptions = ref(['年', '季', '月', '周', '日'])
  // function
  function expandSearch(val) {
    isExpand.value = val
  }
  function radioChange() {}
  function handleCheckedDateArea() {}
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
  height: 50px;
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