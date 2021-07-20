/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n <= 0) return []

  let result = []

  const backtrack = (path, left, right) => {
    if( left > n || right > left) return

    if (path.length === n * 2) {
      result.push(path)
      return
    }
    ['(', ')'].forEach((item, index) => {
      let temLeft = index === 0 ? left + 1 : left
      let temRigt = index === 0 ? right: right + 1
      backtrack(path + item, temLeft, temRigt)
    })
  }
  backtrack('(', 1, 0)
  return result
};

console.log(generateParenthesis(3))