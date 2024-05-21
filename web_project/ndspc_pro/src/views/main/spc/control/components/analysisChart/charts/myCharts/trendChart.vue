<template>
  <div class="box">
    <Chart ref="myChart" :option="options" />
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import Chart from '@/components/charts/index.vue'
import option from './modules/trend.js'
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
  }
</style>