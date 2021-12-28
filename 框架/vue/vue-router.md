hash 实现
hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，改变 URL 中的 hash 部分不会引起页面刷新

通过 hashchange 事件监听 URL 的变化，改变 URL 的方式只有这几种：通过浏览器前进后退改变 URL、通过<a>标签改变 URL、通过window.location改变URL，这几种情况改变 URL 都会触发 hashchange 事件

history 实现
history 提供了 pushState 和 replaceState 两个方法，这两个方法改变 URL 的 path 部分不会引起页面刷新

history 提供类似 hashchange 事件的 popstate 事件，但 popstate 事件有些不同：通过浏览器前进后退改变 URL 时会触发 popstate 事件，通过pushState/replaceState或<a>标签改变 URL 不会触发 popstate 事件。好在我们可以拦截 pushState/replaceState的调用和<a>标签的点击事件来检测 URL 变化，所以监听 URL 变化可以实现，只是没有 hashchange 那么方便。 

vuex 利用vue的mixin的注入机制，在beforeCreate生命周期中注入vuexinit方法，这个方法实现了vuex的实例，