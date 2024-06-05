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
          <MultipleSelect 
            :options="options.factory" 
            :selectNameArr="searchForm.factory" 
            @getProductSelectPlato="getProductSelectPlato" 
            @handleChange='searchForm.factory=$event' />
        </el-form-item>
        <el-form-item label="车间" label-width="80px" >
          <MultipleSelect 
            :options="options.workshop" 
            :selectNameArr="searchForm.workshop" 
            @getProductSelectPlato="getProductSelectPlato" 
            @handleChange='searchForm.workshop=$event' />
        </el-form-item>
        <el-form-item label="产线" label-width="80px" >
          <MultipleSelect 
            :options="options.line" 
            :selectNameArr="searchForm.line" 
            @getProductSelectPlato="getProductSelectPlato" 
            @handleChange='searchForm.line=$event' />
        </el-form-item>
      </el-form-item>
      <el-form-item label="物料信息：" >
        <el-form-item label="物料类型" label-width="80px" >
          <MultipleSelect 
            :options="options.materialType" 
            :selectNameArr="searchForm.materialType" 
            @getProductSelectPlato="getProductSelectPlato" 
            @handleChange='searchForm.materialType=$event' />
        </el-form-item>
        <el-form-item label="物料编码" label-width="80px" >
          <MultipleSelect 
            :options="options.materialCode" 
            :selectNameArr="searchForm.materialCode" 
            @getProductSelectPlato="getProductSelectPlato" 
            @handleChange='searchForm.materialCode=$event' />
        </el-form-item>
      </el-form-item>
      <el-form-item label="检测信息：" >
        <el-form-item label="特性类型" label-width="80px" >
          <MultipleSelect 
            :options="options.propertyType" 
            :selectNameArr="searchForm.propertyType" 
            @getProductSelectPlato="getProductSelectPlato" 
            @handleChange='searchForm.propertyType=$event' />
        </el-form-item>
        <el-form-item label="检测项目" label-width="80px" >
          <MultipleSelect 
            :options="options.testItem" 
            :selectNameArr="searchForm.testItem" 
            @getProductSelectPlato="getProductSelectPlato" 
            @handleChange='searchForm.testItem=$event' />
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
  import { Search } from '@element-plus/icons-vue'
  import MultipleSelect from '@/components/multipleSelect/index.vue'
  import {productSelectPlato} from '@/api/quality/product'
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
    materialCode: [],
    testItem: [],
    propertyType: []
  }
  const searchForm = reactive({...defaultParmas})
  const loading = ref(false)
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
    materialCode: '',
    propertyType: '',
    testItem: ''
  })
  const isExpand = ref(true)
  // onmounted
  onMounted(() => {
    getProductSelectPlato()
    handleSearch()
  })
  // function
  function getProductSelectPlato(query) {// 检测项检索
    productSelectPlato({input: query || searchInput}).then(res => {
      loading.value = false
      options.value = res.data.productSelectPlato
    }).catch(error => {
      console.log(error)
      loading.value = false
    })
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
:deep(.el-form-item__label), :deep(.el-form-item__content), .search-box :deep(.el-checkbox__label),:deep(.el-radio__label){
  color: #fff;
}
.search-box :deep(.el-radio__input.is-checked+.el-radio__label), .search-box :deep(.el-checkbox__input.is-checked+.el-checkbox__label){
  color: var(--system-primary-color)!important;
  
}
:deep(.el-radio__input.is-checked .el-radio__inner), .search-box :deep(.el-checkbox__input.is-checked .el-checkbox__inner), :deep(.el-button--success){
  border-color: var(--system-primary-color)!important;;
  background: var(--system-primary-color)!important;
}
</style>