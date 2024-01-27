# 类型体操

### 区分值和类型

```ts
const t = {
    name: 'Jack',
    age: 18,
}
type K = keyof t // 报错：“t”表示值，但在此处用作类型。是否指“类型 t”?ts(2749)

type K = keyof typeof t // type K = 'name' | 'age'
```

### 集合关系理解ts

1. unknown相当于全集，其他所有类型都是unknown的子集。

2. never相当于空集，never是其他所有类型的子集。

3. 联合类型`|`相当于求并集

4. 交叉类型`&`相当于求交集

5. TS工具类Exclude<T, K>相当于求补集

+ 只有父子集的类型，才可以互相断言

+ 其他TS提供的基础类型，比如number，string，null，object，boolean等等，它们之间没有父子集关系，也不存在交集，它们的交叉类型是空集，也就是never
ts复制代码type a = string & number // type a = never

### extends的三种作用
1. 继承
2. 类型约束
3. 判断继承关系


### 内置函数

从集合的角度看，`unknow`相当于全集，其他所有类型都是`unknown`的子集，`{}`加上`null`、再加上`undefined`，就等于`unknown`。

```ts
type Exclude<T, U> = T extends U ? never : T

type NonNullable<T> = T & {}

```

## 映射类型

`Record` `Partial` `Required` `Readonly` `Pick` `Omit`都是通过映射类型来实现的

```ts
type Partial<T> = {
    [P in keyof T]?: T[P] | undefined
} 

type Required<T> = {
    [P in keyof T]-?: T[P]
} 

type Readonly<T> = {
    readonly [P in keyof T]: T[p]
}

type Record<>
```