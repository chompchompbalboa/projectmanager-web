import { combineReducers } from 'redux'
import statusReducers from './status/statusReducers'
import projectReducers from './project/projectReducers'
import tableReducers from './table/tableReducers'

export default combineReducers({
  project: projectReducers,
  status: statusReducers,
  table: tableReducers,
})