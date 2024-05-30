<template>
  <div class="card-box">
    <div class="card-list">
      <div class="card" v-loading="loading">
        <div class="card-title">
          <div class="left">
            <div class="tip-dot" />
            <span class="name">SPC异常点整体看板</span>
          </div>
          <div style="display: flex; align-items: center;">
            <el-icon @click="handleOpen" style="margin-left: 10px"><Rank /></el-icon>
          </div>
        </div>
        <BarChart />
        <ComDialog ref="chartDialogRef" dialogTitle="SPC异常点整体看板" :fullScreen="true" :hiddenFooter="true">
          <div class="charBox">
            <div style="padding-bottom: 50px">
              <BarChart v-if="showChart"/>
            </div>
            <div class="pagination">
              <Pagination :page_num="searchForm.pageNum"
                :page_size="searchForm.pageSize"
                @update:getData="handleSearch"
                :total="total"
              />
            </div>
          </div>
        </ComDialog>
      </div>
      <div class="pagination black">
        <Pagination :page_num="searchForm.pageNum"
          :page_size="searchForm.pageSize"
          @update:getData="handleSearch"
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
defineExpose({ handleSearch })
const searchForm = ref({
  pageSize: 2,
  pageNum: 1
})
const total = ref(10)
const list = reactive([{ id: 1, name: 'SPC异常点整体看板'}])
const loading = ref(true)
const chartDialogRef = ref(false)
const showChart = ref(false)
const handleClose = () => {
  chartDialogRef.value.visible = false
  showChart.value = false
}
const handleOpen = () => {
  chartDialogRef.value.visible = true
  nextTick(() => {
    showChart.value = true
  })
}
function handleSearch(parmas) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
  console.log(parmas)
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