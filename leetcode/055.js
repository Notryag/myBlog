/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let max = 0
  for (let i = 0; i < nums.length; i++) {
    let item = nums[i]
    if (max >= i) {
      max = Math.max(max, i + item)
    }
  }
  return max >= nums.length - 1
};