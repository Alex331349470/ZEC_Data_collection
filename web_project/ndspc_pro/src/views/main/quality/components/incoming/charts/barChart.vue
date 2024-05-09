<template>
  <div class="box" :style="{height: boxHeight}">
    <Chart :option="options" />
  </div>
</template>

<script setup>
  import { defineComponent, onBeforeUnmount, onMounted, reactive } from 'vue'
  import Chart from '@/components/charts/index.vue'
  import option from './modules/bar'
  const datar = [100,200,300,400,500,600,700,800,900,1000,1100,1200]
  const datar1 = [130,230,300,400,500,600,700,800,900,1000,1100,1200]
  const options = reactive(option)
  const props = defineProps({
    boxHeight: {
      type: String,
      default: '350px'
    }
  })
  onMounted(() => {
    options.series[0].data = datar
  })
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    background: #c6d3df;
    overflow: hidden;
  }
</style>