import * as echarts from 'echarts';
//柱状图
export const bar = (element,data) => {

    // console.log('js接受到数据',message);
    let message = [
        120, 200, 150, 80, 70, 110, 130, 10, 60, 120, 160, 140, 120, 200, 150, 80,
        70, 110, 130, 10, 60, 120, 160, 140,
    ];
    let value = message[0]
    message[0] = { value: value, itemStyle: { color: '#344358' } }
    
    var option = {
        grid: {
            left: "0",
            right: "0",
            bottom: "0",
            top: '0',
        },
        xAxis: {
            type: 'category',
            data: [],
            show: false,
            boundaryGap: true,
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [
            {
                data: message,
                type: 'bar',
                barWidth: '8px',
            }
        ],
        color: '#DDE0E3'
    };
    element.setOption(option);
    setInterval(() => {
        message.shift()
        let first = message[0]
        message[0] = { value: first, itemStyle: { color: '#344358' } }
        message.push(Math.floor(Math.random() * 200))
        element.setOption(option);
    }, 3000)

    element.resize()
}

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
            top: '20px',
            containLabel: true,
        },
        tooltip: {
            show: true,
            formatter: `新增用户数：{c}`,
            padding: 12,
            backgroundColor: "rgba(0,0,0,0.85)",
            textStyle: {
                color: '#FFFFFF',
                fontWeight: '400'
            }
        },
        xAxis: {
            type: 'category',
            data: [],
            boundaryGap: false,
            boundaryGap: ['15%', '15%'],
            show: false,
            offset: 1.54
        },
        yAxis: {
            type: 'value',
            // boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: 'rgba(0,0,0,0.45)',
                    fontSize: '12px',
                }
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
                data: [600, 1000, 800, 900, 450, 600, 920, 450, 890, 860, 400, 650],
                type: 'line',
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#4557C0' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#FFFFFF' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            }
        ],
        color: '#3652CE'
    };

    element.setOption(option);
}