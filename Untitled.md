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

在js中对基础类型进行指定方法的操作相当于在后台创建了一个对应类型的对象， 用对象的方法进行操作
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;



用于寻找自身的属性，现在自己身上找，找不到会向上一步步根据原型链查找
Object/Array/String 等等构造函数本质上和 Function 一样，均继承于Function.prototype。



#### 继承 


#### 事件委托/冒泡