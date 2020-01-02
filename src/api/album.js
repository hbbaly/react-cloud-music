import http from '../utils/http'
const requestAlbumDetail = (id) => {
  return http.get(`/playlist/detail?id=${id}`)
}

export default {
  requestAlbumDetail
}