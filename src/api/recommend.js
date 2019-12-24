import http from '../utils/http'
const getBannerList = () => {
  return http.get('banner/get')
}
const getRecommendSingers = () => {
  return http.get('/personalized')
}
export default {
  getBannerList,
  getRecommendSingers
}