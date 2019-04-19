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
// Timeouts
//-----------------------------------------------------------------------------
let setBreakdownTimeout = null
let updateBreakdownFormulaTimeout = null

//-----------------------------------------------------------------------------
// Create Breakdown Formula
//-----------------------------------------------------------------------------
export const createBreakdownFormula = (tableId, breakdownId, defaultColumnId) => {
  return dispatch => {
    dispatch(createBreakdownFormulaReducer(tableId, breakdownId, defaultColumnId))
    dispatch(createBreakdownFormulaServer(tableId, breakdownId))
  }
}

const createBreakdownFormulaReducer = (tableId, breakdownId, defaultColumnId) => ({
  type: 'CREATE_BREAKDOWN_FORMULA',
  breakdownId: breakdownId,
  defaultColumnId: defaultColumnId,
  tableId: tableId
})

const createBreakdownFormulaServer = (tableId, breakdownId) => {
  return (dispatch, getState) => {
    const newFormula = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId).formulas.find(formula => formula.id < 0)
    mutation.createFormula(breakdownId, newFormula).then(formulaIds => {
      const {
        formulaId,
        nextFormulaId
      } = formulaIds
      dispatch(updateBreakdownFormulaId(tableId, breakdownId, formulaId, nextFormulaId))
      if(tableId === getState().table.id && getState().table.breakdown !== null) {
        const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
        dispatch(setBreakdown(tableId, nextBreakdown))
      }
    })
  }
}

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
    dispatch(deleteBreakdownFormulaServer(tableId, breakdownId, formulaId))
  }
}
const deleteBreakdownFormulaReducer = (tableId, breakdownId, formulaId) => ({
  type: 'DELETE_BREAKDOWN_FORMULA',
  breakdownId: breakdownId,
  formulaId: formulaId,
  tableId: tableId
})
const deleteBreakdownFormulaServer = (tableId, breakdownId, formulaId) => {
  return (dispatch, getState) => {
    mutation.deleteFormula(formulaId).then(success => {
      if(success) {
        if(tableId === getState().table.id && getState().table.breakdown !== null) {
          const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
          dispatch(setBreakdown(tableId, nextBreakdown))
        }
      }
    })
  }
}

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
let updateBreakdownNameTimeout = null
export const updateBreakdownName = (tableId, breakdownId, nextBreakdownName) => {
  return (dispatch, getState) => {
    dispatch(updateBreakdownNameReducer(tableId, breakdownId, nextBreakdownName))
    clearTimeout(updateBreakdownNameTimeout)
    updateBreakdownNameTimeout = window.setTimeout(() => dispatch(updateBreakdownNameServer(tableId, breakdownId)), timing.SAVE_INTERVAL)
  }
}
const updateBreakdownNameReducer = (tableId, breakdownId, nextBreakdownName) => ({
  type: 'UPDATE_BREAKDOWN_NAME',
  breakdownId: breakdownId,
  nextBreakdownName: nextBreakdownName,
  tableId: tableId
})
const updateBreakdownNameServer = (tableId, breakdownId) => {
  return (dispatch, getState) => {
    const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
    mutation.updateBreakdown(breakdownId, nextBreakdown).then(breakdown => {
      if(tableId === getState().table.id && getState().table.breakdown !== null) {
        dispatch(setBreakdown(tableId, breakdown))
      }
    })
  }
}

//-----------------------------------------------------------------------------
// Update Breakdown Formula Column Id
//-----------------------------------------------------------------------------
export const updateBreakdownFormulaColumnId = (tableId, breakdownId, formulaId, nextBreakdownFormulaColumnId) => {
  return (dispatch, getState) => {
    clearTimeout(updateBreakdownFormulaTimeout)
    dispatch(updateBreakdownFormulaColumnIdReducer(tableId, breakdownId, formulaId, nextBreakdownFormulaColumnId))
    updateBreakdownFormulaTimeout = window.setTimeout(() => dispatch(updateBreakdownFormulaServer(tableId, breakdownId, formulaId)), timing.SAVE_INTERVAL)
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
// Update Breakdown Formula Id
//-----------------------------------------------------------------------------
const updateBreakdownFormulaId = (tableId, breakdownId, formulaId, nextFormulaId) => ({
  type: 'UPDATE_BREAKDOWN_FORMULA_ID',
  breakdownId: breakdownId,
  formulaId: formulaId,
  nextFormulaId: nextFormulaId,
  tableId: tableId
})

//-----------------------------------------------------------------------------
// Update Breakdown Formula Type
//-----------------------------------------------------------------------------
export const updateBreakdownFormulaType = (tableId, breakdownId, formulaId, nextBreakdownFormulaType) => {
  return (dispatch, getState) => {
    clearTimeout(updateBreakdownFormulaTimeout)
    dispatch(updateBreakdownFormulaTypeReducer(tableId, breakdownId, formulaId, nextBreakdownFormulaType))
    updateBreakdownFormulaTimeout = window.setTimeout(() => dispatch(updateBreakdownFormulaServer(tableId, breakdownId, formulaId)), timing.SAVE_INTERVAL)
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
    clearTimeout(updateBreakdownFormulaTimeout)
    dispatch(updateBreakdownFormulaValueReducer(tableId, breakdownId, formulaId, columnType, nextBreakdownFormulaValue))
    updateBreakdownFormulaTimeout = window.setTimeout(() => dispatch(updateBreakdownFormulaServer(tableId, breakdownId, formulaId)), timing.SAVE_INTERVAL)
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
// Update Breakdown Formula Server
//-----------------------------------------------------------------------------
const updateBreakdownFormulaServer = (tableId, breakdownId, formulaId) => {
  return (dispatch, getState) => {
    const nextFormula = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId).formulas.find(formula => formula.id === formulaId)
    mutation.updateFormula(formulaId, nextFormula).then(formula => {
      if(tableId === getState().table.id && getState().table.breakdown !== null) {
        const nextBreakdown = getState().project.activeProject.tables.find(table => table.id === tableId).breakdowns.find(breakdown => breakdown.id === breakdownId)
        dispatch(setBreakdown(tableId, nextBreakdown))
      }
    })
  }
}

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