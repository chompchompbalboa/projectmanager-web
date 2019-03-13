import { combineReducers } from 'redux'
import projectReducers from './projectReducers'

export default combineReducers({
  project: projectReducers,
})