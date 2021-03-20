# router

什么叫路由？ 核心根据不同的路径跳转不同的组件

new vue的时候，放入router，这个是判断是否是顶层的标记

利用`this.$options.router`可以获取到router

1. 利用vue.mixin注入router的生命周期等,在所有的组件上添加了_rootRoot属性



createMatcher 扁平化用户传入的数据, 创建路由映射表

addRoutes : 动态添加路由

根据模式mode创建不同的路由对象 `this.history = new HasHistory(this)`

history 路由实现依赖于html5的新增api history.pushState(),可以操作浏览器的历史记录，而不会引起页面的刷新

hash 和 pushState 对比有如下缺点：

1. hash只能修改url的片段标识符的部分。并且必须从#号开始，但是pushState且能修改路径、查询参数和片段标识符。pushState比hash更符合前端路由的访问方式，更加优雅(因为不带#号)。

2. hash必须和原先的值不同，才能新增会话浏览历史的记录，但是pushState可以新增相同的url的记录，

1.1 使用hashchange事件来监听url hash的改变


# vuex
todo
vuex 原理