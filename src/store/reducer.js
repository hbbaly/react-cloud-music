
import { combineReducers } from 'redux-immutable'
import recommend from '../view/Recommend/store/reducer'
import singer from '../view/Singers/store/reducer'
import rank from '../view/Rank/store/reducer'
export default combineReducers({
  recommend,
  singer,
  rank
})