import actionType from './actionType'
import Api from '../../../api'
const getIsShowMini = (data) => ({type: actionType.IS_SHOW_MINI, data })
const setSongDetail = (data) => ({type: actionType.GET_SONG_URL, data})
const setPlayMode = (data) => ({type: actionType.SET_PLAY_MODE, data})
const requestSongUrl = (id) => {
  return async dispatch => {
    let res = await Api.playerApi.requestSongUrl(id)
    dispatch(setSongDetail(res.data[0]))
  }
}
export default {
  getIsShowMini,
  requestSongUrl,
  setPlayMode
}