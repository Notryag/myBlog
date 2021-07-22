/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  let result = []

  function backtrack(path) {
    let final = 0
    path.forEach(p => {
      final += p
    })
    if(final === target) {
      result.push(path)
      return
    } else if(final > target) {
      return
    }

    candidates.forEach(num => {
      if( num >= path[path.length -1 ] || path[path.length -1 ] === undefined) {
        backtrack([...path, num])
      }
    })

  }
  backtrack([])

  return result
};
console.log(combinationSum([2,3,6,7], 7))

// todo 优化
// 可以在backtrack中就计算 final的值, res - num 算出所需剩余的值