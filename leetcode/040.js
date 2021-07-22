/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  let result = []
  let cloneCandidates = candidates.sort((a, b) => a - b)
  function backtrack(path,res,oi) {
    if (res === 0 ) {
      result.push(path)
      return
    }
    for(let index=oi;index<cloneCandidates.length;index++) {
      let num = cloneCandidates[index]
      if(res < cloneCandidates[index]) break
      if(oi <index && cloneCandidates[index - 1] ===  num ) continue
      backtrack([...path, num],res-num,index + 1)
    }


  }
  backtrack([],target,0)
  return result
};
console.log(combinationSum2([10,1,2,7,6,1,5], 8))