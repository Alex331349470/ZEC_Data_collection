export function getOption() {
  // prettier-ignore
  const hours = ['P03',"B02","B03","A01","A02","A03","A04","A05","A06","A07","A08","A09"];
  // prettier-ignore
  const days = ['2023年7月', '2023年6月', '2023年5月','2023年4月', '2024年3月', '2025年2月', '2023年1月','2023年7月', '2023年6月', '2023年5月','2023年4月', '2023年3月', '2023年2月', '2023年1月']
  // prettier-ignore
  const data = [6,3,4,6,34,4,12,43,12,4,6,7]
  const title = [];
  const singleAxis = [];
  const series = [];
  days.forEach(function (day, idx) {
    title.push({
      textBaseline: 'middle',
      top: ((idx + 0.5) * 100) / days.length + '%',
      text: day
    });
    singleAxis.push({
      left: 150,
      type: 'category',
      boundaryGap: false,
      data: hours,
      top: (idx * 100) / days.length + 5 + '%',
      height: 100 / days.length - 10 + '%',
      nameGap: 50,
      axisLabel: {
        interval: 0
      }
    });
    series.push({
      singleAxisIndex: idx,
      coordinateSystem: 'singleAxis',
      type: 'scatter',
      data: data,
      symbolSize: function (dataItem) {
        return dataItem >= 100 ? 20 : dataItem;
      }
    })
  })
  const option = {
    tooltip: {
      position: 'left'
    },
    title: title,
    singleAxis: singleAxis,
    series: series
  }
  return option
}