js 的基本类型
Number, String, null, undefined, Boolean, Symbol, Object, bigInt

object
Data、function、Array

`宏任务` 微任务 浏览器渲染 宏任务

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
