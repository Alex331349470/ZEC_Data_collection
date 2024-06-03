<template>
  <div class="search-box">
    <el-form ref="form" :model="searchForm" label-width="100px" :class="isExpand ? 'height' : 'maxHeight'" size="small">
      <el-form-item label="时间范围：" >
        <el-radio-group v-model="searchForm.selectedTime" style="margin-top: -3px;">
          <el-radio :label="5">全部时间</el-radio>
          <el-radio :label="1">本年度</el-radio>
          <el-radio :label="2">本季度</el-radio>
          <el-radio :label="3">本月度</el-radio>
          <el-radio :label="4">当天</el-radio>
          <el-radio :label="6">自定义</el-radio>
        </el-radio-group>
        <el-form-item label="开始时间：" >
          <el-date-picker v-model="searchForm.startTime" type="date" value-format="YYYY-MM-DD" :disabled="searchForm.selectedTime !== 6"  placeholder="选择日期" style="width: 150px" />
        </el-form-item>
        <el-form-item label="结束时间：" >
          <el-date-picker v-model="searchForm.endTime" type="date" value-format="YYYY-MM-DD" :disabled="searchForm.selectedTime !== 6" placeholder="选择日期" style="width: 150px" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="时间维度：" >
        <el-checkbox v-model="searchForm[date.value]" v-for="(date, index) in DateOptions" :key="index">{{date.label}}</el-checkbox>
      </el-form-item>
      <el-form-item label="产出类型：" >
        <el-radio-group v-model="searchForm.productType">
          <el-radio label="一次合格+返工">一次合格+返工</el-radio>
          <el-radio label="一次合格">一次合格</el-radio>
          <el-radio label="返工">返工</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="来料信息：" >
        <el-form-item label="工厂" label-width="80px" >
          <el-select v-model="searchForm.factory" multiple placeholder="请选择" filterable remote reserve-keyword :remote-method="getFactory">
            <el-option v-for="(item, index) in options.factory" :key="index" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" label-width="80px" >
          <el-select v-model="searchForm.workshop" multiple placeholder="请选择" filterable remote reserve-keyword :remote-method="getWorkshop">
            <el-option v-for="(item, index) in options.workshop" :key="index" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="产线" label-width="80px" >
          <el-select v-model="searchForm.line" multiple placeholder="请选择" filterable remote reserve-keyword :remote-method="getLine">
            <el-option v-for="(item, index) in options.line" :key="index" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="物料信息：" >
        <el-form-item label="物料类型" label-width="80px" >
          <el-select v-model="searchForm.materialType" multiple placeholder="请选择" filterable remote reserve-keyword :remote-method="getMaterialType">
            <el-option v-for="(item, index) in options.materialType" :key="index" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="物料编码" label-width="80px" >
          <el-select v-model="searchForm.materialCode" multiple placeholder="请选择" filterable remote reserve-keyword :remote-method="getMaterialCode">
            <el-option v-for="(item, index) in options.materialCode" :key="index" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="检测信息：" >
        <el-form-item label="特性类型" label-width="80px" >
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="检测项目" label-width="80px" >
          <el-input v-model="searchForm.gongchang" placeholder="请输入内容" ></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="计算纬度：" >
        <el-radio-group v-model="searchForm.quantityCalcSwitch">
          <el-radio :label="true">按批次数量计算</el-radio>
          <el-radio :label="false">按批次重量计算</el-radio>
        </el-radio-group>
        <el-button type="success" size="small" style="margin-left: 20px" @click="reset">重置</el-button>
        <el-button type="success" size="small"  @click="handleSearch">查询</el-button>
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
  import {ProductSelect} from '@/api/quality/product'
  const emit = defineEmits(['handleSearch'])
  // parmas
  const defaultParmas = {
    selectedTime: 5,
    startTime: '',
    endTime: '',
    yearDemintion: true,
    seasonDemintion: false,
    monthDemintion: true,
    weekDemintion: false,
    dayDemintion: false,
    quantityCalcSwitch: true,
    factory: [],
    productType: '一次合格+返工',
    workshop: [],
    line: [],
    materialType: [],
    materialCode: []
  }
  const searchForm = reactive({...defaultParmas})
  const DateOptions = reactive([
    {
      value: 'yearDemintion',
      label: '年'
    },
    {
      value: 'seasonDemintion',
      label: '季度'
    },
    {
      value: 'monthDemintion',
      label: '月'
    },
    {
      value: 'weekDemintion',
      label: '周'
    },
    {
      value: 'dayDemintion',
      label: '日'
    }
  ]) // 时间维度数组
  const options = ref({})// 下拉框数据
  const searchInput = reactive({// 下拉框搜索条件
    factory: '',
    workshop: '',
    line: '',
    materialType: '',
    materialCode: ''
  })
  const isExpand = ref(true)
  // onmounted
  onMounted(() => {
    getProductSelect()
    handleSearch()
  })
  // function
  function getProductSelect() {// 获取下拉框数据
    ProductSelect({input: searchInput}).then(res => {
      options.value = res.data.productSelect
    })
  }
  function getFactory(query) {
    searchInput.factory = query
    debounce(getProductSelect(), 100)
  }
  function getWorkshop(query) {
    searchInput.workshop = query
    debounce(getProductSelect(), 100)
  }
  function getLine(query) {
    searchInput.line = query
    debounce(getProductSelect(), 100)
  }
  function getMaterialType(query) {
    searchInput.materialType = query
    debounce(getProductSelect(), 100)
  }
  function getMaterialCode(query) {
    searchInput.materialCode = query
    debounce(getProductSelect(), 100)
  }
  function debounce(fn, delay) {
    let timeoutID
    return function(...args) {
      if (timeoutID) {
        clearTimeout(timeoutID)
      }
      timeoutID = setTimeout(() => {
        fn.apply(this, args)
      }, delay);
    };
  }
  function expandSearch(val) {
    isExpand.value = val
  }
  function handleSearch() {
    emit('handleSearch', searchForm)
  }
  function reset() {
    Object.assign(searchForm, { ...defaultParmas })
    handleSearch()
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