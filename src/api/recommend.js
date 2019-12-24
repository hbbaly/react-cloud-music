import http from '../utils/http'
const getBannerList = () => {
  return http.get('banner/get')
}
export default {
  getBannerList
}