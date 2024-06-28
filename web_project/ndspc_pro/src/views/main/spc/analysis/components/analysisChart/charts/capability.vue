<template>
  <div class="card">
    <div class="card-title">
      <div class="left">
        <div class="tip-dot" />
        <span class="name">{{ row.name }}</span>
      </div>
    </div>
    <div class="card-box">
      <el-row :gutter="40">
        <el-col :span="7">
          <div class="back_writhe">过程汇总</div>
          <el-row :gutter="20">
            <el-col :span="14">
              <div class="back_writhe">
                <div>上规格线</div>
                <div>下规格线</div>
                <div>批次数量</div>
                <div>样本均值</div>
                <div>组内sigma</div>
                <div>总sigma</div>
                <div>稳定指标</div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="back_none">
                <div>{{chartData.usl}}</div>
                <div>{{chartData.lsl}}</div>
                <div>{{chartData.amount}}</div>
                <div>{{chartData.sampleAvg}}</div>
                <div>{{chartData.sigmaIn}}</div>
                <div>{{chartData.sigmaTotal}}</div>
                <div>{{chartData.stablilityIndex}}</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <div class="back_writhe">组内sigma能力</div>
          <el-row :gutter="20">
            <el-col :span="14">
              <div class="back_writhe">
                <div>Cp</div>
                <div>Cpu</div>
                <div>Cpl</div>
                <div>Cpk</div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="back_none">
                <div>{{chartData.cp}}</div>
                <div>{{chartData.cpu}}</div>
                <div>{{chartData.cpl}}</div>
                <div>{{chartData.cpk}}</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <div class="back_writhe">总sigma能力</div>
          <el-row :gutter="20">
            <el-col :span="14">
              <div class="back_writhe">
                <div>Pp</div>
                <div>Ppu</div>
                <div>PpL</div>
                <div>Ppk</div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="back_none">
                <div>{{chartData.pp}}</div>
                <div>{{chartData.ppu}}</div>
                <div>{{chartData.ppl}}</div>
                <div>{{chartData.ppk}}</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="7">
          <div class="back_writhe">不合格</div>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="5">
          <div class="back_writhe">
            <div>对应部分</div>
            <div>低于下规格线</div>
            <div>高于上规格线</div>
            <div>规格外合计</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="back_writhe text-right">观测百分比</div>
          <div class="back_none1">
            <div>{{chartData.poorBelowRate}}%</div>
            <div>{{chartData.poorAboveRate}}%</div>
            <div>{{chartData.poorTotalRate}}%</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="back_writhe text-right">期望组内百分比</div>
          <div class="back_none1">
            <div>{{chartData.sigmaInBelowRate}}%</div>
            <div>{{chartData.sigmaInAboveRate}}%</div>
            <div>{{chartData.sigmaInTotalRate}}%</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="back_writhe text-right">期望总体百分比</div>
          <div class="back_none1">
            <div>{{chartData.sigmaTotalBelowRate}}%</div>
            <div>{{chartData.sigmaTotalAboveRate}}%</div>
            <div>{{chartData.sigmaTotalAllRate}}%</div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">
          <div class="back_writhe">cov</div>
        </el-col>
        <el-col :span="5">
          <div class="back_none text-left">{{chartData.cov}}</div>
        </el-col>
        <el-col :span="5">
          <div class="back_writhe">Mean偏移</div>
        </el-col>
        <el-col :span="6">
          <div class="back_none">{{chartData.mean}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const props = defineProps({
  row: {
    type: Object,
    default: {}
  }
})
defineExpose({ refreshData })
const chartData = ref({})
const defautkey = ['poorBelowRate', 'poorAboveRate', 'poorTotalRate', 'sigmaInBelowRate', 'sigmaInAboveRate', 'sigmaInTotalRate', 'sigmaTotalBelowRate', 'sigmaTotalAboveRate', 'sigmaTotalAllRate', 'amount']
function refreshData(data) {
  for (const key in data) {
    if(typeof data[key] === 'number' && !defautkey.includes(key)) {
      data[key] = data[key].toFixed(2)
    }
  }
  chartData.value = data
}
</script>

<style lang="scss" scoped>
  .card{
    border-radius: 4px;
    height: 400px;
    width: 100%;
    background-color: #c6d3df;
    margin: 5px;
    box-shadow: 3px 3px 10px 0 rgba(58, 59, 69, 0.15);
    &-title {
      padding: 10px;
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
  .back_writhe {
    background: rgba(255, 255, 255, 0.5);
    padding: 5px;
    width: 100%;
    text-align: left;
    margin: 0 0 5px 5px;
    >div {
      margin-bottom: 5px;
    }
  }
  .back_none {
    padding: 5px;
    width: 100%;
    text-align: right;
    margin: 0 0 5px 5px;
    >div {
      margin-bottom: 5px;
    }
  }
  .back_none1 {
    margin-top: -5px;
    text-align: right;
    >div {
      margin-bottom: 5px;
    }
  }
  .text-right {
    text-align: right;
  }
  .text-left {
    text-align: left;
  }
</style>