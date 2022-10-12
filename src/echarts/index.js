import * as echarts from "echarts";
export const blockBar = (element, data = []) => {

  let { block, txcharts,txDom,blockDom } = element
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
    animation:true,
    tooltip: {
      show: true,
      trigger: "item",
      position: "top",
      backgroundColor: "transparent",
      borderColor: "transparent",
      padding: 0,
      triggerOn:'mousemove',
      textStyle: {
        color: "#5671F2",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
      },
      extraCssText: "box-shadow: 0 0 rgba(0, 0, 0, 0.3);",
      formatter: function (params) {
        return `<div style="color:'#1840EE';">#${params.name}/<span style="color:'#BDC8FA';">${typeof params.data == "number" ? params.data / 1e3 : params.data.value / 1e3
          }s</span></div>`;
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
    animation:true,
    tooltip: {
      show: true,
      trigger: "item",
      position: "top",
      backgroundColor: "transparent",
      borderColor: "transparent",
      padding: 0,
      triggerOn:'mousemove',
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
  let _blockoption = echarts.getInstanceByDom(blockDom).getOption()
  let _blockvalue = _blockoption.series[0].data
  let _txsoption = echarts.getInstanceByDom(txDom).getOption()
  let _txsvalue = _txsoption.series[0].data

  block.on('mouseover', function (event) {
    _txsvalue[event.dataIndex] = { value: _txsvalue[event.dataIndex], itemStyle: { color: '#1E42ED' } }
    _txsoption.animation = false
    echarts.getInstanceByDom(txDom).setOption(_txsoption)
    
  })
  block.on('mouseout', function (event) {
    _txsvalue[event.dataIndex] = _txsvalue[event.dataIndex].value
    _txsoption.animation = false
    echarts.getInstanceByDom(txDom).setOption(_txsoption)
  })

  
  txcharts.on('mouseover', function (event) {
    _blockvalue[event.dataIndex] = { value: _blockvalue[event.dataIndex], itemStyle: { color: '#1E42ED' } }
    _blockoption.animation = false
    echarts.getInstanceByDom(blockDom).setOption(_blockoption)

  })
  
  txcharts.on('mouseout', function (event) {
    _blockvalue[event.dataIndex] = _blockvalue[event.dataIndex].value
    _blockoption.animation = false
    echarts.getInstanceByDom(blockDom).setOption(_blockoption)
  })
};

//折现图
export const line = (element, message,prompt='The number of new users') => {
  // var chartDom = document.querySelector(classname);
  // var myChart = echarts.init(chartDom);
  // console.log('渲染');
  let userdate = message.map(item=>{
    let year = new Date(item.date).getFullYear() 
    let month = new Date(item.date).getMonth()+1>=10?new Date(item.date).getMonth()+1:'0' + (new Date(item.date).getMonth()+1)
    let day = new Date(item.date).getDate()>=10?new Date(item.date).getDate():'0'+new Date(item.date).getDate()
    return year+'-'+ month + '-' + day
  })
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
      formatter: `${prompt}：{c}<br/>{b}`,
      padding: 12,
      backgroundColor: "rgba(0,0,0,0.85)",
      textStyle: {
        color: "#FFFFFF",
        fontWeight: "400",
      },
    },
    xAxis: {
      type: "category",
      data: userdate,
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
        data: message.map(item=>item.user),
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
