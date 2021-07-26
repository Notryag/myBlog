/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let area = 0
  let i = 0
  let j = height.length - 1
  while(i < j) {
    let left = height[i]
    let right = height[j]
    let tempArea =(j - i + 1) * Math.min(left, right)
    if(tempArea > area) {
      area = tempArea
    }
    left < right ? left++ : right--
  }
  return area
};