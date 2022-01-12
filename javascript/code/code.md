```js
let ToastConstructor = Vue.extend(Toast);
let instance // 实例对象
let seed = 0; // 确定有多少这样的实例，控制层级
const ToastDialog = (options ={})=>{
    if (typeof options === 'string') { // 支持只传入文案提示
        options = {
            message: options
        }
    }

    let id = `toast_${seed++}`
    instance = new ToastConstructor({
        data:options // 可以与组件内部的data进行合并，如果key相同可以将原来的值替换掉
    })
    console.log(instance,'instance is ----')
    instance.id = id;
     /* 因为还没有具体的dom节点可以挂载此处$mount没有提供参数，
     模板将被渲染为文档之外的的元素，必须使用原生DOM API把它插入文档中 */
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el); // 将实例挂载到dom上
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instance.dom.style.zIndex = 999 + seed;
    console.log(instance,'instance is ----');
    return instance.vm;
}
export default ToastDialog;
```

通过Vue.extend创造的是constructor,需要实例化之后appendChild