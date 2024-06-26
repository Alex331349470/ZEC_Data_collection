<template>
  <div class="search-box form">
    <el-form ref="form" :model="searchForm" label-width="100px" :class="isExpand ? 'height' : 'maxHeight'" size="small">
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
  import MultipleSelect from '@/components/multipleSelect/index.vue'
  import config from '@/utils/system/config'
  import {SpcProductSelect} from '@/api/spc/analysis'
  const emit = defineEmits(['handleSearch'])
  // parmas
  const defaultParmas = {}
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
  function handleSearch() {
    emit('handleSearch', searchForm)
  }
  function expandSearch(val) {
    isExpand.value = val
  }
  // 重置
  function reset() {
    Object.assign(searchForm, { ...defaultParmas })
    getInputSelect()
  }
</script>
<style lang="scss" scoped>
  @import '@/assets/style/search.scss';
</style>