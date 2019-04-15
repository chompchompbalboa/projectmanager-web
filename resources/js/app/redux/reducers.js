import { combineReducers } from 'redux'
import statusReducers from './status/statusReducers'
import projectReducers from './project/projectReducers'
import tableReducers from './table/tableReducers'
import viewReducers from './view/viewReducers'

export default combineReducers({
  project: projectReducers,
  status: statusReducers,
  table: tableReducers,
  view: viewReducers
})