//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { combineReducers } from 'redux'

import activeReducers from './active/activeReducers'
import calendarReducers from './calendar/calendarReducers'
import folderReducers from './folder/folderReducers'
import noteReducers from './note/noteReducers'
import organizationReducers from './organization/organizationReducers'
import tableReducers from './table/tableReducers'
import userReducers from './user/userReducers'

//-----------------------------------------------------------------------------
// Combine Reducers
//-----------------------------------------------------------------------------
export default combineReducers({
  active: activeReducers,
  calendar: calendarReducers,
  folder: folderReducers,
  note: noteReducers,
  organization: organizationReducers,
  table: tableReducers,
  user: userReducers,
})