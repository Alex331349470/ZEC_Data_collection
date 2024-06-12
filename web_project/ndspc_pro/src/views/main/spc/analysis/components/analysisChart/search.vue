<template>
  <div class="search-box">
    <el-form ref="form" class="form" :model="searchForm" label-width="120px" :class="isExpand ? 'height' : 'maxHeight'" label-position="left" size="small">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item label="物料编码：" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="materialCode"
              selectType="single"
              :selectValue="searchForm.materialCode"
              @handleChange='searchForm.materialCode=$event'
            />
          </el-form-item>
          <el-form-item label="检测项目：" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="testItem"
              selectType="single"
              :selectValue="searchForm.testItem"
              @handleChange='searchForm.testItem=$event'
            />
          </el-form-item>
          <el-form-item label="车间：" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="workshop"
              selectType="single"
              :selectValue="searchForm.workshop"
              @handleChange='searchForm.workshop=$event'
            />
          </el-form-item>
          <el-form-item label="特性类型：" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="propertyType"
              selectType="single"
              :selectValue="searchForm.propertyType"
              @handleChange='searchForm.propertyType=$event'
            />
          </el-form-item>
          <el-form-item label="控制图类型：" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="controlType"
              selectType="disabled"
              @handleChange='searchForm.controlType=$event'
            />
          </el-form-item>
          <el-form-item label="下限值：" >
            <el-input v-model="searchForm.lsl" placeholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
          <el-form-item label="Cpk目标线：" >
            <el-input v-model="searchForm.cpk" placeholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
          <el-form-item label="上控制限：" >
            <el-input v-model="searchForm.ucl" placeholder="请输入内容" style="width: 220px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="物料类型：" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="materialType"
              selectType="single"
              :selectValue="searchForm.materialType"
              @handleChange='searchForm.materialType=$event'
            />
          </el-form-item>
          <el-form-item label="产线：" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="line"
              selectType="single"
              :selectValue="searchForm.line"
              @handleChange='searchForm.line=$event'
            />
          </el-form-item>
          <el-form-item label="工厂：" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="factory"
              selectType="single"
              :selectValue="searchForm.factory"
              @handleChange='searchForm.factory=$event'
            />
          </el-form-item>
          <el-form-item label="负责人：" >
            <MultipleSelect 
              productType="spc"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="review"
              selectType="single"
              :selectValue="searchForm.review"
              @handleChange='searchForm.review=$event'
            />
          </el-form-item>
          <el-form-item label="子组大小：" >
            <el-input v-model="searchForm.groupType" placeholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
          <el-form-item label="上限值：" >
            <el-input v-model="searchForm.usl" placeholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
          <el-form-item label="Mean偏移目标线：" >
            <el-input v-model="searchForm.mean" placeholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
          <el-form-item label="cov目标线：" >
            <el-input v-model="searchForm.covPurpose" placeholder="请输入内容" style="width: 220px;" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule1Status" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input type="number" v-model.number="searchForm.rule1" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule2Status" />
            <div class="flex input">
              <span>判异准则②:连续</span>
              <el-input type="number" v-model.number="searchForm.rule2" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点在中心线的同一侧</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule3Status" />
            <div class="flex input">
              <span>判异准则③:连续</span>
              <el-input type="number" v-model.number="searchForm.rule3" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点全部递增或者递减</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule4Status" />
            <div class="flex input">
              <span>判异准则④:连续</span>
              <el-input type="number" v-model.number="searchForm.rule4" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点上下交错</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule5Status" />
            <div class="flex input">
              <span>判异准则⑤:</span>
              <el-input type="number" v-model.number="searchForm.rule5" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点(K)中存在K-1个点距离中心线(同侧)大于两个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule6Status" />
            <div class="flex input">
              <span>判异准则⑥:</span>
              <el-input type="number" v-model.number="searchForm.rule6" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点(K)中存在K-1个点距离中心线(同侧)大于一个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule7Status" />
            <div class="flex input">
              <span>判异准则⑦:连续</span>
              <el-input type="number" v-model.number="searchForm.rule7" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点距离中心线(任一侧)1个标准差以内</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule8Status" />
            <div class="flex input">
              <span>判异准则⑧:连续</span>
              <el-input type="number" v-model.number="searchForm.rule8" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点距离中心线(任一侧)大于1个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule9Status" />
            <div class="flex input">
              <span> 判异准则⑨:连续</span>
              <el-input type="number" v-model.number="searchForm.rule9_a1" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点偏移</span>
              <el-input type="number" v-model.number="searchForm.rule9_a2" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>个标准差</span>
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule10Status" />
            <div class="flex input">
              <span>判异准则⑩:连续</span>
              <el-input type="number" v-model.number="searchForm.rule10_a1" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点中存在</span> 
              <el-input type="number" v-model.number="searchForm.rule10_a2" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点以上距离中心线大于</span>
              <el-input type="number" v-model.number="searchForm.rule10_a3" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>个标准差</span>
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule11Status" />
            <div class="flex input">
              <span>判异准则⑩:超出内控线 内控线上限</span>
              <el-input type="number" v-model.number="searchForm.rule11_a1" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>内控线下限</span>
              <el-input type="number" v-model.number="searchForm.rule12_a2" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="searchForm.rule12Status" />
            <div class="flex input">
              <span>判异准则⑫:连续</span>
              <el-input type="number" v-model.number="searchForm.rule12_a1" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点的均值偏移大于</span> 
              <el-input type="number" v-model.number="searchForm.rule12_a2" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>均值偏移（K）管控</span>
            </div>
          </div>
          <div class="pane-bottom">
            <div>分析控制图编码:{{searchForm.analyzeCode}}</div>
            <div style="margin-top: 10px;">
              <el-button type="success"  style="margin-left: 8px" @click="handleSearch">重新分析</el-button>
              <el-button type="success"  style="margin-left: 8px" @click="handlereason('save')">保存并结束分析</el-button>
              <!-- <el-button type="success"  style="margin-left: 8px" @click="handlereason('update')">更改数据</el-button> -->
              <el-button type="success"  @click="clickHistory">查看变更履历</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="search-box-bottom">
      <el-icon color="#fff" size="22" v-show="!isExpand" @click="expandSearch(true)"><ArrowDown /></el-icon>
      <el-icon color="#fff" size="22" v-show="isExpand" @click="expandSearch(false)"><ArrowUp /></el-icon>
    </div>
    <ComDialog ref="historyRefDialog" dialogTitle="履历" popupWidth="80%" :hiddenFooter="true">
      <HistoryTable ref="historyRef" />
    </ComDialog>
    <ComDialog ref="reasonRef" dialogTitle="原因" popupWidth="60%" @confirmEmitBtn="confirmReason">
      <el-form label-width="120px" style="padding: 20px 20px 0 20px;">
        <el-form-item label="原因" required>
          <el-input v-model="searchForm.backup" placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
        </el-form-item>
      </el-form>
    </ComDialog>
  </div>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons'
import ComDialog from '@/components/comDialog/index.vue'
import HistoryTable from './components/historyTable.vue'
import MultipleSelect from '@/components/multipleSelect/index.vue'
import config from '@/utils/system/config'
import {updateSPC,SpcProductSelect} from '@/api/spc/analysis'
import { ElMessage } from "element-plus";
defineExpose({getData })
const emit = defineEmits(['handleSearch','closeAllDialog'])
// parmas
const searchForm = reactive({})
const reasonText = ref('')
const historyRefDialog = ref(false) // 变更履历弹窗
const historyRef = ref(null) // 变更履历组件
const reasonRef = ref(false)
const isExpand = ref(true)
const inputSelect = config.spcSelect
const options = ref({})
// function
function handleSearch() {
  emit('handleSearch', searchForm)
}
function getData(data) {
  Object.assign(searchForm, { ...data })
  getInputSelect()
  handleSearch()
}
function handlereason(type) {
  reasonRef.value.visible = true
}
function confirmReason() {
  updateSPC({input: searchForm}).then(res => {
    if(res.data.spcProductTestItemUpdate.success) {
      reasonRef.value.visible = false
      ElMessage({ message: '保存成功', type: 'success'})
      emit('closeAllDialog')
    } else {
      ElMessage.error('保存失败')
    }
  })
}
async function clickHistory() {
  historyRefDialog.value.visible = true
  console.log(searchForm)
  await nextTick()
  historyRef.value.getData({analyzeCode: searchForm.analyzeCode})
}
function expandSearch(val) {
  isExpand.value = val
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

<style lang="scss" scoped>
.search-box {
  width: 100%;
  background: #2c2d31;
}
.height {
  min-height: 80px;
  padding: 10px;
}
.maxHeight {
  height: 0px;
  overflow: hidden;
}
.search-box-bottom {
  background: #2d3340;
  width: 100%;
  height: 25px;
}
.pane-input {
  margin-bottom: 8px;
  margin-left: 15px;
  align-items: center;
  color: #fff;
  font-size: 12px;
  .input {
    align-items: center;
    margin-left: 8px;
  }
}
.pane-bottom {
  padding-right: 25px;
  text-align: right;
}
.form {
  :deep(.el-form-item__label), :deep(.el-form-item__content), :deep(.el-checkbox__label),:deep(.el-radio__label){
    color: #fff;
  }
}
:deep(.el-radio__input.is-checked+.el-radio__label), :deep(.el-checkbox__input.is-checked+.el-checkbox__label){
  color: var(--system-primary-color)!important;
  
}
:deep(.el-radio__input.is-checked .el-radio__inner), :deep(.el-checkbox__input.is-checked .el-checkbox__inner), :deep(.el-button--success){
  border-color: var(--system-primary-color)!important;;
  background: var(--system-primary-color)!important;
}
</style>