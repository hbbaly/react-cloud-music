import ActionTypes from './actionType'
import { fromJS } from 'immutable'

const defaultValue = fromJS({
  bannerList: [],
  recommendSingers: []
})

const recommend = (state = defaultValue, action) => {
  switch (action.type) {
    case ActionTypes.GET_BANNER_LIST:
      return state.set('bannerList',action.data)
    case ActionTypes.GET_RECOMMEND_SINGERS:
      return state.set('recommendSingers',action.data)
    default:
      return state
  }
}
export default recommend