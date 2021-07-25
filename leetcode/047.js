/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  let result = []
  let used = new Array(nums.length)

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push(path)
      return
    }
    for (let i = 0; i < nums; i++) {
      let item = nums[i]
      if (i > 0 && nums[i - 1] === item &&





        used[i - 1]) continue
      if (!used[i]) {
        used[i] = true
        path.push(item)
        backtrack(path)
        path.pop()
        used[i] = false
      }

    }
  }

  backtrack([])
  return result
};
console.log(permuteUnique([1, 1, 2]))
// 不能2a1b1 2b1a1 因为这样会产生2个 211 就需要在向下递归的时候提前判断, 跳出这个循环
// 第一 nums[i -1] === nums[i] 一定要有, 其次还需要有个条件对它进行限制, 首先就是不能每个都跳过
// 如果只取重复值的最后一个?
// 还有一个就是需要排除已经push的值?