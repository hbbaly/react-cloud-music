import actionType from './actionType'
import Api from '../../../api'
const getBannerList = (data) => ({type: actionType.GET_BANNER_LIST, data})
const getRecommendSingers = (data) => ({type: actionType.GET_RECOMMEND_SINGERS, data})

const requestBanner = () => {
  return async dispatch => {
    let res = await Api.recommendApi.getBannerList()
    dispatch(getBannerList(res.banners))
  }
}
const requestRecommendSingers = () => {
  return async dispatch => {
    let res = await Api.recommendApi.getRecommendSingers()
    dispatch(getRecommendSingers(res.result))
  }
}
export default {
  requestBanner,
  requestRecommendSingers
}