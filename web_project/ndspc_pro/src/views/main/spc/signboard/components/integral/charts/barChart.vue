<template>
  <div class="box">
    <Chart :option="options" />
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, reactive } from 'vue'
import Chart from '@/components/charts/index.vue'
import option from './modules/bar'
export default defineComponent({
  components: { Chart },
  setup() {
    const datar = [100,200,300,400,500,600,700,800,900,1000,1100,1200]
    const datar1 = [130,230,300,400,500,600,700,800,900,1000,1100,1200]
    const options = reactive(option)
    onMounted(() => {
      options.series[0].data = datar
    })
    const initChart = () => {
      options.series[0].data = datar1
    }
    return {
      options,
      initChart
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