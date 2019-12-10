// echarts pie与 bar
$(function () {
  // 条形图

  // 基于准备好的dom，初始化echarts实例
  var chartsBar = echarts.init(document.querySelector('.charts-bar'));

  // 指定图表的配置项和数据
  var optionBar = {

    title: {
      text: '2017年注册人数'
    },

    // 数据提示框
    tooltip: {},
    // 图例
    legend: {
      data: ['人数']
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},

    // 系列
    series: [{
      name: '人数',
      type: 'bar',
      data: [500, 200, 3600, 1000, 1000, 2000]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  chartsBar.setOption(optionBar);

  // 扇形图

  // 基于准备好的dom，初始化echarts实例
  var chartsPie = echarts.init(document.querySelector('.charts-pie'));

  // 指定图表的配置项和数据
  var optionPie = {
    title: {
      text: '热门品牌销售',
      subtext: '2017年六月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '新百伦', '李宁', '安踏']
    },
    series: [
      {
        name: '品牌',
        type: 'pie',
        // 控制直径大小，也就是控制扇形的大小
        radius: '55%',
        //控制圆心的位置
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '耐克' },
          { value: 310, name: '阿迪' },
          { value: 234, name: '新百伦' },
          { value: 135, name: '李宁' },
          { value: 1548, name: '安踏' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  // 使用刚指定的配置项和数据显示图表。
  chartsPie.setOption(optionPie);
})