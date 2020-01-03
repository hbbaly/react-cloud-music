import actionType from './actionType'
import Api from '../../../api'
const getAlbumDetail = (data) => ({type:actionType.GET_ALBUM_DETAIL, data })
const getSingerSong = (data) => ({type: actionType.GET_SINGERS_SONG, data})
const getSingerDetail = (data) => ({type: actionType.GET_SINGER_DETAIL, data})
const requestAlbumDetail = (id) => {
  return async dispatch => {
    let res = await Api.albumApi.requestAlbumDetail(id)
    dispatch(getAlbumDetail(res.playlist))
  }
}

const requestSingerSong = (id) => {
  return async dispatch => {
    let res = await Api.albumApi.requestSingerSong(id)
    dispatch(getSingerDetail(res.artist))
    dispatch(getSingerSong(res.hotSongs))
  }
}
export default {
  requestAlbumDetail,
  requestSingerSong
}