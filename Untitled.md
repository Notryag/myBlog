### 执行上下文

#### closure 闭包 其实是绑定了执行环境的函数

函数声明 function foo()
函数表达式 var lee =  function()
```js
function changeSize(size){
    return function(){
        document.body.style.fontSize = size + 'px';
    };
}
// 可用于提前确定（状态)
var size12 = changeSize(12);
```

#### 原型链

![img](https://img2018.cnblogs.com/blog/850375/201907/850375-20190708153139577-2105652554.png)



![img](https://upload-images.jianshu.io/upload_images/13902845-babea8f0cde0d791.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

```js
Function.__proto__ === Function.prototype
```

#### 继承 


#### 事件委托/冒泡