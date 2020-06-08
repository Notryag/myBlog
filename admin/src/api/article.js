export function fetchList(query) {
  return axios({
    url: '/article/list',
    method: 'get',
    params: query
  })
}