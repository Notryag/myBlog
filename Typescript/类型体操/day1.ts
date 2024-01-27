// type A = 1
// type B = 2
// type C = A extends B ? true : false

// // 返回类型的函数
// let fn = (x, y) => x + y
// type Fn<X, Y> = X | Y

// type StrOrNum = Fn<string, number>
// type Player = Fn<'p1', 'p2'>


// type b = number extends string ? true : false
// 工具类

// type A = string | undefined
// type B = Exclude<A, undefined>

type A = ( string | undefined | null) & {}
type B = undefined & {}