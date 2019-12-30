import actionType from './actionType'
import { fromJS } from 'immutable'

const defaultValue = fromJS({
  singerList: [],
  offset: 0,
  limit: 20,
  category: '1001',
  letter: 'A'
})

const singer = (state = defaultValue, action) => {
  switch (action.type) {
    case actionType.GET_SINGER_LIST:
      return state.set('singerList', action.data)
    case actionType.SET_OFFSET:
      return state.set('offset', action.data)
    case actionType.SET_CATEGORY:
      return state.set('category', action.data)
    case actionType.SET_LETTER:
      return state.set('letter', action.data)
    default:
      return state
  }
}
export default singer