import actionType from './actionType'
import Api from '../../../api'
const getSingerList = (data) => ({type:actionType.GET_SINGER_LIST, data })

// const defaultData = {
//   limit: 20,
//   offset: 0,
//   cat:'1001',
//   initial: 'A'
// }
const requestSingerList = () => {
  return async (dispatch, getState) => {
    let data = {
      limit: getState().getIn(['singer', 'limit']),
      offset: getState().getIn(['singer', 'offset']),
      cat: getState().getIn(['singer', 'category']),
      initial: getState().getIn(['singer', 'letter']),
    }
    let res = await Api.singerApi.getSingerList(data)
    dispatch(getSingerList(res.artists))
  }
}
const setOffset = (data) => ({type: actionType.SET_OFFSET, data})
const setCategory = (data) => ({type: actionType.SET_CATEGORY, data})
const setLetter = (data) => ({type: actionType.SET_LETTER, data})
export default {
  requestSingerList,
  setOffset,
  setCategory,
  setLetter
}