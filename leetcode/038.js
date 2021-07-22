/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
  if(n === 1 ) return 1
  function getCount(str) {
    let count = []
    let foo = []
    let result = ''
    for (const key in str) {
      let last = foo[foo.length - 1]
      if(str[key] !== last ) {
        foo.push(str[key])
        count.push(1)
      } else {
        count[count.length - 1] += 1
      }
    }
    count.forEach((c,i) => {
      result +=c +  foo[i]
    })
    return result
  }
  let res = '1'

  for (let index=0;index<n-1;index++){
    console.log(res)
    res = getCount(res)
  }
  return res
}
console.log(countAndSay(5))