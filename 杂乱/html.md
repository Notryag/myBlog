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