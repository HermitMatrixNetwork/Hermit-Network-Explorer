import * as echarts from "echarts";
//柱状图
export const bar = (element, data) => {
  let chart1 = echarts.init(element[0]);
  let chart2 = echarts.init(element[1]);
  // console.log('js接受到数据',message);
  let message = [
    120, 200, 150, 80, 70, 110, 130, 10, 60, 120, 160, 140, 120, 200, 150, 80,
    70, 110, 130, 10, 60, 120, 160, 140,
  ];
  let value = message[0];
  message[0] = { value: value, itemStyle: { color: "#344358" } };

  var option = {
    grid: {
      left: "0",
      right: "0",
      bottom: "0",
      top: "0",
    },
    xAxis: {
      type: "category",
      data: [],
      show: false,
      boundaryGap: true,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: message,
        type: "bar",
        barWidth: "8px",
        itemStyle: {
          normal: {
            color: "#DDE0E3",
          },
          emphasis: {
            color: "#1E42ED",
          },
        },
      },
    ],
    color: "#DDE0E3",
    tooltip: {
      show: true,
      trigger: "item",
      position: "top",
      backgroundColor: "transparent",
      borderColor: "transparent",
      padding: 0,
      textStyle: {
        color: "#5671F2",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
      },
      extraCssText: "box-shadow: 0 0 rgba(0, 0, 0, 0.3);",
      formatter: function (params) {
        // console.log(params);
        return `<div style="color:'#1840EE';">#36346045/<span style="color:'#BDC8FA';">${
          typeof params.data == "number" ? params.data : params.data.value
        } 1.035s</span></div>`;
      },
    },
  };
  echarts.connect([chart1, chart2]);
  chart1.setOption(option);
  chart2.setOption(option);

  chart1.on('click',value=>{
    console.log('图表数据',value);
    value.color = 'red'
  })
  chart2.on('click',value=>{
    console.log('图表数据',value);
    // value.color = 'red'
  })


  console.dir(echarts.connect);
  // setInterval(() => {
  //     message.shift()
  //     let first = message[0]
  //     message[0] = { value: first, itemStyle: { color: '#344358' } }
  //     message.push(Math.floor(Math.random() * 200))
  //     element.setOption(option);
  // }, 3000)

  // element.resize()
};

//折现图
export const line = (element, message) => {
  // var chartDom = document.querySelector(classname);
  // var myChart = echarts.init(chartDom);
  // console.log('渲染');

  var option = {
    //位置
    grid: {
      left: "20px",
      right: "20px",
      bottom: "33px",
      top: "20px",
      containLabel: true,
    },
    tooltip: {
      show: true,
      formatter: `新增用户数：{c}`,
      padding: 12,
      backgroundColor: "rgba(0,0,0,0.85)",
      textStyle: {
        color: "#FFFFFF",
        fontWeight: "400",
      },
    },
    xAxis: {
      type: "category",
      data: [],
      boundaryGap: false,
      boundaryGap: ["15%", "15%"],
      show: false,
      offset: 1.54,
    },
    yAxis: {
      type: "value",
      // boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "rgba(0,0,0,0.45)",
          fontSize: "12px",
        },
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#eaeaea",
        },
      },
    },
    series: [
      {
        data: message,
        type: "line",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#4557C0", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#FFFFFF", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
    color: "#3652CE",
  };

  element.setOption(option);
};
