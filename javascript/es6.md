+ let const 
+ 扩展运算符 
+ promise 
+ class 
+ async/await  
+ set/map 默认参数  
+ map/reduce/some/find/every/
+ 箭头函数

let const var 的区别
1. var 有变量提升,let const 暂时性死区
2. 块级作用域

map和object区别
1. map 是有顺序的
2. 赋值取值方法不同
3. Map 在存储大量元素的时候性能表现更好，特别是在代码执行时不能确定 key 的类型的情况。

set中重复的对象,只能去重引用地址相同的对象

### Promise 原理

then 的时候把函数注册到 onResolvedCallbacks 中，在callback中调用的resolve，reject
在callback中这个顺序不是异步的，在调用resolve的时候就是异步完成的时候
关键是promise有then，这个then中的函数需要注册到promise的对象上面，然后在promise中resolve执行的时候执行then中的callback函数
并且改变promise的状态

```js
const PENDING = 'PENDING'
const RESOLVE = 'RESOLVE'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = (value) => {
      if (this.state === PENDING) {
        this.state = RESOLVE
        this.value = value
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }
    let reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === RESOLVE) {
      onFulfilled(this.value)
    }
    if (this.state === REJECTED) {
      onRejected(this.reason)
    }
    if (this.state === PENDING) {
      this.onResolvedCallbacks.push(() => {
        // TODO...
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        // TODO...
        onRejected(this.reason)
      })
    }
  }
}

module.exports = Promise

function getPromise() {
  return new Promise((resolve, reject) => {
    resolve()
    reject()
  })
}

let a = getPromise().then(data => {
  console.log(data)
})
```

Symbol

```js
let name = Symbol('我的英文名为Joker')
console.log(name) //Symbol(我的英文名为Joker)
```

可以用 name.description 获取内容 ('我的英文名为 Joker')

iterator

```js
function makeIterator(array) {
  var nextIndex = 0
  return {
    next: function () {
      return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { value: undefined, done: true }
    },
  }
}
let arr = ['a', 'b', 'c']
let iter = arr[Symbol.iterator]()
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

是否可遍历,却决于有没有 Symbol.itreator , object 对象就没有 iterator 属性


### Generator函数

调用 Generator 函数后，该函数并不执行,返回的是一个遍历器对象(Iterator Object)

```js
var hw = helloWorldGenerator();
hw.next()

function* demo() {
  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
var a = demo()
a.next() // {value: undefined, done: false}
a.next() // Helloundefined {value: 123, done: false}
a.next() // Helloundefined {value: undefined, done: true}

var b =demo()
b.next()  // {value: undefined, done: false}
b.next() // Helloundefined {value: 123, done: false}
b.next(1321321) // Hello1321321 {value: undefined, done: true}
```

+ yield表达式本身没有返回值，或者说总是返回undefined

+ next方法可以带一个参数，该参数就会被当作`上一个`yield表达式的返回值。