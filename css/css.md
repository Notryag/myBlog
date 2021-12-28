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

**标准盒模型**
一个块的总宽度= width + margin(左右) + padding(左右) + border(左右)
标准盒模型
width指content部分的宽度
怪异盒模型
width表示content+padding+border这三个部分的宽度

#### BFC
BFC(Block formatting context)直译为"块级格式化上下文"

创建bfc
1. float的值不是none。
2. 绝对定位元素(absolute fixed)。
3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4. overflow的值不是visible的快元素

作用
清除浮动
避免外边距重叠
防止浮动元素覆盖


getComputedStyle能读取所有css属性。width 不包含padding & border  有单位
getBoundingClientRect可以放心大胆使用，没有副作用。但getBoundingClientRect能读取属性没有getStyle丰富 无单位
等同于offsetWidth和offsetHeight 。 包含了padding和border. 无单位
统一：3种方法使用，要把布局模式设置为box-sizing: box-border.


屏幕适配
1. 媒体查询
2. rem em 
3. flex布局

flexible.js 实现用js来自动根据屏幕宽度设置 html元素的font-size的值。
[移动端适配](https://www.jianshu.com/p/7139c05c7971)
1. 15年手淘方案：Flexible + rem (`因为vw当时浏览器支持不多`)
2. 纯粹使用 vw 方案
3. vw + rem，优化布局： 就是限制元素字体的最大最小值

### 盒模型
怪异盒模型: content + padding + border
标准盒模型: content
设置同样宽度下，标准盒模型更大，因为相当于设置的content的宽度


垂直居中:
1. flex
2. absolute + transform
3. absolute + 负margin
4. inline-block + vertical-aligin
5. `margin:50% auto;`+ `transform: translateY(-50%);` 块级元素