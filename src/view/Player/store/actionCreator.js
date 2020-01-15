import actionType from './actionType'
import Api from '../../../api'
const getIsShowMini = (data) => ({type: actionType.IS_SHOW_MINI, data })
const setSongDetail = (data) => ({type: actionType.GET_SONG_URL, data})
const setPlayMode = (data) => ({type: actionType.SET_PLAY_MODE, data})
const setSongLyric = (data) => ({type: actionType.GET_SONG_LYRIC, data})

const requestSongUrl = (id) => {
  return async dispatch => {
    let res = await Api.playerApi.requestSongUrl(id)
    dispatch(setSongDetail(res.data[0]))
  }
}

const requestSongLyric = (id) => {
  return async dispatch => {
    let res = await Api.playerApi.requestLyric(id)
    if (res.lrc && res.lrc.lyric) dispatch(setSongLyric(res.lrc.lyric))
  }
}

export default {
  getIsShowMini,
  requestSongUrl,
  setPlayMode,
  requestSongLyric
}