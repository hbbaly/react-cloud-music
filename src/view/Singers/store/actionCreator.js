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
    let params = getState()
    let offset = params.getIn(['singer', 'offset'])

    let data = {
      limit: params.getIn(['singer', 'limit']),
      offset,
      cat: params.getIn(['singer', 'category']),
      initial: params.getIn(['singer', 'letter']),
    }
    let res = await Api.singerApi.getSingerList(data)
    let prevList = getState().getIn(['singer', 'singerList'])
    offset === 0 ? dispatch(getSingerList(res.artists)) : dispatch(getSingerList([...prevList, ...res.artists]))
  }
}
const setOffset = (data) => ({type: actionType.SET_OFFSET, data})
const setCategory = (data) => {
  return dispatch => {
    dispatch({type: actionType.SET_OFFSET, data: 0})
    // dispatch(getSingerList([]))
    dispatch({type: actionType.SET_CATEGORY, data})
  }
}
const setLetter = (data) => {
  return dispatch => {
    dispatch({type: actionType.SET_OFFSET, data: 0})
    // dispatch(getSingerList([]))
    dispatch({type: actionType.SET_LETTER, data})
  }
}
export default {
  requestSingerList,
  setOffset,
  setCategory,
  setLetter
}