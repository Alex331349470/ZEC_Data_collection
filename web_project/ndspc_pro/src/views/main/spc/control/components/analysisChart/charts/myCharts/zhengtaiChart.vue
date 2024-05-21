<template>
  <div class="box">
    <Chart ref="myChart" :option="options" />
    <div class="back_writhe">拟合优度检验</div>
    <el-row>
      <el-col :span="8">
        <div class="back_writhe">Anderson-Darling</div>
      </el-col>
      <el-col :span="8">
        <div>A2</div>
        <div>模拟的P值</div>
      </el-col>
      <el-col :span="8">
        <div>0.8988</div>
        <div>0.7546</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import Chart from '@/components/charts/index.vue'
import option from './modules/zhengtai'
export default defineComponent({
  components: { Chart },
  setup() {
    let timer = null;
    const options = ref(null)
    // 模拟异步请求
    timer = setTimeout(() => {
      options.value = reactive(option)
    },1000)
    // 组件销毁时清除定时器
    onBeforeUnmount(() => {
      clearInterval(timer)
      timer = null;
    })
    return {
      options
    }
  }
})
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 350px;
    background: #c6d3df;
    overflow: hidden;
    .chart {
      height: 80%;
    }
    font-weight: bold;
  }
  .back_writhe {
    background: rgba(255, 255, 255, 0.5);
    padding: 5px;
    width: 100%;
    text-align: left;
    margin: 0 0 5px 5px;
  }

</style>