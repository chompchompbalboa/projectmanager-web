//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { setTableId } from '../table/tableActions'

//-----------------------------------------------------------------------------
// Set Active Project
//-----------------------------------------------------------------------------
export const setActiveProject = nextActiveProject => {
  return dispatch => {
    dispatch(setTableId(nextActiveProject.tables[0].id))
    dispatch(setActiveProjectReducer(nextActiveProject))
  }
}
const setActiveProjectReducer = nextActiveProject => ({
  type: 'SET_ACTIVE_PROJECT',
  nextActiveProject: nextActiveProject
})

//-----------------------------------------------------------------------------
// Set Projects
//-----------------------------------------------------------------------------
export const setProjects = nextProjects => ({
  type: 'SET_PROJECTS',
  nextProjects: nextProjects
})

//-----------------------------------------------------------------------------
// Toggle Table isEditing
//-----------------------------------------------------------------------------
export const toggleTableIsEditing = tableId => ({
  type: 'TOGGLE_TABLE_IS_EDITING',
  tableId: tableId
})

//-----------------------------------------------------------------------------
// Update Table Name
//-----------------------------------------------------------------------------
export const updateTableName = (tableId, nextTableName) => ({
  type: 'UPDATE_TABLE_NAME',
  tableId: tableId,
  nextTableName: nextTableName
})