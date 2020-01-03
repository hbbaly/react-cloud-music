import actionType from './actionType'
import { fromJS } from 'immutable'

const defaultValue = fromJS({
  albumDetail: {},
  singerSong: {},
  singerDetail: {}
})

const album = (state = defaultValue, action) => {
  switch (action.type) {
    case actionType.GET_ALBUM_DETAIL:
      return state.set('albumDetail', fromJS(action.data))
    case actionType.GET_SINGERS_SONG:
      return state.set('singerSong', fromJS(action.data))
    case actionType.GET_SINGER_DETAIL:
      return state.set('singerDetail', fromJS(action.data))
    default:
      return state
  }
}
export default album