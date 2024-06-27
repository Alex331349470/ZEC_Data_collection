<template>
  <div style="text-align: left">
    <el-select popper-class="select-popover-class" :style="{'width': inputWidth}"
      :modelValue="selectValue"
      :placeholder="placeholder"
      @click="openDialog"
    />
    <ComDialog ref="dialogRef" dialogTitle="判异准则" popupWidth="60%"  @handleClose="handleClose" @confirmEmitBtn="confirmBtn">
      <div class="rule-box">
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
      </div>
    </ComDialog>
  </div>
</template>

<script setup>
  import { Search } from '@element-plus/icons-vue'
  import { reactive,ref} from 'vue'
  import config from '@/utils/system/config'
  import ComDialog from '@/components/comDialog/index.vue'
  const props = defineProps({
    selectValue: {
      type: String,
      default: ''
    },
    inputWidth: {
      type: String,
      default: '200px'
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  })
  const emit = defineEmits(['handleChange'])
  const options = ref([])
  const dialogRef = ref(false)
  const selectValue = ref('已选择12个判异准则')
  const searchForm = reactive({...config.default_rule})
  function openDialog() {
    dialogRef.value.visible = true
  }
  function handleClose() {
    dialogRef.value.visible = false
  }
  function confirmBtn() {
    let trueCount = 0
    for (let key in searchForm) {
      if (typeof searchForm[key] === "boolean" && searchForm[key] === true) {
        trueCount++
      }
    }
    selectValue.value = `已选择${trueCount}个判异准则`
    dialogRef.value.visible = false
    emit('handleChange', searchForm)
  }
</script>
<style lang="scss" scoped>
.rule-box {
  padding: 20px;
}
.pane-input {
  margin-bottom: 8px;
  margin-left: 15px;
  align-items: center;
  font-size: 12px;
  .input {
    align-items: center;
    margin-left: 8px;
  }
}
</style>
