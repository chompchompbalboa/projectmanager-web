//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation } from '../../../_api'
import { timing } from '../../../_config'

import { setStatus } from '../status/statusActions'
import { 
  setTableId,
  updateColumnId
} from '../table/tableActions'

//-----------------------------------------------------------------------------
// Create Table
//-----------------------------------------------------------------------------
export const createTable = () => {
  return (dispatch, getState) => {
    dispatch(createTableReducer())
    const state = getState()
    const tableId = state.project.activeProject.tables.find(table => table.id < 0).id
    const projectId = state.project.activeProject.id
    dispatch(createTableServer(projectId, tableId))
  }
}
const createTableReducer = () => ({
  type: 'CREATE_TABLE'
})
const createTableServer = (projectId, tableId) => {
  return dispatch => {
    dispatch(setStatus('SAVING'))
    mutation.createTable(projectId, tableId).then(newTable => {
      const {
        tableId,
        nextTableId,
        firstColumnId
      } = newTable
      dispatch(updateTableIdInActiveProjectTables(tableId, nextTableId))
      dispatch(setTableId(nextTableId))
      dispatch(updateColumnId(0, firstColumnId))
      dispatch(setStatus('SAVED'))
    })
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
// Update Table Id
//-----------------------------------------------------------------------------
export const updateTableIdInActiveProjectTables = (tableId, nextTableId) => ({
  type: 'UPDATE_TABLE_ID_IN_ACTIVE_PROJECT_TABLES',
  tableId: tableId,
  nextTableId: nextTableId
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
    const tableToSave = getState().project.activeProject.tables.find(table => table.id === tableId)
    if(tableToSave.name !== "" && tableToSave.id > 0) {
      dispatch(setStatus('SAVING'))
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