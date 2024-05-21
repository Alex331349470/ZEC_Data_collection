<template>
  <div class="search-box">
    <el-form ref="form" class="form" :model="searchForm" label-width="120px" :class="isExpand ? 'height' : 'maxHeight'" label-position="left" size="small">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item label="物料编码：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="检测项目：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="工厂：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="车间：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="工序：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="特性类型：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="控制图类型：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="分析控制图编码：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="下限值：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="Cpk目标线：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="上控制限：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="物料名称：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="检测项目名称：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="工厂名称：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="产线：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="物料类型：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="特性类型：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="负责人：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="子组大小：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="上限值：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="Mean偏移目标线：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="cov目标线：" >
            <el-input v-model="searchForm.bianma" placeholder="请输入内容" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则②:连续</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点在中心线的同一侧</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则③:连续</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点全部递增或者递减</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则④:连续</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点上下交错</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则⑤:</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点(K)中存在K-1个点距离中心线(同侧)大于两个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则⑥:</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点(K)中存在K-1个点距离中心线(同侧)大于一个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则⑦:连续</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点距离中心线(任一侧)1个标准差以内</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则⑧:连续</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点距离中心线(任一侧)大于1个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span> 判异准则⑨:连续</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点偏移</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>个标准差</span>
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则⑩:连续</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点中存在</span> 
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>点以上距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>个标准差</span>
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则⑩:超出内控线 内控线上限</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
              <span>内控线下限</span>
              <el-input v-model="searchForm.bianma" placeholder="输入内容"  style="width: 65px;margin: 0 8px;"></el-input>
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>使用输入的控制限</span>
            </div>
          </div>
          <div class="pane-bottom">
            <div>分析控制图编码:FQC-20230617-0005</div>
            <div style="margin-top: 10px;">
              <el-button type="success"  style="margin-left: 8px" @click="handleSearch">重新分析</el-button>
              <el-button type="success"  style="margin-left: 8px" @click="handlereason('save')">保存并结束分析</el-button>
              <el-button type="success"  style="margin-left: 8px" @click="handlereason('update')">更改数据</el-button>
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
    <ComDialog ref="historyRef" dialogTitle="履历" popupWidth="80%" :hiddenFooter="true">
      <HistoryTable :tableData="historyList" />
    </ComDialog>
    <ComDialog ref="reasonRef" dialogTitle="原因" popupWidth="60%" @confirmEmitBtn="confirmReason">
      <el-form label-width="120px" style="padding: 20px 20px 0 20px;">
        <el-form-item label="原因" required>
          <el-input v-model="reasonText" placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
        </el-form-item>
      </el-form>
    </ComDialog>
  </div>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons'
import ComDialog from '@/components/comDialog/index.vue'
import HistoryTable from './components/historyTable.vue'
const emit = defineEmits(['handleSearch'])
// parmas
const searchForm = reactive({
  timeArea: 2,
  dateArea: ['年', '月'],
  kaifaArea: 1,
  startTime: '',
  endTime: '',
  gongchang: '',
  jisuanArea: ''
})
const historyList = [
  {bianma: 'abc2133241', status: '分析中', bianNum: '1' },
  {bianma: 'abc2133242', status: '分析中', bianNum: '2' }
]
const reasonText = ref('')
const historyRef = ref(false)
const reasonRef = ref(false)
const isExpand = ref(true)
const type = ref('')
const DateOptions = ref(['年', '季', '月', '周', '日'])
// onmounted
onMounted(() => {
  handleSearch()
})
// function
function handleSearch() {
  emit('handleSearch', searchForm)
}
function handlereason(type) {
  reasonRef.value.visible = true
  type.value = type
}
function confirmReason() {
  reasonRef.value.visible = false
  if (type ==='save') {
    emit('handleSearch', searchForm)
  } else if (type === 'update') {
    emit('handleSearch', searchForm)
  }
}
function clickHistory() {
  historyRef.value.visible = true
}
function expandSearch(val) {
  isExpand.value = val
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
  margin-bottom: 14px;
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