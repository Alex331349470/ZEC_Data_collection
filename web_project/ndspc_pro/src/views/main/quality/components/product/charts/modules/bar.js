export function getOption(chartData,isExport) {
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
					// 定义一个包含需要百分号单位的系列名称数组
					var percentUnitsSeries = ['合格率', '累计占比'];
					var units = percentUnitsSeries.includes(seriesName) ? '%' : ''
					if (i === 0) {
						htmlStr += xName + '<br/>';//x轴的名称
					}
					htmlStr += '<div>';
					htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';//一个点
					htmlStr += seriesName + '：' + value + units + '<br/>';//图例名称：y轴值圆点后面显示的文本
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
				endValue: 8, // 一次性展示几个。
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
			data: chartData.names
		},
		xAxis: {
			type: 'category',
			data: chartData.xAxis_data,
			axisLine: {//坐标线
				lineStyle: {
					type: 'solid',
					color: '#000', //轴线的颜色
					width: '2' //坐标线的宽度
				}
			},
			axisLabel: {
				formatter: '{value}',
				// rotate: 90
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
		yAxis: [
			{
				type: 'value',
				name: chartData.type,
				position: 'left',
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
			{
				type: 'value',
				name: '',
				position: 'right',
				axisLine: { //轴线
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false,
				},
				splitLine: {
					show: false
				}
			},
		],
		series: [
			{
				type: 'bar',
				name: chartData.names[0],
				data: chartData.yAxis_data.amount,
				symbolSize: 9, //设置拐点大小
				itemStyle: {
					color: color[0]
				},
				barMaxWidth: '40',
				lineStyle: {
					width: 2,
					type: 'solid'  //'dotted'虚线 'solid'实线
				},
				selectedMode: isExport ? 'single' : false,
				select: {
					itemStyle: {
						color: '#e7d854',
						borderColor: color[0],
						shadowColor: color[0],
						shadowBlur: 10
					}
				}
			}, {
				type: 'line',
				name: chartData.names.length > 2 ? chartData.names[2] : chartData.names[1],
				data: chartData.yAxis_data.rate,
				symbolSize: 9, //设置拐点大小
				symbol: 'circle',
				color: color[2], //设置颜色
				lineStyle: {
					width: 2,
					type: 'solid'  //'dotted'虚线 'solid'实线
				},
				label: {
					show: true,
					position: 'top', // 显示位置
					formatter: `{c} %` // 格式化显示内容，{c} 表示数值
				},
				yAxisIndex: 1
			}, {
				type: 'bar',
				name: chartData.names[1],
				data: chartData.yAxis_data.poorAmount,
				symbolSize: 9, //设置拐点大小
				itemStyle: {
					color: color[1]
				},
				barMaxWidth: '40',
				lineStyle: {
					width: 2,
					type: 'solid'  //'dotted'虚线 'solid'实线
				}
			}, {
				type: 'line',
				name: chartData.names[3],
				data: chartData.yAxis_data.purpose,
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
	return option
}
