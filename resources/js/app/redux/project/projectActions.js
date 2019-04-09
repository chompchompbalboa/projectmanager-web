//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation } from '../../../_api'
import { timing } from '../../../_config'
import { setTableId } from '../table/tableActions'

import { setStatus } from '../status/statusActions'

//-----------------------------------------------------------------------------
// Create Table
//-----------------------------------------------------------------------------
export const createTable = () => {
  return dispatch => {
    dispatch(createTableReducer())
    dispatch(createTableServer())
  }
}
const createTableReducer = () => ({
  type: 'CREATE_TABLE'
})
const createTableServer = () => {
  return dispatch => {
    dispatch(setStatus('SAVING'))
  }
}

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
let updateTableNameTimeout = null
export const updateTableName = (tableId, nextTableName) => {
  return dispatch => {    
    clearTimeout(updateTableNameTimeout)
    dispatch(updateTableNameReducer(tableId, nextTableName))
    updateTableNameTimeout = window.setTimeout(() => dispatch(updateTableNameServer(tableId)), timing.SAVE_INTERVAL)
  }
}
const updateTableNameReducer = (tableId, nextTableName) => ({
  type: 'UPDATE_TABLE_NAME',
  tableId: tableId,
  nextTableName: nextTableName
})
const updateTableNameServer = tableId => {
  return (dispatch, getState) => {
    dispatch(setStatus('SAVING'))
    const tableToSave = getState().project.activeProject.tables.find(table => table.id === tableId)
    if(tableToSave.name !== "") {
      mutation.updateTable(tableToSave.id, tableToSave).then(success => {
        if(success) {
          dispatch(setStatus('SAVED'))
        }
        else {
          dispatch(setStatus('ERROR'))
        }
      })
    }
  }
}