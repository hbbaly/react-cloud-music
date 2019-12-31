import http from '../utils/http'
const getTopListDetail = (params) => {
  return http.get(`/toplist/detail`, params)
}

export default {
  getTopListDetail
}