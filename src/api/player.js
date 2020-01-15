import http from '../utils/http'
const requestSongUrl = (id) => {
  return http.get(`/song/url?id=${id}`)
}

const requestLyric = async (id) => {
  return await http.get(`/lyric?id=${id}`)
}
export default {
  requestSongUrl,
  requestLyric
}