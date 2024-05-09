<template>
  <div class="search-box">
    <el-form ref="form" :model="searchForm" label-width="140px" :class="isExpand ? 'height' : 'maxHeight'"  label-position="left" size="small">
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
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="flex pane-input">
            <el-checkbox v-model="checked1" />
            <div class="flex input">
              <span>判异准则①:1个点距离中心线大于</span>
              <el-input v-model="searchForm.bianma" placeholder="请输入内容"  style="width: 80px;margin: 0 8px;"></el-input>
              <span>个标准差</span> 
            </div>
          </div>
          <div class="pane-bottom">
            <div>分析控制图编码:FQC-20230617-0005</div>
            <div style="margin-top: 10px;">
              <el-button type="success"  style="margin-left: 8px">重新分析</el-button>
              <el-button type="success"  style="margin-left: 8px">保存并结束分析</el-button>
              <el-button type="success"  style="margin-left: 8px">更改数据</el-button>
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
  </div>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons'
import ComDialog from '@/components/comDialog/index.vue'
import HistoryTable from './components/historyTable.vue'
// parmas
const searchForm = ref({
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
const historyRef = ref(false)
const isExpand = ref(true)
const DateOptions = ref(['年', '季', '月', '周', '日'])
// function
function expandSearch(val) {
  isExpand.value = val
}
function clickHistory() {
  historyRef.value.visible = true
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
  margin-bottom: 10px;
  margin-left: 15px;
  align-items: center;
  color: #fff;
  .input {
    align-items: center;
    margin-left: 8px;
    font-size: 12px;
  }
}
.pane-bottom {
  padding-right: 25px;
  text-align: right;
}
:deep(.el-form-item__label), :deep(.el-form-item__content), :deep(.el-checkbox__label),:deep(.el-radio__label){
  color: #fff;
}
:deep(.el-radio__input.is-checked+.el-radio__label), :deep(.el-checkbox__input.is-checked+.el-checkbox__label){
  color: var(--system-primary-color)!important;
  
}
:deep(.el-radio__input.is-checked .el-radio__inner), :deep(.el-checkbox__input.is-checked .el-checkbox__inner), :deep(.el-button--success){
  border-color: var(--system-primary-color)!important;;
  background: var(--system-primary-color)!important;
}
</style>