<template>
  <div class="card">
    <div class="card-title">
      <div class="left">
        <div class="tip-dot" />
        <span class="name">{{ row.name }}</span>
      </div>
      <div style="display: flex; align-items: center;">
        <el-button size="small" type="info" v-if="row.isExport">全部导出</el-button>
        <el-icon @click="handleOpen" style="margin-left: 10px"><Rank /></el-icon>
      </div>
    </div>
    <BarChart />
    <el-dialog v-model="dialogVisible" width="80%" :before-close="handleClose" :close-on-click-modal="false">
      <div class="charBox">
        <div class="card-title">
          <div class="left">
            <div class="tip-dot" />
            <span class="name">{{ row.name }}</span>
          </div>
          <div style="display: flex; align-items: center;">
          <el-button size="small" type="info" v-if="row.isExport">全部导出</el-button>
        </div>
        </div>
        <BarChart v-if="showChart"/>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="js">
import { defineComponent, ref, nextTick } from 'vue'
import {Rank} from '@element-plus/icons-vue'
import BarChart from './barChart.vue'
export default defineComponent({
  components: {Rank, BarChart},
  props: {
    row: {
      type: Object,
      default: () => {
        return {

        }
      }
    }
  },
  setup(props) {
    let dialogVisible = ref(false)
    let showChart = ref(false)
    const handleClose = () => {
      dialogVisible.value = false
      showChart.value = false
    }
    const handleOpen = () => {
      dialogVisible.value = true
      nextTick(() => {
        showChart.value = true
      })
    }
    return {
      dialogVisible,
      handleOpen,
      handleClose,
      showChart
    }
  }
})
</script>

<style lang="scss" scoped>
  .card{
    border-radius: 4px;
    height: 400px;
    width: calc(33% - 12px);
    background-color: #c6d3df;
    margin: 5px;
    box-shadow: 3px 3px 10px 0 rgba(58, 59, 69, 0.15);
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
  :deep(.el-button--info) {
    border-color: #014D64!important;
    background: #014D64!important;
  }
  @media screen and ( max-width: 1200px ) {
    .card {
      width: calc(50% - 26px);
    }
  }
  @media screen and ( max-width: 500px ) {
    .card {
      width: calc(100% - 26px);
    }
  }
</style>