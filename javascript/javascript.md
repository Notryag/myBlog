js 的基本类型
Number, String, null, undefined, Boolean, Symbol, Object, bigInt

object
Data、function、Array

`宏任务` 微任务 浏览器渲染 宏任务
在浏览器环境中，有JS 引擎线程和渲染线程，且两个线程互斥。
Node环境中，只有JS 线程。

执行所有微任务-->执行一个宏任务(先执行同步代码)-->UI render-->执行所有微任务-->执行下一个宏任务-->UI render-->......

js有同步任务,有异步任务。在执行同步任务的时候遇到异步代码会将其插入到异步队列中，分为宏任务和微任务队列
执行完宏任务再执行微任务

微任务中添加微任务，
```js
Promise.resolve().then(() =>{
	console.log(1)
	Promise.resolve().then(()=> {
		// 这个任务会插队
		console.log(2)
	})
}).then(()=> {
	console.log(3)
})

// 2个promise 并行的时候是执行完一个执行另一个
1 3 5
2 4 6
返回的是 1 2 3 4 5 6

new Promise(resolve => {
    let resolvedPromise = Promise.resolve()
    resolve(resolvedPromise)
}).then(() => {
    console.log('resolvePromise resolved')
})

Promise.resolve()
   .then(() => { console.log('promise1') })
   .then(() => { console.log('promise2') })
   .then(() => { console.log('promise3') })

```


await 后面的和then后面相同

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


+ instanceof 原理
```js
L instanceof R
L.__proto__  === R.prototype

foo instanceof Foo
// 实际调用的是
Foo[Symbol.hasInstance](foo)
```

**面向对象的理解**
对象可以看作是一个人，他有身高、体重等等的属性，又有吃饭、睡觉等等的方法，对象就是一个属性和方法的集合，那么面向对象编程就是定义和调用这个集合的属性和方法的过程

+ 多态: 多态实际上是不同对象作用于同一操作产生不同的效果。
	+ 多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答案调用对象的某个行为，你只管调用该行为就是了，其他的一切多态机制都会为你安排妥当
+ 封装:封装就是把过程和数据包围起来，对数据的访问只能通过已定义的界面。封装保证了模块具有较好的独立性，使得程序维护修改较为容易。对应用程序的修改仅限于类的内部，因而可以将应用程序修改带来的影响减少到最低限度。
+ 继承:继承性是子类自动共享父类数据结构和方法的机制，这是类之间的一种关系。在定义和实现一个类的时候，可以在一个已经存在的类的基础之上来进行，把这个已经存在的类所定义的内容作为自己的内容



**jsonp**

本质就是src 的属性可以不受同源策略的影响.
前端请求需要加上 `callback=handlerJsonp`
然后后端就返回 `handlerJsonp({data:data})`,因为返回的是js , 里面的函数就直接执行了.调用的是window对象中的callback函数(需要后端配合)

后端返回值是js ，调用的就是`handlerJsonp` 这个方法

前端需要提前定义这个函数, 在返回值完成后, 就直接执行


https://github.com/root-lucas/react-admin-backend