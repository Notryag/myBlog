## vue原理
通过调用 vue的createApp 创建





问题: 实例如何创建
+ createApp: 
+ createRenderer
+ createAppAPI
	+ createAppAPI 工厂函数,返回一个函数 创建app实例,实例中的mount方法, 其中调用了render方法,这是首次渲染, 把传入的vnode转换为dom,并且放在rootContainer中
+ render 
+ patch 利用patch,中有各种方法对不同的type,执行不同的方法，对component执行processCpmponent方法
+ processComponent 中可以更新和初始挂在component
+ mountComponent  初次挂载component
+ setupComponent  
+ setupStatefulComponent 
+ setupRenderEffect


