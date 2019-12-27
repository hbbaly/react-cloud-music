import actionType from './actionType'
import Api from '../../../api'
const getSingerList = (data) => ({type:actionType.GET_SINGER_LIST, data })

const defaultData = {
  limit: 20,
  offset: 0,
  cat:1001,
  initial: 'A'
}
const requestSingerList = (data = defaultData) => {
  return async dispatch => {
    let res = await Api.singerApi.getSingerList(data)
    dispatch(getSingerList(res.artists))
  }
}
export default {
  requestSingerList
}