<template>
  <div class="box">
		<el-upload class="upload-demo"
			accept=".xls,.xlsx"
			drag
			multiple
			action="#"
			:auto-upload="false"
			:show-file-list="true"
			:file-list="fileLists"
			:on-change="handleChange"
		>
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text">
				<div>单击或拖动文件到该区域以上传</div>
				<div class="tip">支持单次或批量上传</div>
			</div>
		</el-upload>
	</div>
</template>
<script setup>
import {reactive} from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
defineExpose({
  handleUpload
})
const emit = defineEmits(['closeAllDialog'])
const fileLists = reactive([])
function handleChange(file, fileList) {
	fileLists.value = fileList
}
function handleUpload() {
	if(fileLists.value?.length) {
		emit('closeAllDialog')
		ElMessage({ message: '上传成功', type: 'success'})
	} else {
		ElMessage({ message: '请至少选择一个文件', type: 'warning'})
	}
}
</script>
<style scoped>
.box {
	padding: 20px 20px 0 20px;
}
.tip {
	margin: 10px;
	font-size: 12px;
	color: #b5b5b5;
}
</style>