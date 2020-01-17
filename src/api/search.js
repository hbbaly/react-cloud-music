import http from '../utils/http'
const getSearchHot = (params) => {
  return http.get(`/search/hot`, params)
}

export default {
  getSearchHot
}