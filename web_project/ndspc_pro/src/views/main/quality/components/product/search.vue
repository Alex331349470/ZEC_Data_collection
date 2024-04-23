<template>
  <div class="search-box">
    <el-form ref="form" :model="searchForm" label-width="100px" :class="isExpand ? 'height' : 'maxHeight'" size="mini">
      <el-form-item label="时间范围：" size="mini">
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
      <el-form-item label="时间维度：" size="mini">
        <el-checkbox-group v-model="searchForm.dateArea" @change="handleCheckedDateArea">
          <el-checkbox v-for="date in DateOptions" :label="date" :key="date">{{date}}</el-checkbox >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="产出类型：" size="mini">
        <el-radio-group v-model="searchForm.chanchuArea">
          <el-radio :label="1">一次合格+返工</el-radio>
          <el-radio :label="2">一次合格</el-radio>
          <el-radio :label="3">返工</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="物料信息：" size="mini">
        <el-form-item label="工厂" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="供应商" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="物料类型" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="物料编码" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="检测信息：" size="mini">
        <el-form-item label="特性类型" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="检测项目" label-width="80px" size="mini">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" size="mini"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="计算纬度：" size="mini">
        <el-radio-group v-model="searchForm.jisuanArea" @change="radioChange">
          <el-radio :label="1">按批次数量计算</el-radio>
          <el-radio :label="2">按批次重量计算</el-radio>
        </el-radio-group>
        <el-button type="success" size="small" style="margin-left: 20px">查询</el-button>
        <el-button type="success" size="small">重置</el-button>
      </el-form-item>
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