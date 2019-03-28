import { combineReducers } from 'redux'
import statusReducers from './statusReducers'
import projectReducers from './projectReducers'
import tableReducers from './tableReducers'

export default combineReducers({
  project: projectReducers,
  status: statusReducers,
  table: tableReducers,
})