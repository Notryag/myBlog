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
1. 容器的属性

+ flex-direction
+ flex-wrap
+ flex-flow
+ justify-content
+ align-items
+ align-content

justify-content: flex-start | flex-end | center | space-between | space-around;
space-between 2边没有空隙 space-around 2边有空袭
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

2. 项目的属性

+ order
+ flex-grow  默认为0,即如果存在剩余空间，也不放大。
+ flex-shrink 默认为1，即如果空间不足，该项目将缩小。为0空间不足也不缩小
+ flex-basis 
+ flex  默认0 1 auto;有2个快捷值auto (1 1 auto) 和 none (0 0 auto)。
+ align-self align-self属性允许单个项目有与其他项目不一样的对齐方式


### rem
rem是根元素字体的单位，比如 html{font-size:16px;} ，1rem相当于16px。
布局用flex  大小用rem
