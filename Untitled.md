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
事件传播分成三个阶段：

捕获阶段：从window对象传导到目标节点（上层传到底层）称为“捕获阶段”（capture phase），捕获阶段不会响应任何事件；
目标阶段：在目标节点上触发，称为“目标阶段”
冒泡阶段：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；

#### html解析
加载html文件,在加载html的同时构建dom树. 遇到html节点就放在dom树中, 遇到js停止解析,运行js
dom树的构建和样式的加载并行进行，dom树加载完之后，构造渲染树。