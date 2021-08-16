## VUE 编译优化
1. 静态提升,固定的文本不会重复进行编译
2. cacheHandler 缓存事件
3. Block 配合 PatchFlags 做到靶向更新 dynamicChildren
	+ 用dynamicChildren在更新的时候靶向更新
	+ dynamicChildren 
4. 多固定文本的时候会直接返回字符串

## vue原理
通过调用 vue的createApp 创建

问题: 实例如何创建
+ createApp: 
+ createRenderer
+ createAppAPI
	+ createAppAPI 工厂函数,返回一个函数 创建app实例,实例中的mount方法, 其中调用了render方法,这是首次渲染, 把传入的vnode转换为dom,并且放在rootContainer中
+ render 
+ patch 利用patch,中有各种方法对不同的type,执行不同的方法，对component执行processCpmponent方法
+ processComponent 中可以更新和初始挂在component
+ mountComponent  初次挂载component
+ setupComponent  
+ setupStatefulComponent 
+ setupRenderEffect

### 响应式原理
```js
instance.update = effect(function componentEffect() {
	// ...
```
通过初始化的时候effect注册componentEffect方法,实现组件更新

实现ref就是返回一个RefImpl实例,具体的实现都在RefImpl中实现

```js
  const convert = (val) => isObject(val) ? reactive(val) : val;
  class RefImpl {
    constructor(value, _shallow = false) {
      this._shallow = _shallow;
      this.__v_isRef = true;
      this._rawValue = _shallow ? value : toRaw(value);
      this._value = _shallow ? value : convert(value);
    }
    get value() {
      track(toRaw(this), "get" /* GET */, 'value');
      return this._value;
    }
    set value(newVal) {
      newVal = this._shallow ? newVal : toRaw(newVal);
      if (hasChanged(newVal, this._rawValue)) {
        this._rawValue = newVal;
        this._value = this._shallow ? newVal : convert(newVal);
        trigger(toRaw(this), "set" /* SET */, 'value', newVal);
      }
    }
  }
```
跟reactive用proxy不同, ref是通过自带的get/set方法添加中间的代理,在改变`value`的时候才会触发get

和reactive一样都是get触发track,set触发trigger,分别跟踪和触发

convert是用来转换为reactive的,判断是否是object是就通过reactive转换监听

**toRefs**
作用：将一个响应式对象，转换为普通对象，并且将其中的属性转换为 Ref 对象
如果直接返回,返回的只是普通属性,不是数据响应式
通过`toRefs`可以直接返回响应式对象,不用通过state.a访问,可以直接访问  {{a}}
```js
  function toRef(object, key) {
    return isRef(object[key])
            ? object[key]
            : new ObjectRefImpl(object, key);
  }
  return {...state}
  return {...toRefs(state)} 
```