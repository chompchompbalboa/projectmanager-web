import _ from 'lodash'
import { mutation } from '../../_api'

import { setStatus } from '../actions/statusActions'

//-----------------------------------------------------------------------------
// Create Row
//-----------------------------------------------------------------------------
export const createRow = () => {
  return (dispatch, getState) => {
    // Add the row
    dispatch(createRowReducer())
    // Get the newly created row from state
    const newRow = getState().project.activeTable.rows[0]
    // Save the row
    dispatch(createRowServer(newRow))
  }
}
const createRowReducer = () => ({
  type: 'CREATE_ROW'
})
const createRowServer = newRow => {
  return (dispatch, getState) => {
    dispatch(setStatus('ADDING_ROW'))
    mutation.createRow(newRow).then(savedRow => {
      const {
        nextCellIds,
        nextRowId,
        rowId
      } = savedRow
      const state = getState()
      // Get the row index
      const rowIndex = _.findIndex(state.project.activeTable.rows, ['id', rowId])
      // Update the row id
      dispatch(updateRowId(rowIndex, nextRowId))
      // Update the cell ids
      nextCellIds.forEach(({ cellId, nextCellId }) => {
        const cellIndex = _.findIndex(state.project.activeTable.rows[rowIndex].cells, ['id', cellId])
        dispatch(updateCellId(rowIndex, cellIndex, nextCellId))
      })
      dispatch(setStatus('ADDED_ROW'))
  })
  }
}

//-----------------------------------------------------------------------------
// Delete Row
//-----------------------------------------------------------------------------
export const deleteRow = rowId => {
  return dispatch => {
    dispatch(setStatus('DELETING'))
    dispatch(deleteRowReducer(rowId))
    dispatch(deleteRowServer(rowId))
  }
}
const deleteRowReducer = rowId => ({
  type: 'DELETE_ROW',
  rowId: rowId
})
const deleteRowServer = rowId => {
  return async dispatch => {
    return mutation.deleteRow(rowId).then(success => {
      success && dispatch(setStatus('DELETED'))
    })
  }
}

//-----------------------------------------------------------------------------
// Set Active Project
//-----------------------------------------------------------------------------
export const setActiveProject = nextActiveProject => ({
  type: 'SET_ACTIVE_PROJECT',
  nextActiveProject: nextActiveProject
})

//-----------------------------------------------------------------------------
// Set Active Table
//-----------------------------------------------------------------------------
export const setActiveTable = nextActiveTable => ({
  type: 'SET_ACTIVE_TABLE',
  nextActiveTable: nextActiveTable
})

//-----------------------------------------------------------------------------
// Set Active Table ID
//-----------------------------------------------------------------------------
export const setActiveTableId = nextActiveTableId => ({
  type: 'SET_ACTIVE_TABLE_ID',
  nextActiveTableId: nextActiveTableId
})

//-----------------------------------------------------------------------------
// Set Projects
//-----------------------------------------------------------------------------
export const setProjects = nextProjects => ({
  type: 'SET_PROJECTS',
  nextProjects: nextProjects
})

//-----------------------------------------------------------------------------
// Update Cell
//-----------------------------------------------------------------------------
export const updateCell = (rowId, cellId, type, value) => {
  return (dispatch, getState) => {
    const state = getState()
    const rowIndex = state.project.activeTable.rows.findIndex(row => row.id === rowId)
    const cellIndex = state.project.activeTable.rows[rowIndex].cells.findIndex(cell => cell.id === cellId)
    console.log(rowIndex, cellIndex, value)
    console.log(state.project.activeTable.rows[rowIndex].cells[cellIndex][type.toLowerCase()])
    console.log(type)
    if (state.project.activeTable.rows[rowIndex].cells[cellIndex][type.toLowerCase()] !== value) {
      dispatch(updateCellServer(cellId, rowIndex, cellIndex, value))
    }
  }

}

const updateCellReducer = (rowIndex, cellIndex, nextCell) => ({
  type: 'UPDATE_CELL',
  cellIndex: cellIndex,
  nextCell: nextCell,
  rowIndex: rowIndex
})
const updateCellServer = (cellId, rowIndex, cellIndex, value) => {
  return dispatch => {
    dispatch(setStatus('UPDATING_CELL'))
    mutation.updateCell(cellId, value).then(updatedCell => {
      dispatch(updateCellReducer(rowIndex, cellIndex, updatedCell))
      dispatch(setStatus('UPDATED_CELL'))
    })
  }
}

//-----------------------------------------------------------------------------
// Update Cell ID
//-----------------------------------------------------------------------------
export const updateCellId = (rowIndex, cellIndex, nextCellId) => ({
  type: 'UPDATE_CELL_ID',
  rowIndex: rowIndex,
  cellIndex: cellIndex,
  nextCellId: nextCellId
})

//-----------------------------------------------------------------------------
// Update Row ID
//-----------------------------------------------------------------------------
export const updateRowId = (rowIndex, nextRowId) => ({
  type: 'UPDATE_ROW_ID',
  rowIndex: rowIndex,
  nextRowId: nextRowId
})