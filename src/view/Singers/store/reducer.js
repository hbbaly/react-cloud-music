import actionType from './actionType'
import { fromJS } from 'immutable'

const defaultValue = fromJS({
  singerList: []
})

const singer = (state = defaultValue, action) => {
  switch (action.type) {
    case actionType.GET_SINGER_LIST:
      return state.set('singerList', action.data)
    default:
      return state
  }
}
export default singer