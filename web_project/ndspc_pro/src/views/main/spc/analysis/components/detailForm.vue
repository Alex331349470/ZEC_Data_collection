<template>
  <div class="box">
    <el-form ref="workRef" :model="addForm" width="400px" :rules="rules" style="margin-top: 15px;" disabled :validate-on-rule-change="false">
      <el-divider content-position="center"><span style="color: red">*</span>基础信息</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="工序:" prop="materialCode" label-width="120px">
            <el-input value="成品" placeholder="请输入内容" disabled style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="物料编码：" prop="materialCode" label-width="120px" required>
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="materialCode"
              selectType="single"
              :selectValue="addForm.materialCode"
              @handleChange='addForm.materialCode=$event'
            />
          </el-form-item>
          <el-form-item label="特性类型：" prop="propertyType" label-width="120px">
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="propertyType"
              :selectValue="addForm.propertyType"
              selectType="single"
              @handleChange='addForm.propertyType=$event'
            />
          </el-form-item>
          <el-form-item label="控制图类型：" prop="controlType" label-width="120px">
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="controlType"
              selectType="disabled"
              @handleChange='addForm.controlType=$event'
            />
          </el-form-item>
          <el-form-item label="子组大小：" prop="groupType" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.groupType" placeholder="请输入数值" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="分析控制图编码：" prop="analyzeCode" label-width="120px">
            <el-input v-model="addForm.analyzeCode" placeholder="请输入内容" disabled style="width: 220px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工厂：" prop="factory" label-width="120px">
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="factory"
              selectType="single"
              :selectValue="addForm.factory"
              @handleChange='addForm.factory=$event'
            />
          </el-form-item>
          <el-form-item label="车间：" prop="workshop" label-width="120px" required>
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="workshop"
              selectType="single"
              :selectValue="addForm.workshop"
              @handleChange='addForm.workshop=$event'
            />
          </el-form-item>
          <el-form-item label="产线：" prop="line" label-width="120px" required>
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="line"
              selectType="single"
              :selectValue="addForm.line"
              @handleChange='addForm.line=$event'
            />
          </el-form-item>
          <el-form-item label="物料类型：" prop="materialType" label-width="120px">
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="materialType"
              selectType="single"
              :selectValue="addForm.materialType"
              @handleChange='addForm.materialType=$event'
            />
          </el-form-item>
          <el-form-item label="检测项目：" prop="testItem" label-width="120px" required>
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="testItem"
              selectType="single"
              :selectValue="addForm.testItem"
              @handleChange='addForm.testItem=$event'
            />
          </el-form-item>
          <el-form-item label="负责人：" prop="review" label-width="120px" required>
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="review"
              selectType="single"
              :selectValue="addForm.review"
              @handleChange='addForm.review=$event'
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">规格</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="上限值：" prop="usl" label-width="120px">
            <el-input type="number"  v-model.number="addForm.usl" placeholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下限值：" prop="lsl" label-width="120px">
            <el-input type="number"  v-model.number="addForm.lsl" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>统计目标</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="Mean偏移目标线：" prop="mean" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.mean" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
          <el-form-item label="COV目标线：" prop="covPurpose" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.covPurpose" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Cpk目标线：" prop="cpk" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.cpk" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">控制限</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="上控制限：" prop="ucl" label-width="120px">
            <el-input type="number"  v-model.number="addForm.ucl" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下控制限：" prop="lcl" label-width="120px">
            <el-input type="number"  v-model.number="addForm.lcl" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则①:1个点距离中心线大于_个标准差</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态:" prop="rule1Status" label-width="120px">
            <el-checkbox v-model="addForm.rule1Status" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参数：" prop="rule1" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则②:连续_点在中心线的同一侧</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态:" prop="rule2Status" label-width="120px">
            <el-checkbox v-model="addForm.rule2Status" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参数：" prop="rule2" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则③:连续_点全部递增或者递减</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态:" prop="rule3Status" label-width="120px">
            <el-checkbox v-model="addForm.rule3Status" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参数：" prop="rule3" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule3" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则④:连续_点上下交错</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态:" prop="rule4Status" label-width="120px">
            <el-checkbox v-model="addForm.rule4Status" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参数：" prop="rule4" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule4" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则⑤:_点(K)中存在K-1个点距离中心线(同侧)大于两个标准差</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态:" prop="rule5Status" label-width="120px">
            <el-checkbox  v-model="addForm.rule5Status" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参数：" prop="rule5" label-width="120px" required>
            <el-input type="number" v-model.number="addForm.rule5" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则⑥:_点(K)中存在K-1个点距离中心线(同侧)大于一个标准差</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态:" prop="rule6Status" label-width="120px">
            <el-checkbox v-model="addForm.rule6Status" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参数：" prop="rule6" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule6" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则⑦:连续 点距离中心线(任一侧)1个标准差以内</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态:" prop="rule7Status" label-width="120px">
            <el-checkbox v-model="addForm.rule7Status" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参数：" prop="rule7" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule7" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则⑧:连续_点距离中心线(任一侧)大于1个标准差</el-divider>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="状态:" prop="rule8Status" label-width="120px">
            <el-checkbox v-model="addForm.rule8Status" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参数：" prop="rule8" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule8" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则⑨:连续_点偏移_个标准差</el-divider>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="状态:" prop="rule9Status" label-width="120px">
            <el-checkbox v-model="addForm.rule9Status" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="参数1：" prop="rule9_a1" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule9_a1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="参数2：" prop="rule9_a2" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule9_a2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center"><span style="color: red">*</span>判异准则⑩:连续_点中存在_点以上距离中心线大于_个标准差</el-divider>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="状态:" prop="rule10Status" label-width="120px">
            <el-checkbox v-model="addForm.rule10Status" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="参数1：" prop="rule10_a1" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule10_a1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="参数2：" prop="rule10_a2" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule10_a2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="参数3：" prop="rule10_a3" label-width="120px" required>
            <el-input type="number"  v-model.number="addForm.rule10_a3" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">判异准则⑪:超出内控线</el-divider>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="状态:" prop="rule11Status" label-width="120px">
            <el-checkbox v-model="addForm.rule11Status" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="控制线上限：" prop="rule11_a1" label-width="120px">
            <el-input type="number"  v-model.number="addForm.rule11_a1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="控制线下限：" prop="rule11_a2" label-width="120px">
            <el-input type="number"  v-model.number="addForm.rule11_a2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">判异准则⑫:连续___点的均值偏移大于___均值偏移（K）管控</el-divider>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="状态:" prop="rule12Status" label-width="120px">
            <el-checkbox v-model="addForm.rule12Status" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="参数1：" prop="rule12_a1" label-width="120px">
            <el-input type="number"  v-model.number="addForm.rule12_a1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="参数2：" prop="rule12_a2" label-width="120px">
            <el-input type="number"  v-model.number="addForm.rule12_a2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {SpcProductSelect} from '@/api/spc/analysis'
import config from '@/utils/system/config'
import MultipleSelect from '@/components/multipleSelect/index.vue'
defineExpose({ getInfo })
const addForm = ref({})
const inputSelect = config.spcSelect
const options = ref({})
function getInfo(data) {
  addForm.value = data
  getInputSelect()
}
// 检索查询
async function getInputSelect() {
  const res = await SpcProductSelect({input:inputSelect})
  const data = res.data.spcProductSelect
  if(data) {
    options.value = data
  }
}
</script>
<style scoped>
.box {
  padding: 20px;
}
</style>