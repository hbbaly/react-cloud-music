import actionType from './actionType'
import { fromJS } from 'immutable'
const defaultValue = fromJS({
  isShowMini: false,
  songUrl: {},
  playMode: 1,
  lyric: []
})
const player = (state = defaultValue, action) => {
  switch (action.type) {
    case actionType.IS_SHOW_MINI:
      return state.set('isShowMini', action.data)
    case actionType.GET_SONG_URL:
      return state.set('songUrl', action.data)
    case actionType.SET_PLAY_MODE:
      return state.set('playMode', action.data)
    case actionType.GET_SONG_LYRIC:
      return state.set('lyric', action.data)
    default:
      return state
  }
}
export default player