# flex 布局

水平的主轴和垂直的交叉轴, 默认为`水平主轴`排列

分为`容器`的属性和`项目`的属性

## 容器的属性
row为主轴(`x轴`), column为交叉轴(`y轴`)

```less
.main {
    flex-direction: row | row-reverse | column | column-reverse;
    flex-wrap: nowrap | wrap | wrap-reverse;
    flex-flow: flex-flow: <flex-direction> <flex-wrap>;
    // 调整主轴
    justify-content: flex-start | flex-end | center | space-between | space-around;
    // 调整交叉轴
    align-items: flex-start | flex-end | center | baseline | stretch;
    // 交叉轴多轴线的时候
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}

.item {
    order: <integer>;
    flex-grow: <number>; /* default 0 */
    flex-shrink: <number>; /* default 1 */
    flex-basis: <length> | auto; /* default auto */
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    // 交叉轴的item的位置
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}

```

注意交叉轴和主轴的分别