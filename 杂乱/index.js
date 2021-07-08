// 看浏览器是否支持某个属性
const cssSupport = function (attr, value) {
    let element = document.createElement('div');
    if (attr in element.style) {
        element.style[attr] = value;
        return element.style[attr] === value;
    } else {
        return false;
    }
}