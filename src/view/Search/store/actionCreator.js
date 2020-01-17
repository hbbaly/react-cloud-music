import actionType from './actionType'
import Api from '../../../api'
const setSearchHot = (data) => ({type: actionType.GET_SEARCH_HOT, data})

const requestSearchHot = () => {
  return async dispatch => {
    let res = await Api.searchApi.getSearchHot()
    console.log(res.result.hots);
    dispatch(setSearchHot(res.result.hots))
  }
}
export default {
  requestSearchHot
}