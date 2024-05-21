<template>
  <div class="box" :style="{height: boxHeight}">
    <el-empty :image-size="100" v-if="chartData.yAxis_data == null" />
    <Chart :option="options" @onSelect="onSelect" v-else />
  </div>
</template>

<script setup>
  import { defineComponent, onBeforeUnmount, onMounted, reactive,ref } from 'vue'
  import Chart from '@/components/charts/index.vue'
  import {getOption} from './modules/bar.js'
  const options = ref(null)
  const emit = defineEmits(['changeSelect'])
  const props = defineProps({
    boxHeight: {
      type: String,
      default: '350px'
    },
    chartData: {
      type: Object,
      default: {}
    },
    isExport: {
      type: Boolean,
      default: false
    }
  })
  onMounted(() => {
    if(props.chartData.yAxis_data) {
      options.value = getOption(props.chartData, props.isExport)
    }
  })
  function onSelect(parmas) {
    emit('changeSelect', parmas)
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    background: #c6d3df;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
</style>