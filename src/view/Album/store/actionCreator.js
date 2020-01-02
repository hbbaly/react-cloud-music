import actionType from './actionType'
import Api from '../../../api'
const getAlbumDetail = (data) => ({type:actionType.GET_ALBUM_DETAIL, data })

const requestAlbumDetail = (id) => {
  return async dispatch => {
    let res = await Api.albumApi.requestAlbumDetail(id)
    dispatch(getAlbumDetail(res.playlist))
  }
}
export default {
  requestAlbumDetail
}