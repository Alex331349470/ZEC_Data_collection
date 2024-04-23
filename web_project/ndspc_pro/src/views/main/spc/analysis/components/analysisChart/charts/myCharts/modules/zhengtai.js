const colors = ['#01a2d9', '#11586e', '#6c97aa'];
let data={
  x:[
    -3,-2.6842105263157894,-2.3684210526315788, 
    -2.052631578947368,-1.7368421052631575,-1.421052631578947,-1.1052631578947363, 
    -0.7894736842105258,-0.47368421052631526,-0.15789473684210475,
    0.15789473684210575,0.47368421052631626,0.7894736842105268,
    1.1052631578947372,1.4210526315789478,1.7368421052631584,
    2.052631578947369, 2.3684210526315796,2.6842105263157903],
  y:[
    0.0044318484119380075, 0.010873446008403894,   0.02414573124668899,
    0.04852933916733306,   0.08827937454560608, 0.14534663197630093,
    0.21659157163219764,   0.292125176410827, 0.3566048764304543,
    0.394000182232257,   0.39400018223225697, 0.3566048764304541,
    0.29212517641082686,  0.21659157163219742, 0.14534663197630074,
    0.08827937454560594,   0.04852933916733297, 0.024145731246688947,
    0.010873446008403865],
}
const option = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },        
  legend: {
    data: ['Evaporation', 'Precipitation', 'Temperature']
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: data.x
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'USL',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'red'
        }
      },
      axisLabel: false
    },
    {
      type: 'value',
      name: 'LSL',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'red'
        }
      },
      axisLabel: false
    }
  ],
  series: [
    {
      name: 'USL',
      type: 'bar',
      data: data.y,
      itemStyle: {
        borderColor: 'black', // 设置边框颜色
        borderWidth: 0.5 // 设置边框宽度
      },
      barCategoryGap: '0%',
      barGap: '0%',
    },
    {
      name: 'LSL',
      smooth: true,
      type: 'line',
      symbol: 'none',
      yAxisIndex: 1,
      data: data.y
    }
  ]
};
export default option