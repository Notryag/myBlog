# router

什么叫路由？ 核心根据不同的路径跳转不同的组件

new vue的时候，放入router，这个是判断是否是顶层的标记

利用`this.$options.router`可以获取到router

1. 利用vue.mixin注入router的生命周期等,在所有的组件上添加了_rootRoot属性



createMatcher 扁平化用户传入的数据, 创建路由映射表

addRoutes : 动态添加路由

根据模式mode创建不同的路由对象 `this.history = new HasHistory(this)`

  