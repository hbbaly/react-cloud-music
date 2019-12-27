import http from '../utils/http'
const getSingerList = (params) => {
  return http.get(`/artist/list`, params)
}

export default {
  getSingerList
}