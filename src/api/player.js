import http from '../utils/http'
const requestSongUrl = (id) => {
  return http.get(`/song/url?id=${id}`)
}


export default {
  requestSongUrl
}