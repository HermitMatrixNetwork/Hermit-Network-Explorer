import * as echarts from 'echarts';
export const bar = (classname, message) => {
    var myChart = echarts.init(classname);
    var option;

    option = {
        title:{
            text:message.title
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };
    myChart.setOption(option);
    myChart.resize()
}

export const line = (classname, message) => {
    var chartDom = document.querySelector(classname);
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: '折线图'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }
        ]
    };

    myChart.setOption(option);
}