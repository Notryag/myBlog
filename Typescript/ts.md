# TypeScript

初始化
> tsc  = typescript compile

```
yarn init -y
yarn add typescript --dev
yarn tsc --init

yarn tsc
//显示中文
yarn tsc --local zh-CN

```
基础类型

- any
- number
- string
- boolean
- 数组类型
  - `let arr: number[]`
  - `let arr: Array<number>`
- 元组
  - 已知元素数量和类型的数组
    - `let x: [string, number]`
- 枚举
  - 一个枚举中只会存在几个固定的值
  - 会编译为 双向的键值对对象 {a:1,1:a},也可以常量枚举  前面加 `const`
  - 数字会自增,字符串必须要全部初始化
- Object
  - 也就是除number，string，boolean，symbol，null或undefined之外的类型
- void
- null
- undefined
- never

如果找不到对应的版本,可以用标准库
便准库是内置对象所对应的声明
> "lib": ["ES2015","DOM"]  symbole console


作用域冲突,可以在最后添加以下代码,把当前文件当作单独模块防止命名冲突
```ts
export {}
```

函数的返回值类型放在`括号`后面
```ts
function fun1(a:number, b:number):string {return ''}
```

### 断言

就是告诉浏览器是什么
不是类型转换

```ts
;(<string>someValue).length(someValue as string).length

interface Props {
  x: number
}
let a = <Props>{}
let a = {} as Props
let a: Props = {}
a.x = 3
```

## interface 接口

对象成员进行限制
只是进行约束,在编译成 js 后没有意义

```ts
interface Post {
  title: string
  content: string
}
function prientPost(post: Post) {
  console.log(post.title, post.string)
}
```

### 动态成员

`key` 不是固定的

```ts
interface Cache {
  [key: string]: string
}
const cache: Cache = {}
cache.foo = 'value1'
```

## 增强 class 语法

```ts
class Persion {
  name: string = 'init'
  private name: number = 0 // 必须要有初始值, 在constructor中赋值也可
  protected gender: boolean // 可以在字类中访问
  constructor(name: string, age: string) {
    this.name = name // 要明确提前声明属性,不能在constructor中直接添加
    this.age = age
    this.gender = true
  }
  sayHi(msg: string): void {
    console.log(this.name, meg)
  }
}
const tom = new Person('tom', 18)
// 不能直接访问age, tom.age
// 也不能访问 gender
class Student extends Person {
  private constructor (name: string, age: number) {
    super(name, age)
  }
  static create(name: string, age: number) {
    return new Student(name, age)
  }
}
let jack = Student.create('jack', 18)
```
