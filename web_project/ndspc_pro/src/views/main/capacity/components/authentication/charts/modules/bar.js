var xAxis_data = ["01月", "02月", "03月", "04月", "05月", "06月", "07月", "08月", "09月", "10月", "11月", "12月"]
var data_A = [820, 932, 901, 934, 1290, 1330, 1320, 720, 832, 501, 334, 990]
var data_B = [720, 832, 501, 334, 990, 830, 720, 620, 732, 801, 1134, 908]
var data_C = [620, 732, 801, 1134, 908, 930, 920, 820, 932, 901, 934, 1290]
var data_D = [720, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720]
var names = ['2018用', '预算费用', '使用预算', '目标']
var color = ['#014D64', '#01A2D9', '#7AD2F6', '#7C260B']

const option = {
  backgroundColor: '#c6d3df',
  tooltip: {
    trigger: 'axis',
    // formatter: '{b}<br />{a2}:{c2}%<br />{a1}:{c1}%<br />{a0}:{c0}%'
    formatter: function (params, ticket, callback) {
      var htmlStr = '';
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        var xName = param.name;//x轴的名称
        var seriesName = param.seriesName;//图例名称
        var value = param.value;//y轴值
        var color = param.color;//图例颜色
        if (i === 0) {
          htmlStr += xName + '<br/>';//x轴的名称
        }
        htmlStr += '<div>';
        htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';//一个点
        htmlStr += seriesName + '：' + value + '万元';//圆点后面显示的文本
        htmlStr += '</div>';
      }
      return htmlStr;
    }
  },
  dataZoom: [
    // 滑动条
    {
      xAxisIndex: 0, // 这里是从X轴的0刻度开始
      show: false, // 是否显示滑动条，不影响使用 滚动条样式调不好很丑
      type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      startValue: 0, // 从头开始。
      endValue: 4, // 一次性展示几个。
      moveHandleSize: 6, // 高度
      fillerColor: "#023661", // 选中范围的填充颜色
      borderColor: "#023661", // 边框颜色。
      backgroundColor: "#023661", // 组件的背景颜色
      left: "10%", // 左边的距离
      right: "10%", // 右边的距离
      textStyle: {
        color: "#fff", // 滚动条两边字体样式
      },
      height: "1%",
    },
    {
      type: "inside",
      show: true,
      xAxisIndex: [0],
      start: 0, // 默认为1
      end: 100, // 默认为100
      moveOnMouseWheel: false,
      preventDefaultMouseMove: false,
    },
  ],
  grid: {       //页边距
    top: '20%',
    left: '1%',
    right: '1%',
    bottom: '1%',
    containLabel: true
  },
  legend: {      // 图例
    top: '5%',
    data: names
  },
  xAxis: {
    type: 'category',
    data: xAxis_data,
    axisLine: {//坐标线
      lineStyle: {
        type: 'solid',
        color: '#000', //轴线的颜色
        width: '2' //坐标线的宽度
      }
    },
    axisLabel: {
      formatter: '{value}',
    },
    textStyle: {
      fontSize: 12,
      fontFamily: 'PingFang SC',
      fontWeight: 400,
      lineHeight: 17,
      color: '#000', //坐标值的具体的颜色
      opacity: 1,
    },
    axisTick: {
      show: true
    }
  },
  yAxis: {
    type: 'value',
    name: '数量',
    axisLine: { //轴线
      show: true,
      lineStyle: {
        type: 'solid',
        color: '#000', //轴线的颜色
        width: '1' //坐标线的宽度
      }
    },
    axisTick: {
      show: true
    },
    axisLabel: {
      formatter: '{value}',
    },
    textStyle: {
      fontSize: 12,
      fontFamily: 'PingFang SC',
      fontWeight: 400,
      lineHeight: 17,
      color: '#000', //坐标值的具体的颜色
      opacity: 1,
    },
    splitLine: {
      show: false
    }
  },
  series: [
    {
      type: 'bar',
      name: names[1],
      data: data_A,
      symbolSize: 9, //设置拐点大小
      itemStyle: {
        color: color[0]
      },
      lineStyle: {
        width: 2,
        type: 'solid'  //'dotted'虚线 'solid'实线
      },
      selectedMode: 'single',
      select: {
        itemStyle: {
          color: '#e7d854',
          borderColor: color[0],
          shadowColor: color[0],
          shadowBlur: 10
        }
      }
    }, {
      type: 'bar',
      name: names[2],
      data: data_B,
      symbolSize: 9, //设置拐点大小
      itemStyle: {
        color: color[1]
      },
      lineStyle: {
        width: 2,
        type: 'solid'  //'dotted'虚线 'solid'实线
      }
    }, {
      type: 'line',
      name: names[0],
      data: data_C,
      symbolSize: 9, //设置拐点大小
      symbol: 'circle',
      color: color[2], //设置颜色
      lineStyle: {
        width: 2,
        type: 'solid'  //'dotted'虚线 'solid'实线
      }
    }, {
      type: 'line',
      name: names[3],
      data: data_D,
      color: color[3], //设置颜色
      smooth: false, // 是否平滑曲线显示
      symbolSize: 0, //设置拐点大小
      lineStyle: {
        width: 3,
        type: 'dashed'  //'dotted'虚线 'solid'实线
      }
    },
  ]
}

export default option