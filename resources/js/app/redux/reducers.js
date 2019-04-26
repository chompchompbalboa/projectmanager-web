import { combineReducers } from 'redux'
import containerReducers from './container/containerReducers'
import modalReducers from './modal/modalReducers'
import organizationReducers from './organization/organizationReducers'
import projectReducers from './project/projectReducers'
import statusReducers from './status/statusReducers'
import tableReducers from './table/tableReducers'
import viewReducers from './view/viewReducers'

export default combineReducers({
  container: containerReducers,
  modal: modalReducers,
  organization: organizationReducers,
  project: projectReducers,
  status: statusReducers,
  table: tableReducers,
  view: viewReducers
})