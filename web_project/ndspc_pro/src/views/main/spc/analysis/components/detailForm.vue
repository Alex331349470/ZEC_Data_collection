<template>
  <div class="box">
    <el-form ref="workRef" :model="addForm" width="400px" :rules="rules" style="margin-top: 15px;" disabled>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="分析控制图编码：" prop="bianma" label-width="120px">
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="物料编码：" prop="bianma" label-width="120px" required>
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="检测项目名称：" prop="bianma" label-width="120px">
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="车间：" prop="bianma" label-width="120px" required>
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="控制图类型：" prop="bianma" label-width="120px" required>
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分析状态：" prop="bianma" label-width="120px" required>
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="物料名称：" prop="bianma" label-width="120px">
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="工厂编码：" prop="bianma" label-width="120px">
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="产线：" prop="bianma" label-width="120px" required>
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="子组大小：" prop="bianma" label-width="120px" required>
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="变更次数：" prop="bianma" label-width="120px">
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="检测项目：" prop="bianma" label-width="120px" required>
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="工厂名称：" prop="bianma" label-width="120px">
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="物料类型：" prop="bianma" label-width="120px">
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="特性类型：" prop="bianma" label-width="120px">
            <el-input v-model="addForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
import {reactive} from 'vue'
const addForm = reactive({})
</script>
<style scoped>
.box {
  padding: 20px;
}
</style>