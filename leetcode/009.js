/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) return false
  x = x + ''
  let result = true
  let i = 0
  let j = x.length - 1
  while (i < j) {
    if (x[i] !== x[j]) {
      result = false
      break
    }
    i++
    j--
  }
  return result
};