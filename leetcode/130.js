// 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
//

// 示例 1：

// 输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
// 输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
// 解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
// 示例 2：

// 输入：board = [["X"]]
// 输出：[["X"]]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/surrounded-regions
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  let m = board.length
  if (m === 0) return [[]]
  let n = board[0].length

  const help = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n) return
    if (board[i][j] === 'O') {
      board[i][j] = 'A'
      help(i + 1, j)
      help(i, j + 1)
      help(i - 1, j)
      help(i, j - 1)
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
        if (board[i][j] === 'O') help(i, j)
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if(board[i][j] === "O") board[i][j] = "X"
      if(board[i][j] === "A") board[i][j] = "O"
    }
  }
}
