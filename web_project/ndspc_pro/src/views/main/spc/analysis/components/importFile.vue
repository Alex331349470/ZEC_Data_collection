<template>
  <div class="box">
    <el-upload
      class="upload-demo"
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
import { reactive } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
// import { uploadFile } from "@/api/spc/analysis";
import { gql } from "graphql-tag";

defineExpose({
  handleUpload,
});

const emit = defineEmits(["closeAllDialog"]);
const fileLists = reactive([]);
function handleChange(file, fileList) {
  fileLists.value = fileList;
}

const UPLOAD_MUTATION = `
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      uri
      filename
      mimetype
      encoding
      fileSize
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
          file: null,
        },
      })
    );
    const obj = {}
    obj[index] = ["variables.file"]
    formData.append("map", JSON.stringify(obj));
    formData.append(index, file.raw);
  });

  fetch("http://10.0.45.20:4000/graphql", {
    method: "POST",
    body: formData,
    headers: {
      "Apollo-Require-Preflight": true,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
