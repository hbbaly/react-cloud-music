import { fromJS } from 'immutable'
import actionType from './actionType'
const defaultValue = fromJS({
  topListDetail: []
})
const rank = (state = defaultValue, action) => {
  switch (action.type) {
    case actionType.GET_TOP_LIST_DETAIL:
      return state.set('topListDetail', action.data)
    default:
      return state;
  }
}
export default rank
