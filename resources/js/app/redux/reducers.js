//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { combineReducers } from 'redux'

import activeReducers from './active/activeReducers'
import folderReducers from './folder/folderReducers'
import organizationReducers from './organization/organizationReducers'
import tableReducers from './table/tableReducers'
import userReducers from './user/userReducers'

//-----------------------------------------------------------------------------
// Combine Reducers
//-----------------------------------------------------------------------------
export default combineReducers({
  active: activeReducers,
  folder: folderReducers,
  organization: organizationReducers,
  table: tableReducers,
  user: userReducers,
})