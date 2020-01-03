import http from '../utils/http'
const requestAlbumDetail = (id) => {
  return http.get(`/playlist/detail?id=${id}`)
}

const requestSingerSong = (id) => {
  return http.get(`/artists?id=${id}`)
}

export default {
  requestAlbumDetail,
  requestSingerSong
}