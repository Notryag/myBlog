function createNumberArray(length: number, value: number): number[] {
  return Array<number>(length).fill(value)
}
// 在小括号前面指定泛型
function createArry<T>(length: number, value: T): T[] {
  return Array<T>(length).fill(value)
}

// 在执行的时候指定类型
const res = createArry<string>(3, 'foo')
