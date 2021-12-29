js 的基本类型 Number, String, null, undefined, Boolean, Symbol, Object, bigInt

object Data、function、Array

### JS是单线程的”指的是JS 引擎线程
`宏任务` 微任务 浏览器渲染 宏任务 在浏览器环境中，有JS 引擎线程和渲染线程，且两个线程互斥。 Node环境中，只有JS 线程。
```js
console.log('start')
setTimeout(() => {
  console.log('setTimeout')
}, 0)
new Promise((resolve) => {
  console.log('promise')
  resolve()
})
  .then(() => {
    console.log('then1')
  })
  .then(() => {
    console.log('then2')
  })

console.log('end')
```
执行所有微任务-->执行一个宏任务(先执行同步代码)-->UI render-->执行所有微任务-->执行下一个宏任务-->UI render-->......

1. 首先执行同步代码，这属于宏任务
2. 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
3. 执行所有微任务
4. 当执行完所有微任务后
5. 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

js有同步任务,有异步任务。在执行同步任务的时候遇到异步代码会将其插入到异步队列中，分为宏任务和微任务队列 执行完宏任务再执行微任务

微任务中添加微任务

```js
Promise.resolve().then(() => {
  console.log(1)
  Promise.resolve().then(() => {
    // 这个任务会插队
    console.log(2)
  })
}).then(() => {
  console.log(3)
})

// 2个promise 并行的时候是执行完一个执行另一个
// 1 3 5
// 2 4 6
// 返回的是 1 2 3 4 5 6

new Promise(resolve => {
  let resolvedPromise = Promise.resolve()
  resolve(resolvedPromise)
}).then(() => {
  console.log('resolvePromise resolved')
})

Promise.resolve()
  .then(() => {
    console.log('promise1')
  })
  .then(() => {
    console.log('promise2')
  })
  .then(() => {
    console.log('promise3')
  })

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

+ instanceof 原理

```js
L instanceof R
L.__proto__ === R.prototype

foo instanceof Foo
// 实际调用的是
Foo[Symbol.hasInstance](foo)
```


#### jsonp

本质就是src 的属性可以不受同源策略的影响. 前端请求需要加上 `callback=handlerJsonp`
然后后端就返回 `handlerJsonp({data:data})`,因为返回的是js , 里面的函数就直接执行了.调用的是window对象中的callback函数(需要后端配合)
后端返回值是js ，调用的就是`handlerJsonp` 这个方法 前端需要提前定义这个函数, 在返回值完成后, 就直接执行

https://github.com/root-lucas/react-admin-backend

### 执行上下文

#### closure 闭包 其实是绑定了执行环境的函数

函数声明 function foo()
函数表达式 var lee = function()

```js
function changeSize(size) {
  return function () {
    document.body.style.fontSize = size + 'px';
  };
}

// 可用于提前确定（状态)
var size12 = changeSize(12);
```

#### 原型链

原型链是由原型对象组成，，每个对象都有`__proto__` 属性，指向了创建该对象的构造函数的原型，__proto__ 将对象连接起来组成了原型链。是一个用来实现继承和共享属性的对象链。

![img](https://img2018.cnblogs.com/blog/850375/201907/850375-20190708153139577-2105652554.png)

![img](https://upload-images.jianshu.io/upload_images/13902845-babea8f0cde0d791.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

```js
Function.__proto__ === Function.prototype
```

在js中对基础类型进行指定方法的操作相当于在后台创建了一个对应类型的对象， 用对象的方法进行操作

```js
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;
```

用于寻找自身的属性，现在自己身上找，找不到会向上一步步根据原型链查找 Object/Array/String 等等构造函数本质上和 Function 一样，均继承于Function.prototype。

### 继承
目的: 可以在children中使用 `parent` 的属性和方法, 包括prototype上面的

1、原型链继承
+ 核心： 将父类的实例作为子类的原型

2、构造继承
+ 核心：使用父类的构造函数来增强子类实例`Animal.call(this);`

3. 组合继承
+ 核心：组合原型链继承和借用构造函数继承

4. 寄生组合继承

```js
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
// status one
var F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F();
// status two
Child.prototype = Object.create(Person.prototype);
Child.prototype.constructor = Child;

```

通过call方法可以继承function内部的方法, 通过新建一个function可以继承prototype上面的属性和方法

### 事件委托/冒泡

事件传播分成三个阶段：

捕获阶段：从window对象传导到目标节点（上层传到底层）称为“捕获阶段”（capture phase），捕获阶段不会响应任何事件； 目标阶段：在目标节点上触发，称为“目标阶段”
冒泡阶段：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；

### html解析

加载html文件,在加载html的同时构建dom树. 遇到html节点就放在dom树中, 遇到js停止解析,运行js dom树的构建和样式的加载并行进行，dom树加载完之后，构造渲染树。

### new运算符的执行过程

+ 新生成一个对象
+ 链接到原型: obj.__proto__ = Con.prototype
+ 绑定this: apply
+ 返回新对象(如果构造函数有自己 retrun 时，则返回该值)


第三个参数默认为false,在冒泡期间执行.为true时,在捕获阶段执行
```js
element.addEventListener(event, function, useCapture=false)
```

forEach 中不能跳出循环,return 只能跳出一次循环
如果一定需要循环,可以用 throw 报错,外层需要用trycatch 包裹


ajax原生
```js
var xhr = new XMLHttpRequest();
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");// get请求不需要
xhr.open('post', '02.post.php' );
xhr.send('name=fox&age=18');
xhr.onreadystatechange 
```
1. 新建xhr对象
2. 设置请求头
3. 设置url参数open
4. 发送请求 send
5. 添加监听

前端的设计模式：
+ 单例模式   
+ 观察者模式
+ 工厂模式
+ 策略模式

typeof 返回值number, string, boolean, undefined, object, function,symbol
 ```js
 typeof null === 'object'
 typeof Date === 'function'
 typeof new Date() === 'object'
 ```
