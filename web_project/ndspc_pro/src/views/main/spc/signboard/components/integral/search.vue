<template>
  <div class="search-box form">
    <el-form ref="form" :model="searchForm" label-width="100px" :class="isExpand ? 'height' : 'maxHeight'" size="small">``
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
      <el-form-item label="时间分组：" >
        <el-radio-group v-model="searchForm.date">
          <el-radio v-for="key in DateOptions" :label="key" :key="key">{{key}}</el-radio>
        </el-radio-group>
        <el-form-item label="空间分组:" >
          <el-radio-group v-model="searchForm.kongjian">
          <el-radio v-for="key in KongjianOptions" :label="key" :key="key">{{key}}</el-radio>
        </el-radio-group>
        </el-form-item>
      </el-form-item>
      <el-form-item label="来料信息：" >
        <el-form-item label="工厂" label-width="80px">
          <MultipleSelect 
            productType="spc"
            inputWidth="220px"
            :selectOption="options"
            selectTypeName="factory"
            @handleChange='searchForm.factory=$event' />
        </el-form-item>
        <el-form-item label="车间" label-width="80px" >
          <MultipleSelect 
            productType="spc"
            inputWidth="220px"
            :selectOption="options"
            selectTypeName="workshop"
            @handleChange='searchForm.workshop=$event' />
        </el-form-item>
        <el-form-item label="产线" label-width="80px" >
          <MultipleSelect 
            productType="spc"
            inputWidth="220px"
            :selectOption="options"
            selectTypeName="line"
            @handleChange='searchForm.line=$event' />
        </el-form-item>
      </el-form-item>
      <el-form-item label="物料信息：" >
        <el-form-item label="物料类型" label-width="80px" >
          <MultipleSelect 
            productType="spc"
            inputWidth="220px"
            :selectOption="options"
            selectTypeName="materialType"
            @handleChange='searchForm.materialType=$event' />
        </el-form-item>
        <el-form-item label="物料编码" label-width="80px" >
          <MultipleSelect 
            productType="spc"
            inputWidth="220px"
            :selectOption="options"
            selectTypeName="materialCode"
            @handleChange='searchForm.materialCode=$event' />
        </el-form-item>
      </el-form-item>
      <el-form-item label="检测信息：" >
        <el-form-item label="特性类型" label-width="80px" >
          <MultipleSelect 
            productType="spc"
            inputWidth="220px"
            :selectOption="options"
            selectTypeName="propertyType"
            @handleChange='searchForm.propertyType=$event' />
        </el-form-item>
        <el-form-item label="检测项目" label-width="80px" >
          <MultipleSelect 
            productType="spc"
            inputWidth="220px"
            :selectOption="options"
            selectTypeName="testItem"
            @handleChange='searchForm.testItem=$event' />
        </el-form-item>
        <el-checkbox v-model="searchForm.checked1" style="margin-left:20px;">是否进入看板模式</el-checkbox>
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
  import { onMounted, reactive, ref } from 'vue'
  import { ArrowDown, ArrowUp } from '@element-plus/icons'
  import MultipleSelect from '@/components/multipleSelect/index.vue'
  import config from '@/utils/system/config'
  import {SpcProductSelect} from '@/api/spc/analysis'
  const emit = defineEmits(['handleSearch'])
  // parmas
  const defaultParmas = {
    selectedTime: 5,
    startTime: '',
    endTime: '',
    quantityCalcSwitch: true
  }
  const searchForm = reactive({...defaultParmas})
  const isExpand = ref(true)
  const DateOptions = ref(['年', '季', '月', '周', '日'])
  const KongjianOptions = ref(['工厂', '车间', '产线', '物料类型', '物料编码'])
  const options = ref({})
  const inputSelect = config.spcSelect
  onMounted(() => {
    getInputSelect()
  })
  // 检索查询
  async function getInputSelect() {
    const res = await SpcProductSelect({input:inputSelect})
    const data = res.data.spcProductSelect
    if(data) {
      options.value = data
      Object.keys(searchForm).forEach(key => {
        if (data.hasOwnProperty(key)) {
          searchForm[key] = data[key];
        }
      })
      handleSearch()
    }
  }
  // 重置
  function reset() {
    Object.assign(searchForm, { ...defaultParmas })
    getInputSelect()
  }
  function handleSearch() {
    emit('handleSearch', searchForm)
  }
  function expandSearch(val) {
    isExpand.value = val
  }
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