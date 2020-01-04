import actionType from './actionType'
import { fromJS } from 'immutable'

const defaultValue = fromJS({
  albumDetail: {},
  singerSong: {},
  singerDetail: {},
  isShowMini: false,
  playerList: []
})

const album = (state = defaultValue, action) => {
  switch (action.type) {
    case actionType.GET_ALBUM_DETAIL:
      return state.set('albumDetail', fromJS(action.data))
    case actionType.GET_SINGERS_SONG:
      return state.set('singerSong', fromJS(action.data))
    case actionType.GET_SINGER_DETAIL:
      return state.set('singerDetail', fromJS(action.data))
    case actionType.SET_SHOW_MINI:
      return state.set('isShowMini', fromJS(action.data))
    case actionType.SET_PLAYER_LIST:
      return state.set('playerList', fromJS(action.data))
    default:
      return state
  }
}
export default album