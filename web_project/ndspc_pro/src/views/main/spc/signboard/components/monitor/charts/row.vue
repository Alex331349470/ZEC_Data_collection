<template>
  <div class="card">
    <div class="card-title">{{ row.name }}</div>
    <div class="charBox" ref="boxRef" v-for="(item, index) in row.children" :key="index">
      <div class="tip">{{item.name}}</div>
      <BarChart :boxWidth="boxWidth" v-if="boxWidth"/>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted,nextTick } from 'vue'
import BarChart from './charts.vue'
const props = defineProps({
  row: {
    type: Object,
    default: {}
  },
})
let boxWidth = ref([])
let boxRef = ref([])
onMounted(() => {
  nextTick(() => {
    let refs = Array.from(boxRef)
    boxWidth.value = refs.map(ref => ref.offsetWidth) // 获取所有div的宽度
    console.log('boxWidth', boxWidth.value)
  })
})
</script>

<style lang="scss" scoped>
.card:nth-child(3) {
    width: calc(100% - 840px)!important;
    max-width: unset!important;
    min-width: 35%;
    overflow: auto;
  }   
  .card{
    border-radius: 4px;
    margin: 5px;
    width: 400px;
    max-width: 28%;
    box-shadow: 3px 3px 10px 0 rgba(58, 59, 69, 0.15);
    &-title {
      text-align: center;
      background: #10904a;
      padding: 5px;
      color: #fff;
      margin-bottom: 10px;
    }
  }
  .charBox {
    padding: 5px;
    background-color: #ebffea;
    margin-bottom: 10px;
  }
  .tip {
    padding: 4px;
    background: #2fc06f;
    width: 70px;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
</style>