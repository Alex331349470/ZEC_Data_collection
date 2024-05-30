export function getOption(chartData) {
  const title = [];
  const singleAxis = [];
  const series = [];
  chartData.days.forEach(function (day, idx) {
    title.push({
      textBaseline: 'middle',
      top: ((idx + 0.5) * 100) / chartData.days.length + '%',
      text: day
    });
    singleAxis.push({
      left: 150,
      type: 'category',
      boundaryGap: false,
      data: chartData.hours,
      top: (idx * 100) / chartData.days.length + 5 + '%',
      height: chartData.days.length <=2 ? 100 / chartData.days.length - 30 + '%': chartData.days.length < 5 ? 100 / chartData.days.length - 15 + '%' : 100 / chartData.days.length - 10 + '%' ,
      nameGap: 50,
      axisLabel: {
        interval: 0
      }
    });
    series.push({
      singleAxisIndex: idx,
      coordinateSystem: 'singleAxis',
      type: 'scatter',
      data: chartData.data,
      symbolSize: function (dataItem) {
        return dataItem >= 100 ? 20 : dataItem;
      }
    })
  })
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