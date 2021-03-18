# css 基础

## 回流重绘
获取到html解析成dom树, 解析css成样式结构体,组成render tree
通过render渲染(render不包含隐藏的元素)
回流一定引起重绘, 重绘不一定回流
回流是元素大小,位置,显隐的改变
重绘是元素的样式改变


## BFC 
float的值不为none；
overflow的值不为visible；
position的值为fixed / absolute；
display的值为table-cell / table-caption /` inline-block` / flex / inline-flex

计算BFC的高度时，浮动元素也参与计算

消除浮动 
防止margin重叠

## flex各个属性


### rem
rem是根元素字体的单位，比如 html{font-size:16px;} ，1rem相当于16px。
布局用flex  大小用rem
