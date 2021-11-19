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