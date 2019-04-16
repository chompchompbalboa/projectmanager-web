import { combineReducers } from 'redux'
import modalReducers from './modal/modalReducers'
import projectReducers from './project/projectReducers'
import statusReducers from './status/statusReducers'
import tableReducers from './table/tableReducers'
import viewReducers from './view/viewReducers'

export default combineReducers({
  modal: modalReducers,
  project: projectReducers,
  status: statusReducers,
  table: tableReducers,
  view: viewReducers
})