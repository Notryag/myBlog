/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if(numRows === 1) {
        return s
    }
    let result = []
    let down = false
    let index = 0
    let str = ''
    let len = Math.min(s.length, numRows)
    for(let j=0;j<len;j++) result[j] =''
    for(let i=0;i<s.length;i++) {
        let item = s[i]
        result[index] += item
        // 注意第一次进入index必为0, 所以预先设计为 false
        if(index === numRows-1 || index === 0) {
            down = !down
        }
        if(down) {
            index += 1
        }else {
            index -= 1
        }
    }
    for (const resultElement of result) {
        str += resultElement
    }

    return str
};
console.log(convert("PAYPALISHIRING", 3))
