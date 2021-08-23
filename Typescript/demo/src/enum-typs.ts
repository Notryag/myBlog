export {}

// const PostStatus = {
//   Draft:0,
//   Published:1
// }

enum PostStatus {
  Draft=0,
  Published=1
}
// 单项
const enum Status {
  Draft=0,
  Published=1
}

const post = {
  status:PostStatus.Draft // 1 // 0
}

console.log(post.status);
