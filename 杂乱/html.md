### 2栏布局
1. flex
```css
.left {
    height: 200px;
    background: purple;
    flex:0 0 200px
}
.right {
    background: skyblue;
    height: 200px;
    flex: 1;
}
```
2. 使用浮动/absolute
+ 就是左边浮动,右边使用margin-left
+ absolute同理
+ 也可左右走`float:left`,然后右边使用calc
```css
/* float */
.left {
    float: left;
    width: 200px;
    height: 200px;
    background: purple;
}

/* absolute */
.left {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 200px;
    background: purple;
}

.right {
    margin-left: 200px;
    background: skyblue;
    height: 200px;
}
```


伪类
+ :active
+ :focus
+ :hover

伪元素
+ before
+ after
+ first-letter
  

1. 新增语义化标签
main footer header nav aside article e section embed video aidop 
优点
+ 增加语义化
+ 有利于seo
+ 结构清晰

行内元素: span  i  a br em img input select textarea
块级元素: div  h1 ul ol table 


box-sizing：content-box   //标准盒模型
box-sizing：border-box    //怪异盒模型


网络阶段: 构建请求行、查询强缓存、DNS解析、建立TCP链接、发送HTTP请求、响应请求
解析阶段：解析html、构建dom树、计算样式、生成布局树
渲染阶段：生成图层树、生成绘制列表、生成图块、优先选择视图附近的图块生成位图数据、展示内容

+ 解析HTML，生成DOM树，解析CSS，生成CSSOM树
+ 将DOM树和CSSOM树结合，生成渲染树(Render Tree)
+ Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
+ Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
+ Display:将像素发送给GPU，展示在页面上。（这一步其实还有很多内容，比如会在GPU将多个合成层合并为同一个层，并展示在页面中。而css3硬件加速的原理则是新建合成层，这里我们不展开，之后有机会会写一篇博客）

减少回流重绘
+ 批量修改DOM
+ 使用cssText
+ 修改CSS的class
+ DOM脱离文档流

使用`transform:translateZ(0)` GPU加速