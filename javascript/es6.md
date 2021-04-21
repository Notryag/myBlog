### Promise 原理

then 的时候把函数注册到 onResolvedCallbacks 中, 然后在 resolve 中 派发, reject 同理
用 pedding , resolve, reject 用来标记当前 promise 的状态,把 resolve 的 value 放在自身的 value 属性上面, 可以在回调的时候调用

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