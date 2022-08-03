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














