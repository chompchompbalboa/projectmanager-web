import { combineReducers } from 'redux'
import statusReducers from './statusReducers'

export default combineReducers({
  status: statusReducers,
})