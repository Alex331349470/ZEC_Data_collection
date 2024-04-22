<template>
  <div class="my-dialog">
    <el-dialog v-model="visible" :close-on-click-modal="false" :width="popupWidth" :close-on-press-escape="false" :show-close="false" :fullscreen="isExpand || fullScreen">
      <template #header>
        <div class="title">{{dialogTitle}}</div>
        <div class="icon">
          <el-icon @click="openDialog(isExpand)" v-if="!fullScreen"><Rank /></el-icon>
          <el-icon style="margin-left: 10px" @click="handleClose"><Close /></el-icon>
        </div>
      </template>
      <slot />
      <template #footer v-if="!hiddenFooter">
        <span class="dialog-footer">
          <el-button @click="handleClose" size="mini">取 消</el-button>
          <el-button type="success" :loading="addLoading" @click="Save" size="mini">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup >
import {Close, Rank} from '@element-plus/icons-vue'
import { ref } from 'vue';
const props = defineProps({
  dialogTitle: {
    type: String,
    default: ''
  },
  popupWidth: {
    type: String,
    default: '550px'
  },
  fullScreen: {
    type:Boolean,
    default: false
  },
  hiddenFooter: {
    type: Boolean,
    default: false
  }
});
const visible = ref(false)
const isExpand = ref(false)
const addLoading = ref(false)
const emit = defineEmits(['confirmEmitBtn'])
function handleClose() {
  visible.value = false
}
function openDialog(val) {
  isExpand.value = !val
}
function Save() {
  emit('confirmEmitBtn')
}
//暴露是否loading效果和弹框是否显示
defineExpose({
  visible,
  isExpand,
  addLoading
});
</script>
<style lang="scss" scoped>
:deep( .el-dialog__header) {
  padding: 10px 10px 10px 10px!important;
  margin-right: 0!important;
  display: flex!important;
  justify-content: space-between;
  background: var(--el-color-success-dark-2);
  color: #fff;
}
:deep( .el-dialog__body) {
  padding: 0!important;
}
</style>