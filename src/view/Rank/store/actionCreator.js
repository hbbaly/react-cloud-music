import actionType from './actionType'
import Api from '../../../api'
const getTopListDetail = (data) => ({type: actionType.GET_TOP_LIST_DETAIL, data})
const requestTopListDetail = () => {
  return async dispatch => {
    let res = await Api.rankApi.getTopListDetail()
    dispatch(getTopListDetail(res.list))
  }
}
export default {
  requestTopListDetail
}