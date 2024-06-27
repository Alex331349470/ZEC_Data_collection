<template>
  <div class="card-box">
    <div class="card-list">
      <div class="card" v-loading="loading">
        <div class="card-title">
          <div class="left">
            <div class="tip-dot" />
            <span class="name">SPC异常点整体看板</span>
          </div>
          <!-- <div style="display: flex; align-items: center;">
            <el-icon @click="handleOpen" style="margin-left: 10px"><Rank /></el-icon>
          </div> -->
        </div>
        <BarChart v-if="total !== 0" ref="chartRef"/>
        <el-empty v-else />
        <ComDialog ref="chartDialogRef" dialogTitle="SPC异常点整体看板" :fullScreen="true" :hiddenFooter="true">
          <div class="charBox">
            <div style="padding-bottom: 50px">
              <BarChart ref="chartRef" />
            </div>
            <div class="pagination">
              <Pagination :page_num="searchForm.pageNum"
                :page_size="searchForm.pageSize"
                @update:pageChange="pageChange"
                :total="total"
              />
            </div>
          </div>
        </ComDialog>
      </div>
      <div class="pagination black">
        <Pagination :page_num="searchForm.pageNum"
          :page_size="searchForm.pageSize"
          @update:pageChange="pageChange"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref,reactive, nextTick } from 'vue'
import {Rank} from '@element-plus/icons-vue'
import BarChart from './barChart.vue'
import ComDialog from '@/components/comDialog/index.vue'
import Pagination from '@/components/pagination/index.vue'
import {SpcProductAbnormalBoard} from '@/api/spc/signboard'
defineExpose({ handleSearch })
const searchForm = reactive({
  pageSize: 10,
  pageNum: 1
})
const dateDemintion = ref('')
const kongjianDemintion = ref('')
const total = ref(0)
const list = reactive([{ id: 1, name: 'SPC异常点整体看板'}])
const loading = ref(true)
const chartDialogRef = ref(false)
const chartsRef = ref(null)
const chartRef = ref(null)
const handleClose = () => {
  chartDialogRef.value.visible = false
}
const chartData = ref(null)
const defaultForm = ref(null)
const handleOpen = () => {
  chartDialogRef.value.visible = true
  handleSearch(defaultForm.value)
}
async function handleSearch(parmas) {
  defaultForm.value = parmas
  loading.value = true
  nextTick// 等待 Vue 渲染完成后再进行操作
  await nextTick()
  SpcProductAbnormalBoard({input: {...searchForm, ...parmas.searchForm}}).then(async(res) => {
    const radioParmas = parmas.radioParmas
    dateDemintion.value = transformString(radioParmas.dateDemintion, 'AbnormalData')
    kongjianDemintion.value = transformString(radioParmas.kongjianDemintion, 'AbnormalData')
    total.value = res.data.spcProductAbnormalBoard[dateDemintion.value][kongjianDemintion.value].total
    await nextTick()
    chartData.value = transformData(res.data.spcProductAbnormalBoard[dateDemintion.value][kongjianDemintion.value])
    if(total.value === 0) {
      loading.value = false
      return
    }
    chartRef.value.initChart(chartData.value)
    loading.value = false
  }).catch(error => {
    console.log(error)
    loading.value = false
  })
}
// 数据处理
function transformData(inputData) {
  const yAxis_data = []
  const xAxis_data = []
  const data = []
  const yAxisMap = {}
  inputData.list.forEach(item => {
    const yAxis_str = getAxisStr(item)
    if (!yAxisMap[yAxis_str]) {
      yAxisMap[yAxis_str] = { xAxis_data: [], data: [] };
    }
    yAxisMap[yAxis_str].xAxis_data.push(kongjianDemintion.value.split('AbnormalData')[0])
    yAxisMap[yAxis_str].data.push(item.poorAmount)
  })
  for (const day in yAxisMap) {
    yAxis_data.push(day);
    xAxis_data.push(yAxisMap[day].xAxis_data);
    data.push(yAxisMap[day].data);
  }
  return { yAxis_data, xAxis_data, data }
}
// 字符传转换
function transformString(str, addStr) {
  const newStr = str.split('Demintion')
  return newStr[0] + addStr
}
// 获取坐标轴字符串
function getAxisStr(item) {
  const str = dateDemintion.value.split('AbnormalData')[0]
  let newStr = ''
  if(str === "year") {
    newStr = item.year +'年'
  } else if(str === "season") {
    newStr = item.year +'年'+ item.season +'季度'
  } else if(str === "month") {
    newStr = item.year +'年'+ item.season +'季度'+ item.month +'月'
  } else if(str === "week") {
    newStr = item.year +'年'+ item.season +'季度'+ item.month +'月'+ item.week +'周'
  } else if(str === "day") {
    newStr = item.day
  }
  return newStr
}
function pageChange(parmas) {
  searchForm.pageNum = parmas.page_num
  searchForm.pageSize = parmas.page_size
  handleSearch(defaultForm.value)
}
</script>

<style lang="scss" scoped>
  .card-box {
    width: 100%;
    background: #2c2d31;
    position: relative;
  }
  .card-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 60px;
    overflow: hidden;
  }
  .pagination {
    position: fixed;
    bottom: 0;
    width: calc(100% - 30px);
    background: #ffffff;
    padding-left: 25px;
  }
  :deep(.el-pagination__total), :deep(.el-pagination__goto), :deep(.el-pagination__classifier) {
    color: #fff;
  }
  .black {
    background: #2c2d31;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .card{
    border-radius: 4px;
    width: 100%;
    background-color: #c6d3df;
    margin: 5px;
    box-shadow: 3px 3px 10px 0 rgba(58, 59, 69, 0.15);
    font-size: 14px;
    &-title {
      margin: 10px;
      display: flex;
      justify-content: space-between;
      .left {
        text-align: left;
        display: flex;
        align-items: center;
        .tip-dot {
          height: 9px;
          width: 18px;
          background: #7c260b;
          margin: 0 10px;
          }
        }
      }
    }
  .charBox {
    width: 100%;
    height: 400px;
  }
</style>