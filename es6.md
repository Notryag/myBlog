### Promise原理
then的时候把函数注册到 onResolvedCallbacks 中, 然后在resolve中 派发, reject同理
用pedding , resolve, reject 用来标记当前promise的状态,把resolve 的value 放在自身的value 属性上面, 可以在回调的时候调用

```js
const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value) => {

            if (this.state === PENDING) {
                this.state = RESOLVE;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject)
        } catch(e) {
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

module.exports = Promise;

```


Symbol


```js
let name = Symbol('我的英文名为Joker');
console.log(name) //Symbol(我的英文名为Joker)
```
可以用name.description 获取内容 ('我的英文名为Joker')


iterator 

```js
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```
是否可遍历,却决于有没有 Symbol.itreator , object 对象就没有 iterator属性
