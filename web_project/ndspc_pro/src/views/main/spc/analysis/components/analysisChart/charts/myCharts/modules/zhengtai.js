export function getOption(data) {
  // 将 ndXArr 转换为对象，以便于查找
  const ndMapLookup = data.ndMap.reduce((acc, item) => {
    acc[item.group_value.toFixed(2)] = item;
        return acc;
      }, {});
  // 创建完整的数据结构，填充缺失的频率和 totalFit 值为 0
  const groupValues = data.ndXArr.map((value) => value.toFixed(2));
  const frequencyData = groupValues.map((value) => (ndMapLookup[value] ? ndMapLookup[value].frequency : 0));
  const totalFitData = groupValues.map((value) => (ndMapLookup[value] ? ndMapLookup[value].totalFit.toFixed(2) : 0));
  const inFitData = groupValues.map((value) => (ndMapLookup[value] ? ndMapLookup[value].inFit.toFixed(2) : 0));
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params, ticket, callback) {
        var htmlStr = '';
        for (var i = 0; i < params.length; i++) {
          var param = params[i];
          // if(param.seriesType !== 'bar') {
            var xName = param.name;//x轴的名称
            var seriesName = param.seriesName;//图例名称
            var value = param.value;//y轴值
            var color = param.color;//图例颜色
            if (i === 0) {
              htmlStr += xName + '<br/>';//x轴的名称
            }
            htmlStr += '<div style="text-align: left">';
            htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';//一个点
            htmlStr += seriesName + '：' + value;//圆点后面显示的文本
            htmlStr += '</div>';
          // }
        }
        return htmlStr;
      }
    },
    legend: {
      data: ['频率','拟合曲线(整体)', '拟合曲线(组内)'],
      top: '1%',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      name: '',
      data: groupValues,
      boundaryGap: true,
      axisLabel: {
        interval: 0, // 设置刻度标签显示间隔为0，即每个刻度都显示
      },
    },
    yAxis: {
      type: 'value',
      name: '',
    },
    series: [
      {
        name: '频率',
        type: 'bar',
        data: frequencyData,
        barWidth: '100%',
        barGap: 0, // 设置柱状图之间的间隔为0
        color: '#01a2d9',
        itemStyle: {
          borderColor: 'black', // 设置边框颜色
          borderWidth: 0.5 // 设置边框宽度
        },
        markLine: {
          data: [
            {
              name: 'sls',
              xAxis: groupValues[0],
              label: {
                formatter: `LSL:${data.lsl}`,
              },
              lineStyle: {
                color: '#782d19',
                type: 'solid',
              },
            },
            {
              name: 'usl',
              xAxis: groupValues[groupValues.length - 1],
              label: {
                formatter: `USL:${data.usl}`,
              },
              lineStyle: {
                color: '#782d19',
                type: 'solid',
              },
            },
          ],
        },
        label: {
          show: true,
          position: 'top',
          color: '#333',
          formatter: function (params) {
            return params.value || '';
          }
        }
      },
      {
        name: '拟合曲线(整体)',
        type: 'line',
        data: totalFitData,
        smooth: true,
        symbolSize: 0, //设置拐点大小
        lineStyle: {
					width: 2,
					type: 'dashed'  //'dotted'虚线 'solid'实线
				},
        color: '#20a9d9'
      },
      {
        name: '拟合曲线(组内)',
        type: 'line',
        symbolSize: 0, //设置拐点大小
        data: inFitData,
        smooth: true,
        color: '#014d64'
      },
    ],
  }
  return option
}