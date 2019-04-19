//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation } from '../../../_api'
import { timing } from '../../../_config'

import { setStatus } from '../status/statusActions'
import { 
  setBreakdown,
  setTableId,
  updateColumnId,
  updateTableId
} from '../table/tableActions'


//-----------------------------------------------------------------------------
// Create Breakdown Formula
//-----------------------------------------------------------------------------
export const createBreakdownFormula = (tableId, breakdownId, defaultColumnId) => {
  return dispatch => {
    dispatch(createBreakdownFormulaReducer(tableId, breakdownId, defaultColumnId))
  }
}
const createBreakdownFormulaReducer = (tableId, breakdownId, defaultColumnId) => ({
  type: 'CREATE_BREAKDOWN_FORMULA',
  breakdownId: breakdownId,
  defaultColumnId: defaultColumnId,
  tableId: tableId
})

//-----------------------------------------------------------------------------
// Create Table
//-----------------------------------------------------------------------------
export const createTable = () => {
  return (dispatch, getState) => {
    dispatch(createTableReducer())
    const state = getState()
    const tableId = state.project.activeProject.tables.find(table => table.id < 0).id
    const projectId = state.project.activeProject.id
    dispatch(setTableId(tableId))
    dispatch(createTableServer(projectId, tableId))
  }
}
const createTableReducer = () => ({
  type: 'CREATE_TABLE_IN_ACTIVE_PROJECT'
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
      dispatch(updateColumnId(0, firstColumnId))
      dispatch(updateTableId(nextTableId))
      dispatch(setStatus('SAVED'))
    })
  }
}

//-----------------------------------------------------------------------------
// Delete Breakdown Formula
//-----------------------------------------------------------------------------
export const deleteBreakdownFormula = (tableId, breakdownId, formulaId) => {
  return (dispatch, getState) => {
    dispatch(deleteBreakdownFormulaReducer(tableId, breakdownId, formulaId))
    if(tableId === getState().table.id && getState().table.breakdown !== null) {
      const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
      dispatch(setBreakdown(tableId, nextBreakdown))
    }
  }
}
const deleteBreakdownFormulaReducer = (tableId, breakdownId, formulaId) => ({
  type: 'DELETE_BREAKDOWN_FORMULA',
  breakdownId: breakdownId,
  formulaId: formulaId,
  tableId: tableId
})

//-----------------------------------------------------------------------------
// Delete Table
//-----------------------------------------------------------------------------
export const deleteTable = tableId => {
  return (dispatch, getState) => {
    dispatch(deleteTableReducer(tableId))
    // If we're deleting the currently visible table, switch to another one
    if (getState().table.id === tableId) {
      dispatch(setTableId(getState().project.activeProject.tables[0].id))
    }
    dispatch(deleteTableServer(tableId))
  }
}
const deleteTableReducer = tableId => ({
  type: 'DELETE_TABLE',
  tableId: tableId
})
const deleteTableServer = tableId => {
  setStatus('SAVING')
  return async dispatch => {
    return mutation.deleteTable(tableId).then(success => {
      success && dispatch(setStatus('SAVED'))
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
// Toggle Table isRenaming
//-----------------------------------------------------------------------------
export const toggleTableIsRenaming = tableId => ({
  type: 'TOGGLE_TABLE_IS_RENAMING',
  tableId: tableId
})

//-----------------------------------------------------------------------------
// Update Breakdown Name
//-----------------------------------------------------------------------------
export const updateBreakdownName = (tableId, breakdownId, nextBreakdownName) => {
  return (dispatch, getState) => {
    dispatch(updateBreakdownNameReducer(tableId, breakdownId, nextBreakdownName))
    if(tableId === getState().table.id && getState().table.breakdown !== null) {
      const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
      dispatch(setBreakdown(tableId, nextBreakdown))
    }
  }
}
const updateBreakdownNameReducer = (tableId, breakdownId, nextBreakdownName) => ({
  type: 'UPDATE_BREAKDOWN_NAME',
  breakdownId: breakdownId,
  nextBreakdownName: nextBreakdownName,
  tableId: tableId
})

//-----------------------------------------------------------------------------
// Update Breakdowns
//-----------------------------------------------------------------------------
export const updateBreakdowns = (tableId, nextBreakdowns) => {
  return (dispatch, getState) => {
    dispatch(updateBreakdownsReducer(tableId, nextBreakdowns))
    if(tableId === getState().table.id && getState().table.breakdown !== null) {
      const breakdownId = getState().table.breakdown.id
      const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
      dispatch(setBreakdown(tableId, nextBreakdown))
    }
  }
}
const updateBreakdownsReducer = (tableId, nextBreakdowns) => ({
  type: 'UPDATE_BREAKDOWNS',
  nextBreakdowns: nextBreakdowns,
  tableId: tableId
})

//-----------------------------------------------------------------------------
// Update Breakdown Formula Column Id
//-----------------------------------------------------------------------------
export const updateBreakdownFormulaColumnId = (tableId, breakdownId, formulaId, nextBreakdownFormulaColumnId) => {
  return (dispatch, getState) => {
    dispatch(updateBreakdownFormulaColumnIdReducer(tableId, breakdownId, formulaId, nextBreakdownFormulaColumnId))
    if(tableId === getState().table.id && getState().table.breakdown !== null) {
      const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
      dispatch(setBreakdown(tableId, nextBreakdown))
    }
  }
}
const updateBreakdownFormulaColumnIdReducer = (tableId, breakdownId, formulaId, nextBreakdownFormulaColumnId) => ({
  type: 'UPDATE_BREAKDOWN_FORMULA_COLUMN_ID',
  breakdownId: breakdownId,
  formulaId: formulaId,
  nextBreakdownFormulaColumnId: nextBreakdownFormulaColumnId,
  tableId: tableId
})

//-----------------------------------------------------------------------------
// Update Breakdown Formula Type
//-----------------------------------------------------------------------------
export const updateBreakdownFormulaType = (tableId, breakdownId, formulaId, nextBreakdownFormulaType) => {
  return (dispatch, getState) => {
    dispatch(updateBreakdownFormulaTypeReducer(tableId, breakdownId, formulaId, nextBreakdownFormulaType))
    if(tableId === getState().table.id && getState().table.breakdown !== null) {
      const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
      dispatch(setBreakdown(tableId, nextBreakdown))
    }
  }
}
const updateBreakdownFormulaTypeReducer = (tableId, breakdownId, formulaId, nextBreakdownFormulaType) => ({
  type: 'UPDATE_BREAKDOWN_FORMULA_TYPE',
  breakdownId: breakdownId,
  formulaId: formulaId,
  nextBreakdownFormulaType: nextBreakdownFormulaType,
  tableId: tableId
})

//-----------------------------------------------------------------------------
// Update Breakdown Formula Value
//-----------------------------------------------------------------------------
export const updateBreakdownFormulaValue = (tableId, breakdownId, formulaId, columnType, nextBreakdownFormulaValue) => {
  return (dispatch, getState) => {
    dispatch(updateBreakdownFormulaValueReducer(tableId, breakdownId, formulaId, columnType, nextBreakdownFormulaValue))
    if(tableId === getState().table.id && getState().table.breakdown !== null) {
      const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
      dispatch(setBreakdown(tableId, nextBreakdown))
    }
  }
}
const updateBreakdownFormulaValueReducer = (tableId, breakdownId, formulaId, columnType, nextBreakdownFormulaValue) => ({
  type: 'UPDATE_BREAKDOWN_FORMULA_VALUE',
  breakdownId: breakdownId,
  columnType: columnType,
  formulaId: formulaId,
  nextBreakdownFormulaValue: nextBreakdownFormulaValue,
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