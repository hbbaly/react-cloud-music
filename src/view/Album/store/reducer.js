import actionType from './actionType'
import { fromJS } from 'immutable'

const defaultValue = fromJS({
  albumDetail: {}
})

const album = (state = defaultValue, action) => {
  switch (action.type) {
    case actionType.GET_ALBUM_DETAIL:
      return state.set('albumDetail', fromJS(action.data))
    default:
      return state
  }
}
export default album