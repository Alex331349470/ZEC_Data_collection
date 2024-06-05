<template>
  <div class="search-box">
    <el-form ref="form" :model="searchForm" label-width="100px" :class="isExpand ? 'height' : 'maxHeight'" size="small">
      <el-form-item label="SPC分类：">
        <el-radio-group v-model="searchForm.fenlei">
          <el-radio :value="1">过程特性</el-radio>
          <el-radio :value="2">产品特性（中间品）</el-radio>
          <el-radio :value="3">产品特性（成品）</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生产信息：">
        <el-form-item label="工厂" label-width="80px">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="车间" label-width="80px">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="产线" label-width="80px">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="设备编码" label-width="80px">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="物料信息：">
        <el-form-item label="工序" label-width="80px">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="物料类型" label-width="80px">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="物料编码" label-width="80px">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="检测信息：">
        <el-form-item label="特性类型" label-width="80px">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="检测项目" label-width="80px">
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-button type="success" size="small" style="margin-left: 20px" @click="handleSearch">查询</el-button>
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
  const emit = defineEmits(['handleSearch'])
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
  onMounted(() => {
    handleSearch()
  })
  // function
  function handleSearch() {
    emit('handleSearch', searchForm)
  }
  function expandSearch(val) {
    isExpand.value = val
  }
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