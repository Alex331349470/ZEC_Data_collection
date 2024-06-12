<template>
  <div v-if="selectType === 'single'">
    <el-select
      :style="{'width': inputWidth}"
      v-model="selectValue"
      placeholder="请选择" 
      loading-text="加载中..."
      :disabled="selectType === 'disabled'"
      @change="changeSingle"
    >
    <template #header>
        <el-input v-model="searchInput[selectTypeName]" placeholder="关键字搜索" @keyup.enter="refresh">
          <template #append>
            <el-button :icon="Search" @click="refresh"/>
          </template>
        </el-input>
      </template>
      <el-option
        v-for="(item, index) in options[selectTypeName]"
        :key="index" 
        :value="item"
        :label="item"
      />
    </el-select>
  </div>
  <div v-else>
    <el-select popper-class="select-popover-class" :style="{'width': inputWidth}"
      v-model="selectNameArr" 
      multiple 
      placeholder="请选择" 
      collapse-tags 
      :max-collapse-tags="1" 
      :loading="loading"
      loading-text="加载中..."
      @change="handleSingleChange" 
      :disabled="selectType === 'disabled'"
    >
      <template #header>
        <el-input v-model="searchInput[selectTypeName]" placeholder="关键字搜索" @keyup.enter="refresh">
          <template #append>
            <el-button :icon="Search" @click="refresh"/>
          </template>
        </el-input>
      </template>
      <el-checkbox v-if="selectType !== 'disabled'" v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <el-option 
        v-for="(item, index) in options[selectTypeName]" 
        :key="index" 
        :value="item"
        :label="item">
        <el-checkbox v-if="selectType !== 'disabled'" :class="isPropertyTypeSelected(item) ? 'is-box-checked': ''"  :value="isPropertyTypeSelected(item)" :label="item" />
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
  import { Search } from '@element-plus/icons-vue'
  import { reactive,ref,onMounted, watch} from 'vue'
  import {productSelectPlato} from '@/api/quality/product'
  import {materialSelect} from '@/api/quality/incoming'
  import {ProcessSelect} from '@/api/quality/process'
  import {SpcProductSelect} from '@/api/spc/analysis'
  import config from '@/utils/system/config'
  const props = defineProps({
    selectTypeName: {
      type: String,
      default: ''
    },
    productType: {
      type: String,
      default: ''
    },
    selectType: {
      type: String,
      default: ''
    },
    selectValue: {
      type: String,
      default: ''
    },
    inputWidth: {
      type: String,
      default: '200px'
    },
    selectOption: {
      type: Object,
      default: {}
    }
  })
  const emit = defineEmits(['getProductSelectPlato', 'handleChange'])
  const loading = ref(false)
  const options = ref({})
  const selectNameArr = ref(null)
  const checkAll = ref(true)
  const isIndeterminate = ref(false)
  // console.log({...config})
  const {productSelect, incomingSelect, processSelect,spcSelect} = {...config}
  const searchInput = reactive({})
  onMounted(() => {
    reduceData()
    getInit(props.selectOption)
  })
  watch(() => props.selectOption, (newValue) => {
    getInit(newValue)
  })
  function isPropertyTypeSelected(item) {
    emit('handleChange', selectNameArr.value)
    return selectNameArr.value ? selectNameArr.value.includes(item) : false
  }
  // 全选
  function handleCheckAllChange(val) {
    selectNameArr.value = val ? options.value[props.selectTypeName] : []
    isIndeterminate.value = false
  }
  // 单选下拉框选中
  function changeSingle(val) {
    emit('handleChange', val)
  }
  //单独选中
  function handleSingleChange(item) {
    if(item) {
      checkAll.value = item.length === options.value[props.selectTypeName].length
      isIndeterminate.value = item.length > 0 && item.length < options.value[props.selectTypeName].length
    }
  }
  // 检测是哪个页面
  function reduceData() {
    switch(props.productType) {
      case 'incoming':
        Object.assign(searchInput, { ...incomingSelect })
        break
      case 'process':
        Object.assign(searchInput, { ...processSelect })
        break
      case 'product':
        Object.assign(searchInput, { ...productSelect })
        break
      case 'spc':
        Object.assign(searchInput, { ...spcSelect })
    }
  }
  function getInit(data) {
    if(props.selectType !== 'single') {
      selectNameArr.value = data[props.selectTypeName]
    }
    if(props.selectType === 'disabled') {
      selectNameArr.value = [data[props.selectTypeName]]
      emit('handleChange', data[props.selectTypeName])
    }
    options.value = data
  }
  function refresh() {
    switch(props.productType) {
      case 'incoming':
        getIncomingSelect()
        break
      case 'process':
        getProcessSelect()
        break
      case 'product':
        getProductSelectPlato()
        break
      case 'spc':
        getSpcProductSelect()
        break
    }
  }
  // 成品检索
  function getProductSelectPlato() {
    loading.value = true
    productSelectPlato({input:searchInput}).then(res => {
      options.value = res.data.productSelectPlato
      loading.value = false
    }).catch(error => {
      console.log(error)
      loading.value = false
    })
  }
  // 来料检索
  function getIncomingSelect(isInint) {
    loading.value = true
    materialSelect({input:searchInput}).then(res => {
      options.value = res.data.materialSelect
      loading.value = false
    }).catch(error => {
      console.log(error)
      loading.value = false
    })
  }
  // 制成检索
  function getProcessSelect(isInint) {
    loading.value = true
    ProcessSelect({input:searchInput}).then(res => {
      options.value = res.data.processSelect
      loading.value = false
    }).catch(error => {
      console.log(error)
      loading.value = false
    })
  }
  // SPC检索
  function getSpcProductSelect(isInint) {
    loading.value = true
    SpcProductSelect({input:searchInput}).then(res => {
      options.value = res.data.spcProductSelect
      loading.value = false
      if(props.selectType === 'disabled') {
        selectNameArr.value = [options.value[props.selectTypeName]]
        emit('handleChange', options.value[props.selectTypeName])
      }
    }).catch(error => {
      console.log(error)
      loading.value = false
    })
  }
</script>

<style lang="scss" scoped>
/* 控制全选按钮样式 */
.select-popover-class .el-scrollbar__view > .el-checkbox {
  padding: 5px 20px;
}
/* 取消多选框触发事件 */
.select-popover-class .el-scrollbar__view > li .el-checkbox {
  pointer-events: none;
}
/* 隐藏多选框选中勾选样式 √ */
.select-popover-class .el-scrollbar__view > li::after {
  display: none;
}
:deep(.el-checkbox__input.is-checked+.el-checkbox__label){
  color: var(--system-primary-color)!important;
}
:deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner), :deep(.el-checkbox__input.is-checked .el-checkbox__inner), :deep(.el-button--success){
  border-color: var(--system-primary-color)!important;;
  background: var(--system-primary-color)!important;
}
// 清除自定义默认选中样式
:deep(.is-box-checked .el-checkbox__input.is-checked+.el-checkbox__label){
  color: #303133;
}
:deep(.is-box-checked .el-checkbox__input.is-checked .el-checkbox__inner){
  border-color: #f2f3f5;
  background: #ffffff;
}
/* 设置选中样式 */
:deep(.is-box-checked .el-checkbox__input+ .el-checkbox__label) {
  color: var(--system-primary-color) !important;
}
:deep(.is-box-checked .el-checkbox__input .el-checkbox__inner) {
  border-color: var(--system-primary-color) !important;
  background: var(--system-primary-color) !important;
}
:deep(.is-box-checked .el-checkbox__input .el-checkbox__inner::after) {
  content: "";
  width: 3px;
  height: 6px;
  border: 1px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translate(50%, -50%);
  margin: 0px -10px 0px -5px;
}
</style>