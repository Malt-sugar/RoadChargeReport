/**
 * 创建图表 根据传入的参数创建不同类型的图表
 * 
 */
// 默认chart
/**
 * 初始化表格
 * 
 * @param chartType		图标类型
 * @param chartToDiv	生成报表的div
 * @param charttitle	报表名称
 * @param subtitle		报表副标题
 * @param xTitle		x轴显示描述
 * @param xCategories	x轴显示内容 -- ['Jan', 'Feb', 'Mar', 'Apr']
 * @param yTitle		y轴描述
 * @param series		数据【data】[{ name: 'Tokyo', data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5,
 *						25.2, 26.5, 23.3, 18.3, 13.9, 9.6] },{ name: 'code', data: [7.0,
 *						6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6] }]
 * @return
 */
function initChart(chartType, chartToDiv, charttitle, xTitle, xCategories,
		yTitle, series) {
	this.initChart(chartType, chartToDiv, charttitle, null, xTitle,
			xCategories, yTitle, series);
}
/**
 * 初始化表格
 * 
 * @param chartType		图标类型
 * @param chartToDiv	生成报表的div
 * @param charttitle	报表名称
 * @param xCategories	x轴显示内容 -- ['Jan', 'Feb', 'Mar', 'Apr']
 * @param yTitle		y轴描述
 * @param series		数据【data】[{ name: 'Tokyo', data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5,
 *						25.2, 26.5, 23.3, 18.3, 13.9, 9.6] },{ name: 'code', data: [7.0,
 *						6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6] }]
 * @return
 */
function initChart(chartType, chartToDiv, charttitle, xCategories, yTitle,
		series) {
	this.initChart(chartType, chartToDiv, charttitle, null, null, xCategories,
			yTitle, series);
}
/**
 * 初始化表格
 * 
 * @param chartType		图标类型
 * @param chartToDiv	生成报表的div
 * @param charttitle	报表名称
 * @param xCategories	x轴显示内容 -- ['Jan', 'Feb', 'Mar', 'Apr']
 * @param series		数据【data】[{ name: 'Tokyo', data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5,
 *						25.2, 26.5, 23.3, 18.3, 13.9, 9.6] },{ name: 'code', data: [7.0,
 *						6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6] }]
 * @return
 */
function initChart(chartType, chartToDiv, charttitle, xCategories, series) {
	this.initChart(chartType, chartToDiv, charttitle, null, null, xCategories,
			null, series, null);
}
/**
 * 初始化表格
 * 
 * @param chartType		图标类型
 * @param chartToDiv	生成报表的div
 * @param xCategories	x轴显示内容 -- ['Jan', 'Feb', 'Mar', 'Apr']
 * @param series		数据【data】[{ name: 'Tokyo', data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5,
 *						25.2, 26.5, 23.3, 18.3, 13.9, 9.6] },{ name: 'code', data: [7.0,
 *						6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6] }]
 * @return
 */
function initChart(chartType, chartToDiv, xCategories, series) {
	this.initChart(chartType, chartToDiv, null, null, null, xCategories, null,
			series, null);
}

function initChart(chartType, chartToDiv, charttitle, subtitle, xTitle,
		xCategories, yTitle, series, invertedChart, stepcount) {
	var chart=null;
	if(chartType=='column') {
		chart = new Highcharts.Chart( {
			chart : {
				// 报表展示的div
				renderTo : chartToDiv,
				// 报表类型 柱状： column 线：line，spline 曲面：area 点：scatter 饼:pie
				type : chartType,
				inverted : invertedChart, //左右显示，默认上下正向
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				loading:true ,
				events : {
					redraw : function() {/* 重新绘制图表时触发*/},
		 			addSeries:function(){/* 重添加数据时触发*/}
				}
			},	
			// 主标题
			title : {
				text : charttitle,
				style:{color: '#3E576F',fontSize: '12px',fontWeight:"bold"}
			},
			// 副标题
			subtitle : {
				text : subtitle
			},
			// x轴显示
			xAxis : {
				// 备注名称
				title : {
					text : xTitle
				},
				labels : {
					step : stepcount,
					rotation : -15,
					align : 'right',
					style : {//x轴显示字体样式
					//fontSize: '12px',
					//fontFamily: 'Verdana, sans-serif'
					}
				},
				// 轴信息
				categories : xCategories
			},yAxis : {
				//max:120, // 定义Y轴 最大值  
				//min:0, // 定义最小值   
				//tickInterval:20, // 刻度值  
				maxPadding:1
				,
				title : {
					text : yTitle
				},
				labels:{
					formatter: function() {
						return this.value +'';
					}
				}
			},
			// 鼠标移动到点显示点位信息
			tooltip : {
				formatter : function() {
					var s;
					//var point = this.point;
					if (this.point.name) { // the pie chart
						s = '' + this.point.name + ': ' + this.y+'个用户';
					} else {
						s = '' + '<b>' + this.series.name + '</b><br/>' + this.x+ ': ' + this.y+'个用户';
					}
					return s;
				}
			},
			plotOptions : {
				column : {
						allowPointSelect : true,
						cursor : 'pointer',
						dataLabels : {
							enabled : true,
							style: {
								fontWeight: 'bold'
							},
							//color : '#000000',
							//connectorColor : '#000000',
							formatter : function() {
								return '<b>'+this.y +'个';
							},
							dataLabels : {
								enabled : true
							},
							showInLegend : true
						}
				}
			},
			// 不显示标签
			credits : {
				enabled : false
			// href:'www.baidu.com',
			// text:'百度贴吧'
			}, 
			legend:{ 
				enabled: false
			},
			exporting: {
				 enabled: false
			},
			series : series

		});
	}else{
		 chart = new Highcharts.Chart( {
			chart : {
				// 报表展示的div
				renderTo : chartToDiv,
				// 报表类型 柱状： column 线：line，spline 曲面：area 点：scatter 饼:pie
				type : chartType,
				inverted : invertedChart, //左右显示，默认上下正向
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				events : {
					redraw : function() {/* 重新绘制图表时触发*/},
		 			addSeries:function(){/* 重添加数据时触发*/}
				}
			},
			// 主标题
			title : {
				text : charttitle,
			     style:{color: '#3E576F',fontSize: '12px',fontWeight:"bold"}
			},
			// 副标题
			subtitle : {
				text : subtitle
			},
			// x轴显示
			xAxis : {

				// 备注名称
				title : {
					text : xTitle
				},
				labels : {
					step : stepcount,
					rotation : -15,
					align : 'right',
					style : {//x轴显示字体样式
					//fontSize: '12px',
					//fontFamily: 'Verdana, sans-serif'
					}
				},
				// 轴信息
				categories : xCategories
			},
			yAxis : {
				//max:120, // 定义Y轴 最大值  
				min:0, // 定义最小值   
				//tickInterval:20, // 刻度值  
				title : {
					text : yTitle
				},
				labels:{
					formatter: function() {
						return this.value +'';
					}
				}
			},
			// 鼠标移动到点显示点位信息
			tooltip : {
				formatter : function() {
					var s;
					if (this.point.name) { // the pie chart
						s = '' + this.point.name + ': ' + this.y+'个用户';
					} else {
						s = '' + '<b>' + this.series.name + '</b><br/>' + this.x
								+ ': ' + this.y+'个用户';
					}
					return s;
				}
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : true,
						color : '#000000',
						connectorColor : '#000000',
						style:{   
							fontFamily:"微软雅黑",     
				 				fontWeight: 'bold'
		    			},
						formatter : function() {
							return '<b>' + this.point.name + '</b>: '
									+ this.percentage.toFixed(2) + " %";
						},
						dataLabels : {
							enabled : true
						},
						showInLegend : true
					}
				}
			},
			legend: {
				enabled: false,
				layout: 'vertical',
				align: 'left',
				x: 120,
				verticalAlign: 'top',
				y: 100,
				floating: true,
				backgroundColor: '#FFFFFF'
			},
			// 不显示标签
			credits : {
				enabled : false
			// href:'www.baidu.com',
			// text:'百度贴吧'
			},
		    credits:{
		    	enabled: false
		    } ,
		    exporting: {
		        enabled: false
		    },
			series : series
		});
	}
	return chart;
}


function initChartInt(chartType, chartToDiv, charttitle, subtitle, xTitle,
		xCategories, yTitle, series, invertedChart, stepcount) {
	var chart=null;
	if(chartType=='column') {
		chart = new Highcharts.Chart( {
			chart : {
				// 报表展示的div
				renderTo : chartToDiv,
				// 报表类型 柱状： column 线：line，spline 曲面：area 点：scatter 饼:pie
				type : chartType,
				inverted : invertedChart, //左右显示，默认上下正向
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				loading:true ,
				events : {
					redraw : function() {/* 重新绘制图表时触发*/},
		 			addSeries:function(){/* 重添加数据时触发*/}
				}
			},	
			// 主标题
			title : {
				text : charttitle,
				style:{color: '#3E576F',fontSize: '12px',fontWeight:"bold"}
			},
			// 副标题
			subtitle : {
				text : subtitle
			},
			// x轴显示
			xAxis : {
				// 备注名称
				title : {
					text : xTitle
				},
				labels : {
					step : stepcount,
					rotation : -15,
					align : 'right',
					style : {//x轴显示字体样式
					//fontSize: '12px',
					//fontFamily: 'Verdana, sans-serif'
					}
				},
				// 轴信息
				categories : xCategories
			},yAxis : {
				//max:120, // 定义Y轴 最大值  
				//min:0, // 定义最小值   
				//tickInterval:20, // 刻度值  
				maxPadding:1
				,
				title : {
					text : yTitle
				},
				labels:{
					formatter: function() {
						return this.value +'';
					}
				}
			},
			// 鼠标移动到点显示点位信息
			tooltip : {
				formatter : function() {
					var s;
					//var point = this.point;
					if (this.point.name) { // the pie chart
						s = '' + this.point.name + ': ' + this.y+'次';
					} else {
						s = '' + '<b>' + this.series.name + '</b><br/>' + this.x+ ': ' + this.y+'次';
					}
					return s;
				}
			},
			plotOptions : {
				column : {
						allowPointSelect : true,
						cursor : 'pointer',
						dataLabels : {
							enabled : true,
							style: {
								fontWeight: 'bold'
							},
							//color : '#000000',
							//connectorColor : '#000000',
							formatter : function() {
								return '<b>'+this.y +'次';
							},
							dataLabels : {
								enabled : true
							},
							showInLegend : true
						}
				}
			},
			// 不显示标签
			credits : {
				enabled : false
			// href:'www.baidu.com',
			// text:'百度贴吧'
			}, 
			legend:{ 
				enabled: false
			},
			exporting: {
				 enabled: false
			},
			series : series

		});
	}else{
		 chart = new Highcharts.Chart( {
			chart : {
				// 报表展示的div
				renderTo : chartToDiv,
				// 报表类型 柱状： column 线：line，spline 曲面：area 点：scatter 饼:pie
				type : chartType,
				inverted : invertedChart, //左右显示，默认上下正向
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				events : {
					redraw : function() {/* 重新绘制图表时触发*/},
		 			addSeries:function(){/* 重添加数据时触发*/}
				}
			},
			// 主标题
			title : {
				text : charttitle,
			     style:{color: '#3E576F',fontSize: '12px',fontWeight:"bold"}
			},
			// 副标题
			subtitle : {
				text : subtitle
			},
			// x轴显示
			xAxis : {

				// 备注名称
				title : {
					text : xTitle
				},
				labels : {
					step : stepcount,
					rotation : -15,
					align : 'right',
					style : {//x轴显示字体样式
					//fontSize: '12px',
					//fontFamily: 'Verdana, sans-serif'
					}
				},
				// 轴信息
				categories : xCategories
			},
			yAxis : {
				//max:120, // 定义Y轴 最大值  
				min:0, // 定义最小值   
				//tickInterval:20, // 刻度值  
				title : {
					text : yTitle
				},
				labels:{
					formatter: function() {
						return this.value +'';
					}
				}
			},
			// 鼠标移动到点显示点位信息
			tooltip : {
				formatter : function() {
					var s;
					if (this.point.name) { // the pie chart
						s = '' + this.point.name + ': ' + this.y+'次';
					} else {
						s = '' + '<b>' + this.series.name + '</b><br/>' + this.x
								+ ': ' + this.y+'次';
					}
					return s;
				}
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : true,
						color : '#000000',
						connectorColor : '#000000',
						style:{   
							fontFamily:"微软雅黑",     
				 				fontWeight: 'bold'
		    			},
						formatter : function() {
							return '<b>' + this.point.name + '</b>: '
									+ this.percentage.toFixed(2) + " %";
						},
						dataLabels : {
							enabled : true
						},
						showInLegend : true
					}
				}
			},legend: {
				enabled: false,
				layout: 'vertical',
				align: 'left',
				x: 120,
				verticalAlign: 'top',
				y: 100,
				floating: true,
				backgroundColor: '#FFFFFF'
			},
			// 不显示标签
			credits : {
				enabled : false
			// href:'www.baidu.com',
			// text:'百度贴吧'
			},
		    credits:{
		    	enabled: false
		    } ,
		    exporting: {
		        enabled: false
		    },
			series : series
		});
	}
	return chart;
}



