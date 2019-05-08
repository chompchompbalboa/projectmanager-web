//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { combineReducers } from 'redux'

import activeReducers from './active/activeReducers'
import collectionReducers from './collection/collectionReducers'
import containerReducers from './container/containerReducers'
import moduleReducers from './module/moduleReducers'
import organizationReducers from './organization/organizationReducers'
import structureReducers from './structure/structureReducers'
import userReducers from './user/userReducers'
import viewReducers from './view/viewReducers'

//-----------------------------------------------------------------------------
// Combine Reducers
//-----------------------------------------------------------------------------
export default combineReducers({
  active: activeReducers,
  collection: collectionReducers,
  container: containerReducers,
  module: moduleReducers,
  organization: organizationReducers,
  structure: structureReducers,
  user: userReducers,
  view: viewReducers
})