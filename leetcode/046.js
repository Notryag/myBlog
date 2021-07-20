/*
* 回溯算法 相当于递归反过来用
* 重要的是
* 1. 找到结束条件
* 2. 循环条件
* */
const permute = nums => {
  let res = []
  const backtrack  = (path)=> {
    if(path.length === nums.length) {
      res.push(path)
    }
    nums.forEach(item => {
      if(path.includes(item)) return
      backtrack([...path, item])
    })
  }
  backtrack([])
  return res
};
console.log(permute( [1,2,3]))