import actionType from './actionType'
import { fromJS } from 'immutable'
const defaultValue = fromJS({
  isShowMini: false
})
const player = (state = defaultValue, action) => {
  switch (action.type) {
    case actionType.IS_SHOW_MINI:
      return state.set('isShowMini', action.data)
    default:
      return state
  }
}
export default player