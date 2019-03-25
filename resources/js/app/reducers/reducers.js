import { combineReducers } from 'redux'
import statusReducers from './statusReducers'
import projectReducers from './projectReducers'

export default combineReducers({
  project: projectReducers,
  status: statusReducers,
})