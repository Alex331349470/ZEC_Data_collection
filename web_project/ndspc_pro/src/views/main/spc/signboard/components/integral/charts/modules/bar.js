export function getOption(chartData) {
  const title = [];
  const singleAxis = [];
  const series = [];
  const maxValue = Math.max(...chartData.data.flat()) //获取数据中的最大值
  chartData.yAxis_data.forEach(function (day, idx) {
    console.log({top: (idx * 100) / chartData.yAxis_data.length + 5 + '%',
      height: chartData.yAxis_data.length <=2 ? 100 / chartData.yAxis_data.length - 30 + '%': chartData.yAxis_data.length < 5 ? 100 / chartData.yAxis_data.length - 15 + '%' : 100 / chartData.yAxis_data.length - 10 + '%' ,})
    title.push({
      textBaseline: 'middle',
      top: ((idx + 0.5) * 100) / chartData.yAxis_data.length + '%',
      text: day
    });
    singleAxis.push({
      left: 150,
      type: 'category',
      boundaryGap: false,
      data: chartData.xAxis_data[idx],
      top: (idx * 100) / chartData.yAxis_data.length + 5 + '%',
      height: chartData.yAxis_data.length <=2 ? 100 / chartData.yAxis_data.length - 30 + '%': chartData.yAxis_data.length < 5 ? 100 / chartData.yAxis_data.length - 15 + '%' : 100 / chartData.yAxis_data.length - 10 + '%' ,
      nameGap: 50,
      axisLabel: {
        interval: 0
      }
    });
    series.push({
      singleAxisIndex: idx, 
      coordinateSystem: 'singleAxis',
      type: 'scatter',
      data: chartData.data[idx],
      symbolSize: function (dataItem) {
        return getSymbolSize(dataItem)
      }
    })
  })
  const getSymbolSize = (value) => {
    return (value / maxValue) * 40;
  }
  const option = {
    tooltip: {
      position: 'left'
    },
    backgroundColor: '#FFFFFF',
    title: title,
    singleAxis: singleAxis,
    series: series
  }
  console.log(option)
  return option
}