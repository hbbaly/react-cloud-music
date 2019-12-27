
import { combineReducers } from 'redux-immutable'
import recommend from '../view/Recommend/store/reducer'
import singer from '../view/Singers/store/reducer'
export default combineReducers({
  recommend,
  singer
})