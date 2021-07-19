/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let map = {}
  let head = 0
  let left = 0
  let right = 0
  let count = 0
  let min = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < t.length; i++) {
    count++
    if (!map[t[i]]) {
      map[t[i]] = 1
    } else {
      map[t[i]]++
    }
  }
  while (right < s.length) {
    let rItem = s[right]
    if (map[rItem] !== undefined) {
      if (map[rItem] > 0) count--;
      map[rItem]--
    }
    right++
    // 为什么在这做++
    // ‘abc’  ‘abc’ 1 因为 right- left = right - left + 1 相当于正确的长度
    while (count === 0) {
      let lItem = s[left]
      if (right - left < min) {
        min = right - left
        head = left
      }
      if (map[lItem] !== undefined) {
        if (map[lItem] === 0) count++
        map[lItem]++
      }
      left++
    }
  }
  return min === Number.MAX_SAFE_INTEGER ? '' : s.substr(head, min);
};
console.log(minWindow("ADOBECODEBANC", "ABC"))