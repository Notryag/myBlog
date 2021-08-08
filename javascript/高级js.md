### 闭包
+ 闭包让你可以在一个内层函数中访问到其外层函数的作用域。
> 闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。

### this指向

1. 指向直接调用的对象
```js
var o = {
    a: 10,
    b:  {
        fn: function(){
            console.log(this.a); // undefined
            console.log(this);   // b对象
        }
    }
}
//调用 
o.b.fn();  
```


### instanceof 内部机制
```js
function instance_of(L, R) { //L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while ( true ) {
    if (L === null )
      return false ;
    if (O === L) // 这里重点：当 O 严格等于 L 时，返回 true
      return true ;
    L = L.__proto__;
  }
}
```
