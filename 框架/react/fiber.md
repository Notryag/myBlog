## fiber

### 屏幕刷新率
每秒60次

```js
div.style.width = div.offsetWidth + 1 + 'px'  
```


fiber 利用的就是`requestIdleCallback`实现
fiber十八任务分成若干个,每次执行一个任务。执行完看看有没有剩余时间，如果有等待下次执行

fiber 原理

jsx经过babel 转译之后会形成一个js对象。

虚拟dom是描述真实dom的一个js对象。
```js
let element = <div> </div>
console.log(element) 
// 查看转换成了什么

function render(element, parentDom) {
  let dom = document.createElement(element.type)
  Object.keys(element.props).filters(key => key!=='children')
  .forEach((key) => {
    dom[key] = element.props[key]
  })
  if(Array.isArray(element.props)) {
    element.props.children.forEach(child => render(child))
  }
  parentDom.appendChild(dom)
}
```
如果节点多,层级特别深.又因为js是单线程,而且UI渲染和js执行是互斥的,可能引起页面卡顿
vue的话是精准更新不是全量对比更新


### 帧
+ 每个帧的预算事间是16.66毫秒(1秒/60)
+ 每个帧的开头包括样式计算、布局和渲染
+ js执行 js引擎和页面渲染在同一个渲染线程，GUI渲染和js执行是互斥的
+ 如果某个任务执行时间过长，浏览器会推迟渲染

### 什么是帧
+ 可以通过合理的调度合理分配cpu资源，从而提高用户的响应速度
+ 通过`Fiber` 架构可以,分段执行任务

### Fiber是个数据解构
React通过链表表示

通过child sibling 2个子节点,兄弟节点构成树形解构

+ `requestAnimationFrame`,浏览器会在每一帧渲染前执行这个api
+ `requestIdleCallback` 使开发者在主任务循环执行后和低优先级工作,而不影响延迟关键事件
+ `requestAnimationFrame` 一定执行 `requestIdleCallback` 不一定执行

```js
// timeoute 是个期限,如果已经过期,则不管又没有空都要执行
requestIdleCallback(workLoop, {timeout: 1000})

function workLoop(deadline) {
  console.log(deadline.didtimeout, dealline.timeRemaing)
}

```
`requestIdleCallback` 现在只有chrome支持,react 是通过模拟实现

通过`MessageChannel`模拟

```javascript
let channel = new MessageChannel()
let port1 = channel.port1
let port2 = channel.port2
port1.onmessage = function (event) {
  console.log('port1收到2的数据')
}
port2.postMessag('发送给port1')

let channel = new MessageChannel()
let activeFrameTime = 1000/60 // 16.6
let frameDeadline // 这一帧的截止时间
let timeRemaining = () => {
  frameDeadline -performance.now()
}
channel.port2.onmessage = function () {
  let currentTime = performance.now()
  let didTimeout = frameDeadline <= currentTime

  if(didTimeout || timeRemaining() >0) {
    if(pendingCallback) {
      pendingCallback({didTimeout,timeRemaing})
    }
  }

}


window.requestIdleCallback = (callback, options) => {
  // rAfTime performace.timing.navigationStart + performance.now()约等于Date.now()
  requestAnimationFrame((rafTime) => { // 这个时间 是每帧开始时间
    frameDeadline = rafTime + activeFrameTime
    pendingCallback = callback
    // 其实发消息，相当于添加了一个宏任务
    channel.port2.postMessage('hellow')
  })
}
```

遍历规则 儿子、弟弟、叔叔





















