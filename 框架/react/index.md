### 屏幕刷新率
每秒60次

```js
div.style.width = div.offsetWidth + 1 + 'px'  
```


fiber 利用的就是`requestIdleCallback`实现
fiber十八任务分成若干个,每次执行一个任务。执行完看看有没有剩余时间，如果有等待下次执行
