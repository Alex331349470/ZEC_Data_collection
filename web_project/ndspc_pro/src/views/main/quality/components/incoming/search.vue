<template>
  <div class="search-box">
    <el-form ref="form" :model="searchForm" label-width="100px" :class="isExpand ? 'height' : 'maxHeight'" size="small">
      <el-form-item label="时间范围：" >
        <el-radio-group v-model="searchForm.selectedTime" style="margin-top: -3px;" @change="changeRadio">
          <el-radio :value="5">全部时间</el-radio>
          <el-radio :value="1">本年度</el-radio>
          <el-radio :value="2">本季度</el-radio>
          <el-radio :value="3">本月度</el-radio>
          <el-radio :value="4">当天</el-radio>
          <el-radio :value="6">自定义</el-radio>
        </el-radio-group>
        <el-form-item label="开始时间：" >
          <el-date-picker v-model="searchForm.startTime" type="date" value-format="YYYY-MM-DD" :disabled="searchForm.selectedTime !== 6"  placeholder="选择日期" style="width: 150px" />
        </el-form-item>
        <el-form-item label="结束时间：" >
          <el-date-picker v-model="searchForm.endTime" type="date" value-format="YYYY-MM-DD" :disabled="searchForm.selectedTime !== 6" placeholder="选择日期" style="width: 150px" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="时间维度：" >
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox v-model="searchForm[date.value]" v-for="(date, index) in DateOptions" @change="handleDateChange" :key="index">{{date.label}}</el-checkbox>
      </el-form-item>
      <el-form-item label="开发纬度：" >
        <el-radio-group v-model="searchForm.developType">
          <el-radio value="量产+开发">量产+开发</el-radio>
          <el-radio value="量产">量产</el-radio>
          <el-radio value="开发">开发</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="物料信息：" >
        <el-form-item label="工厂" label-width="80px">
          <MultipleSelect 
            :selectOption="options"
            productType="incoming"
            selectTypeName="factory"
            @handleChange='searchForm.factory=$event' />
        </el-form-item>
        <el-form-item label="供应商" label-width="80px" >
          <MultipleSelect 
            :selectOption="options"
            productType="incoming"
            selectTypeName="supplier"
            @handleChange='searchForm.supplier=$event' />
        </el-form-item>
        <el-form-item label="物料类型" label-width="80px" >
          <MultipleSelect 
            :selectOption="options"
            productType="incoming"
            selectTypeName="materialType"
            @handleChange='searchForm.materialType=$event' />
        </el-form-item>
        <el-form-item label="物料编码" label-width="80px" >
          <MultipleSelect 
            :selectOption="options"
            productType="incoming"
            selectTypeName="materialCode" 
            @handleChange='searchForm.materialCode=$event' />
        </el-form-item>
      </el-form-item>
      <el-form-item label="检测信息：" >
        <el-form-item label="特性类型" label-width="80px" >
          <MultipleSelect
            :selectOption="options"
            productType="incoming"
            selectTypeName="propertyType"
            @handleChange='searchForm.propertyType=$event' />
        </el-form-item>
        <el-form-item label="检测项目" label-width="80px" >
          <MultipleSelect 
            :selectOption="options"
            productType="incoming"
            selectTypeName="testItem" 
            @handleChange='searchForm.testItem=$event' />
        </el-form-item>
      </el-form-item>
      <el-form-item label="计算纬度：" >
        <el-radio-group v-model="searchForm.quantityCalcSwitch">
          <el-radio :value="true">按批次数量计算</el-radio>
          <el-radio :value="false">按批次重量计算</el-radio>
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
  import { onMounted,reactive, ref } from 'vue'
  import { ArrowDown, ArrowUp } from '@element-plus/icons'
  import MultipleSelect from '@/components/multipleSelect/index.vue'
  import {materialSelect} from '@/api/quality/incoming'
  import config from '@/utils/system/config'
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
    supplier: [],
    materialType: [],
    materialCode: [],
    developType: '量产'
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
  const demintions = ['yearDemintion', 'seasonDemintion', 'monthDemintion', 'weekDemintion', 'dayDemintion']
  const checkAll = ref(false)
  const isIndeterminate = ref(true)
  const inputSelect = config.incomingSelect
  const options = ref({})
  onMounted(() => {
    getInputSelect()
  })
  // 查询
  function handleSearch() {
    emit('handleSearch', searchForm)
  }
  // 重置
  function reset() {
    Object.assign(searchForm, { ...defaultParmas })
    getInputSelect()
  }
  // 检索查询
  async function getInputSelect() {
    const res = await materialSelect({input:inputSelect})
    const data = res.data.materialSelect
    if(data) {
      options.value = data
      Object.keys(searchForm).forEach(key => {
        if (data.hasOwnProperty(key)) {
          searchForm[key] = data[key]
        }
      })
      handleSearch()
    }
  }
  // 搜索面板显示隐藏
  function expandSearch(val) {
    isExpand.value = val
  }
  // 全选
  function handleCheckAllChange(val) {
    isIndeterminate.value = false
    demintions.forEach(dimension => {
      searchForm[dimension] = val
    })
  }
  // 监听时间维度选择方法
  function handleDateChange() {
    const checkedCount = demintions.filter(dimension => searchForm[dimension]).length
    checkAll.value = checkedCount === demintions.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < demintions.length
  }
  // 时间范围选择事件
  function changeRadio(val) {
    if(val !== 6) {
      searchForm.startTime = ''
      searchForm.endTime = ''
    }
  }
</script>
<style lang="scss" scoped>
@import '@/assets/style/search.scss';
</style>