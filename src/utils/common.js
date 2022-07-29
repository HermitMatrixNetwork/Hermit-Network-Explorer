import { Message, Loading } from 'element-ui'
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