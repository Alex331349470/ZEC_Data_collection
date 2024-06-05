<template>
  <el-select v-model="selectNameArr" multiple placeholder="请选择" collapse-tags popper-class="select-popover-class">
    <!-- 当下拉框搜索为空时展现的内容 -->
    <template slot="empty"> 
      <el-input v-model="searchInput.propertyType" placeholder="关键字搜索">
        <template #append>
          <el-button :icon="Search" @click="handleSearch()"/>
        </template>
      </el-input>
      <div class="el-select-dropdown__empty">无匹配数据</div>
    </template>
    <!-- 当下拉框不为空时展现的内容 -->
    <el-input v-model="searchInput.propertyType" placeholder="关键字搜索">
      <template #append>
        <el-button :icon="Search" @click="handleSearch()"/>
      </template>
    </el-input>
    <el-option 
      v-for="(item, index) in options" 
      :key="index" 
      :value="item"
      :label="item">
      <el-checkbox :class="isPropertyTypeSelected(item, selectNameArr) ? 'is-box-checked': ''" :checked="isPropertyTypeSelected(item, 'propertyType')" :label="item" />
    </el-option>
  </el-select>
</template>

<script setup>
  import { Search } from '@element-plus/icons-vue'
  import { reactive } from 'vue'
  const props = defineProps({
    selectNameArr: {
      type: Array,
      default: []
    },
    options: {
      type: Array,
      default: []
    }
  })
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
  // function
  function handleSearch() {// 检测项检索 
    emit('getProductSelectPlato',searchInput)
  }
  function isPropertyTypeSelected(item) {
    emit('handleChange', props.selectNameArr)
    return props.selectNameArr ? props.selectNameArr.includes(item) : false
  }
</script>

<style lang="scss" scoped>
/* 控制全选按钮样式 */
.select-popover-class .el-scrollbar__view > .el-checkbox{
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
:deep .select-popover-class .el-scrollbar {
  display: block!important;
}
.select-popover-class .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #fff;
}
/* 取消多选框触发事件 */
:deep .is-box-checked .el-checkbox__inner {
    background: var(--system-primary-color)!important;
    border-color: #ffffff;
}
:deep .is-box-checked .el-checkbox__label{
   color: var(--system-primary-color) !important; /* 改变选中状态下的边框颜色 */
}
</style>