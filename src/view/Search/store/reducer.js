import ActionTypes from './actionType'
import { fromJS } from 'immutable'

const defaultValue = fromJS({
  hotSearch: []
})

const search = (state = defaultValue, action) => {
  switch (action.type) {
    case ActionTypes.GET_SEARCH_HOT:
      return state.set('hotSearch',fromJS(action.data))
    default:
      return state
  }
}
export default search