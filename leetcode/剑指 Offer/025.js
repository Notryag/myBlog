/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let res = new ListNode();
  let [L, R] = [l1, l2]
  let p = res;
  while (L && R) {
    if (L.val < R.val) {
      p.next = L
      L = L.next
    } else {
      p.next = R
      R = R.next
    }
    // import 需要一个类似指针的,
    p = p.next
  }
  p.next = L ? L : R
  return res.next
};