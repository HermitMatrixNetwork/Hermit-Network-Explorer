import { Message } from 'element-ui'

//复制文本
export function copy(text) {
    let visl_dom_inp = document.createElement('textarea'),
        dom = null,
        res = null,
        _message = {};
    visl_dom_inp.id = `copy_input`;
    visl_dom_inp.value = text;
    visl_dom_inp.style.opacity = 0;
    document.body.appendChild(visl_dom_inp);
    dom = document.getElementById('copy_input');
    dom.select(); // 选择对象
    document.execCommand("Copy");
    res = document.body.removeChild(dom);
    if (res) {
        _message = {
            type: 'success',
            message: '复制成功'
        };
    } else {
        _message = {
            type: 'error',
            message: '复制失败'
        };
    }
    Message({
        ..._message
    })
    return;
}

// 数字转金额类型
export function toMoney(num) {
    let numvalue = Number(num)
    if (numvalue) {
        numvalue = numvalue.toFixed(0);
    }
    numvalue = parseFloat(numvalue);
    numvalue = numvalue.toLocaleString();
    return numvalue;
}

//对账户地址中间省略
export function sliceAddress(address, start = 8, end = 8) {
    if (address && address.length > 16) {
        let substr1 = address.slice(0, start)
        let substr2 = address.slice(address.length - end)
        let substr = substr1 + '...' + substr2
        return substr
    } else {
        return ''
    }
}

//计算时间差
export function pastTime(timestamp) {
    var date1 = (Date.parse(new Date())) / 1000;//计算当前时间戳 
    var date2 = (Date.parse(new Date(timestamp))) / 1000;; //自动收货的时间戳 （字符串转时间戳）
    var date3 = (date1 - date2) * 1000; //时间差的毫秒数
    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    return days + "天 " + hours + "小时 " + minutes + " 分钟"
}

// 防抖函数
export function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}










