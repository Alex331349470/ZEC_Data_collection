<template>
  <div class="box" :style="{height: boxHeight}">
    <el-empty :image-size="100"  v-if="isEmpty"/>
    <Chart :option="options" @onSelect="onSelect" v-else />
  </div>
</template>

<script setup>
  import { defineComponent, onBeforeUnmount, onMounted, reactive,ref } from 'vue'
  import Chart from '@/components/charts/index.vue'
  import {getOption} from './modules/bar.js'
  const emit = defineEmits(['changeSelect'])
  defineExpose({ initChart })
  const props = defineProps({
    boxHeight: {
      type: String,
      default: '350px'
    },
    isExport: {
      type: Boolean,
      default: false
    }
  })
  const options = ref(null)
  const isEmpty = ref(false)
  function initChart(data) {
    if(!data) {
      isEmpty.value = true
      return
    } else {
      isEmpty.value = false
    }
    options.value = getOption(data, props.isExport)
  }
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