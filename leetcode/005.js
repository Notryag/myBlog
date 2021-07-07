// 给你一个字符串 s，找到 s 中最长的回文子串。
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  // 最长的回文字符串
  if (s.length < 2) {
    return s
  }
  let result = ''
  for (let i = 0; i < s.length; i++) {
    helper(s, i, i)
    helper(s, i, i + 1)
  }

  function helper(s, n, m) {
    while ((n >= 0) && (m < s.length) && (s[n] === s[m])) {
      n--
      m++
    }
    console.log(result.length,n,m);
    if (m - n - 1 > result.length) {
      result = s.slice(n + 1, m)
    }
  }
  return result
}
// https://raw.githubusercontent.com/lion12776/kejilion/main/ss_v2ray_winxray
