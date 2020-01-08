import actionType from './actionType'
import Api from '../../../api'
const getAlbumDetail = (data) => ({type:actionType.GET_ALBUM_DETAIL, data })
const getSingerSong = (data) => ({type: actionType.GET_SINGERS_SONG, data})
const getSingerDetail = (data) => ({type: actionType.GET_SINGER_DETAIL, data})
const setIsShowMini = (data) => ({type: actionType.SET_SHOW_MINI, data })
const setPlayerList = (data) => ({type: actionType.SET_PLAYER_LIST, data})
const setChooseIndex = (data) => ({type: actionType.CHOOSE_INDEX, data})
const requestAlbumDetail = (id) => {
  return async dispatch => {
    let res = await Api.albumApi.requestAlbumDetail(id)
    dispatch(getAlbumDetail(res.playlist))
  }
}

const requestSingerSong = (id) => {
  return async dispatch => {
    let res = await Api.albumApi.requestSongUrl(id)
    dispatch(getSingerDetail(res.artist))
    dispatch(getSingerSong(res.hotSongs))
  }
}
export default {
  requestAlbumDetail,
  requestSingerSong,
  setIsShowMini,
  setPlayerList,
  setChooseIndex
}