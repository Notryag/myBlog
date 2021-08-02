/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let dp = []
  dp[0] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    let item = nums[i]
    dp[i] = Math.max(dp[i - 1] + item, item)
  }
  return Math.max(...dp)
};
console.log(maxSubArray( [-2,1,-3,4,-1,2,1,-5,4]))