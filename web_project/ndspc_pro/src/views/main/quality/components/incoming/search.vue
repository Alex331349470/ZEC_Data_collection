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
      <el-form-item label="开发纬度：" >
        <el-radio-group v-model="searchForm.developType">
          <el-radio label="量产+开发">量产+开发</el-radio>
          <el-radio label="量产">量产</el-radio>
          <el-radio label="开发">开发</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="物料信息：" >
        <el-form-item label="工厂" label-width="80px">
          <MultipleSelect 
            :options="options.factory" 
            :selectNameArr="searchForm.factory" 
            @getProductSelectPlato="getProductSelectPlato" 
            @handleChange='searchForm.factory=$event' />
        </el-form-item>
        <el-form-item label="供应商" label-width="80px" >
          <MultipleSelect 
            :options="options.Supplier" 
            :selectNameArr="searchForm.Supplier" 
            @getProductSelectPlato="getProductSelectPlato" 
            @handleChange='searchForm.Supplier=$event' />
        </el-form-item>
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
  import { reactive, ref, onMounted } from 'vue'
  import { ArrowDown, ArrowUp } from '@element-plus/icons'
  import {productSelectPlato} from '@/api/quality/product'
  import MultipleSelect from '@/components/multipleSelect/index.vue'
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
    propertyType:[],
    factory: [],
    supplier: [],
    materialType: [],
    materialCode: [],
  }
  const searchForm = reactive({...defaultParmas})
  const isExpand = ref(true)
  const DateOptions = reactive([ // 时间维度数组
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
  ])
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
  // onmounted
  onMounted(() => {
    getProductSelectPlato()
    handleSearch()
  }) 
  // function
  function getProductSelectPlato(query) {// 检测项检索
    productSelectPlato({input: query || searchInput}).then(res => {
      options.value = res.data.productSelectPlato
    }).catch(error => {
      console.log(error)
    })
  }
  function handleSearch() {
    emit('handleSearch', searchForm)
  }
  function reset() {
    Object.assign(searchForm, { ...defaultParmas })
    handleSearch()
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