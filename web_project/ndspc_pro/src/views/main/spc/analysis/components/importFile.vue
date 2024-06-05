<template>
  <div class="box">
    <el-upload
      class="upload-demo"
      accept=".xls,.xlsx"
      ref="uploadRef"
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
import { reactive,ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { gql } from "graphql-tag";

defineExpose({ handleUpload,openImport});

const emit = defineEmits(["closeAllDialog"]);
const uploadRef = ref(null)
const fileLists = reactive([]);
function handleChange(file, fileList) {
  fileLists.value = fileList;
}

const UPLOAD_MUTATION = `
  mutation UploadExcels($files: [Upload!]!) {
  uploadExcels(files: $files) {
    message
    success
  }
}
`;

function handleUpload() {
  let formData = new FormData();
  fileLists.value.forEach((file, index) => {
    formData.append(
      "operations",
      JSON.stringify({
        query: UPLOAD_MUTATION,
        variables: {
          files: null,
        },
      })
    );
    const obj = {}
    obj[index] = ["variables.files"]
    formData.append("map", JSON.stringify(obj));
    formData.append(index, file.raw);
  });

  fetch("http://10.0.45.20:8080/graphql", {
    method: "POST",
    body: formData,
    headers: {
      "Apollo-Require-Preflight": true,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if(result.data.uploadExcels.success) {
        ElMessage({ message: result.data.uploadExcels.message, type: 'success',plain: true })
        emit(closeAllDialog)
      } else {
        ElMessage({ message:'上传失败，请检查文件是否符合要求！', type: 'info',plain: true })
      }
    })
    .catch((error) => {
      ElMessage({ message:'error', type: 'error', plain: true})
    });
}
function openImport() { // 清空缓存文件
  fileLists.value = []
  uploadRef.value.clearFiles()
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
