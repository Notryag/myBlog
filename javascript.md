js 的基本类型
Number, String, null, undefined, Boolean, Symbol, Object, bigInt

object
Data、function、Array

`宏任务` 微任务 浏览器渲染 宏任务
在浏览器环境中，有JS 引擎线程和渲染线程，且两个线程互斥。
Node环境中，只有JS 线程。

执行一个宏任务(先执行同步代码)-->执行所有微任务-->UI render-->执行下一个宏任务-->执行所有微任务-->UI render-->......


```js
Promise.property.all = function (iterators) {
  const promises = Array.from(iterators)
  const len = promises.length
  let count = 0
  let resultList = []
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((result) => {
          count++
          resultList[index] = result
          if (count === len) {
            resolve(resultList)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  })
}
```

手写节流
