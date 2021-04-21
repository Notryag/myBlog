# todo

+ 了解keep-alive原理

+ 路由懒加载原理


+ axios封装原理 和fetch不同
axios 封装的原生ajax，是XMLHTTPRequest的一个实例；
fetch 是全局的window的一个方法，用promise用来处理结果

+ vuex 原理

利用vue.mixin和生命周期注入
vuex的响应式是new Vue(),一个新的vue对象,  getter 是computed
state放在$$state中

+ import和require的区别

require 是 AMD规范引入方式
import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法
调用时间

require是运行时调用，所以require理论上可以运用在代码的任何地方
import是编译时调用，所以必须放在文件开头,import会返回一个Promise对象

watch 一个computed属性会怎么样