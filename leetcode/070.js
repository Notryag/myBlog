// 一开始的想法:
// 最后的值是前2个值相加,f(x-1) + f(x -2) = f(x)
// 求f(n) 就是 1 + 2 + 3直到 x = n,

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {

  let dp = [1,1]
  for (let i=2;i<=n;i++) {
    dp[i] = dp[i -1] + dp[i - 2]
  }
  return dp[n]
}
console.log(climbStairs(4))