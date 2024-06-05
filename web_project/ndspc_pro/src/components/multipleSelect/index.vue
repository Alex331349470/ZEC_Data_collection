<template>
  <el-select popper-class="select-popover-class" style="width: 200px"
    v-model="selectNameArr" 
    multiple 
    placeholder="请选择" 
    collapse-tags 
    :max-collapse-tags="1" 
    :loading="loading"
    loading-text="加载中..."
  >
    <template #header>
      <el-input v-model="searchInput[selectTypeName]" placeholder="关键字搜索" @keyup.enter="getProductSelectPlato">
        <template #append>
          <el-button :icon="Search" @click="getProductSelectPlato()"/>
        </template>
      </el-input>
    </template>
    <el-option 
      v-for="(item, index) in options[selectTypeName]" 
      :key="index" 
      :value="item"
      :label="item">
      <el-checkbox :class="isPropertyTypeSelected(item) ? 'is-box-checked': ''"  :value="isPropertyTypeSelected(item)" :label="item" />
    </el-option>
  </el-select>
</template>

<script setup>
  import { Search } from '@element-plus/icons-vue'
  import { reactive,ref,onMounted } from 'vue'
  import {productSelectPlato} from '@/api/quality/product'
  const props = defineProps({
    selectNameArr: {
      type: Array,
      default: []
    },
    selectTypeName: {
      type: String,
      default: ''
    }
  })
  const loading = ref(false)
  const options = ref({})
  const emit = defineEmits(['getProductSelectPlato', 'handleChange'])
  const searchInput = reactive({// 下拉框搜索条件
    factory: '',
    workshop: '',
    line: '',
    materialType: '',
    materialCode: '',
    propertyType: '',
    testItem: ''
  })
  onMounted(() => {
    getProductSelectPlato()
  })
  function getProductSelectPlato() {// 检测项检索
    loading.value = true
    productSelectPlato({input:searchInput}).then(res => {
      options.value = res.data.productSelectPlato
      loading.value = false
    }).catch(error => {
      console.log(error)
      loading.value = false
    })
  }
  function isPropertyTypeSelected(item) {
    emit('handleChange', props.selectNameArr)
    return props.selectNameArr ? props.selectNameArr.includes(item) : false
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
// 清除默认选中样式
:deep(.el-checkbox__input.is-checked+.el-checkbox__label){
  color: #303133;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner){
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