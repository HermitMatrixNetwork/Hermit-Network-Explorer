import * as echarts from "echarts";
import { debounce } from '@/utils/common.js'
let newdebounce = debounce()
export const blockBar = (element, data = []) => {

  let { block, txcharts } = element
  let heightmsg = []
  let timearr = []
  let txs = []
  let blockOption = {}
  let txOption = {}
  for (let i = 1; i < data.length; i++) {
    heightmsg.push(data[i - 1].height)
    /* 通过时间戳 计算相邻块的时间差，每个块的出块时长与之对应 */
    timearr.push(new Date(data[i - 1].timestamp).getTime() - new Date(data[i].timestamp).getTime())
    txs.push(data[i - 1].tx)
  }
  // console.log(txs, heightmsg);
  timearr = [...timearr, 3000]
  timearr[0] = { value: timearr[0], itemStyle: { color: '#000000' } }
  txs[0] = { value: txs[0], itemStyle: { color: '#000000' } }
  blockOption = {
    grid: {
      left: "0",
      right: "0",
      bottom: "0",
      top: "0",
    },
    xAxis: {
      type: "category",
      data: heightmsg,
      show: false,
      boundaryGap: true,
    },
    yAxis: {
      type: "value",
      show: false,
    },
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
        return `<div style="color:'#1840EE';">#${params.name}/<span style="color:'#BDC8FA';">3s</span></div>`;
      },
    },
    series: {
      data: timearr,
      type: "bar",
      barWidth: "8px",
      itemStyle: {
        // normal: {
        //   color: "#DDE0E3",
        // },
        emphasis: {
          color: "#1E42ED",
        },
      },
    }
  };

  txOption = {
    grid: {
      left: "0",
      right: "0",
      bottom: "0",
      top: "0",
    },
    xAxis: {
      type: "category",
      data: heightmsg,
      show: false,
      boundaryGap: true,
      default:'auto',
    },
    yAxis: {
      type: "value",
      show: false,
    },
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
        return `<div style="color:'#1840EE';">#${params.name}/<span style="color:'#BDC8FA';">${typeof params.data == "number" ? params.data : params.data.value
          } Txn</span></div>`;
      },
    },
    series: {
      data: txs,
      type: "bar",
      barWidth: "8px",
      barMinHeight:'10',
      itemStyle: {
        // normal: {
        //   color: "#DDE0E3",
        // },
        emphasis: {
          color: "#1E42ED",
        },
      },
    }
  };


  block.setOption(blockOption);
  txcharts.setOption(txOption)
  echarts.connect([block, txcharts]);

  block.on('mouseover', function (event) {
    if(txs[event.dataIndex].itemStyle) return
    newdebounce(function () {
      txs[event.dataIndex] = { value: txs[event.dataIndex], itemStyle: { color: '#1E42ED' } }
      txcharts.setOption(txOption)
    })

    // console.log(newdebounce);
  })
  block.on('mouseout', function (event) {
    if(!txs[event.dataIndex].itemStyle) return
    newdebounce(function () {
      txs[event.dataIndex] = txs[event.dataIndex].value
      txcharts.setOption(txOption)
    })
  })
  txcharts.on('mouseover', function (event) {
    timearr[event.dataIndex] = { value: timearr[event.dataIndex], itemStyle: { color: '#1E42ED' } }
    block.setOption(blockOption)
  })
  txcharts.on('mouseout', function (event) {
    timearr[event.dataIndex] = timearr[event.dataIndex].value
    block.setOption(blockOption)
  })
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
