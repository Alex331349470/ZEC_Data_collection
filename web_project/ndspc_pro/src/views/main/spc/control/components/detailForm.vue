<template>
  <div class="box">
    <el-form ref="workRef" :model="addForm" label-width="100px" disabled :validate-on-rule-change="false">
      <el-row :span="24">
        <el-col :span="8">
          <el-form-item label="分析状态：">
            <el-input :value="getStatusLabel(addForm.connect_status).label"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="控制图编码：">
            <el-input :value="addForm.analyze_num"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物料编码：">
            <el-input :value="addForm.material_code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检测项：">
            <el-input :value="addForm.analyze_column"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工厂：">
            <el-input :value="addForm.factory"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车间：">
            <el-input :value="addForm.workshop"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产线：">
            <el-input :value="addForm.line"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上控制限：">
            <el-input :value="addForm.ucl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="下控制限：">
            <el-input :value="addForm.lcl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="子组大小：">
            <el-input :value="addForm.group_type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="控制图类型：">
            <el-input :value="addForm.control_type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="特性类型：">
            <el-input :value="addForm.property_type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则1：">
            <el-input :value="addForm.rule1_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则2：">
            <el-input :value="addForm.rule2_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则3：">
            <el-input :value="addForm.rule3_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则4：">
            <el-input :value="addForm.rule4_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则5：">
            <el-input :value="addForm.rule5_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则6：">
            <el-input :value="addForm.rule6_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则7：">
            <el-input :value="addForm.rule7_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则8：">
            <el-input :value="addForm.rule8_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则9：">
            <el-input :value="addForm.rule9_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则10：">
            <el-input :value="addForm.rule10_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="判异准则11：">
            <el-input :value="addForm.rule11_status? '正常':'未开启'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import config from '@/utils/system/config'
defineExpose({ getInfo })
const addForm = ref({})
const StatusOptions = config.connect_status // 状态标签
function getInfo(data) {
  addForm.value = data
}
// 获取状态标签
function getStatusLabel(status) {
  const mapping = StatusOptions.find(item => item.value === status)
  return mapping ? {label: mapping.label, color: mapping.color} : {label: '未接入', color: '#b2091e'};
}
</script>
<style scoped>
.box {
  padding: 20px;
}
</style>