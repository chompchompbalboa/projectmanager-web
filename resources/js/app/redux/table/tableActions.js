import _ from 'lodash'

import { mutation } from '../../../_api'
import { timing } from '../../../_config'

import { setStatus } from '../status/statusActions'

//-----------------------------------------------------------------------------
// Create Column
//-----------------------------------------------------------------------------
export const createColumn = newColumn => ({
  type: 'CREATE_COLUMN',
  newColumn: newColumn
})

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
// Set Table
//-----------------------------------------------------------------------------
export const setTable = nextTable => ({
  type: 'SET_TABLE',
  id: nextTable.id,
  rows: nextTable.rows,
  columns: nextTable.columns
})

//-----------------------------------------------------------------------------
// Set Table ID
//-----------------------------------------------------------------------------
export const setTableId = nextTableId => ({
  type: 'SET_TABLE_ID',
  nextTableId: nextTableId
})

//-----------------------------------------------------------------------------
// Sort Rows
//-----------------------------------------------------------------------------
export const sortRows = nextSortColumn => ({
  type: 'SORT_ROWS',
  nextSortColumn: nextSortColumn
})

//-----------------------------------------------------------------------------
// Update Cell
//-----------------------------------------------------------------------------
export const updateCell = (rowId, cellId, type, value) => {
  return (dispatch, getState) => {
    const state = getState()
    const rowIndex = state.project.activeTable.rows.findIndex(row => row.id === rowId)
    const cellIndex = state.project.activeTable.rows[rowIndex].cells.findIndex(cell => cell.id === cellId)
    // Make sure the value has changed
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
// Update Column Widths
//-----------------------------------------------------------------------------
let updateColumnWidthsTimeout
export const updateColumnWidths = nextColumnWidths => {
  return dispatch => {
    clearTimeout(updateColumnWidthsTimeout)
    dispatch(updateColumnWidthsReducer(nextColumnWidths))
    updateColumnWidthsTimeout = window.setTimeout(() => dispatch(updateColumnWidthsServer(nextColumnWidths)), timing.SAVE_INTERVAL)
  }
}
const updateColumnWidthsReducer = nextColumnWidths => ({
  type: 'UPDATE_COLUMN_WIDTHS',
  nextColumnWidths: nextColumnWidths
})
const updateColumnWidthsServer = nextColumnWidths => {
  return (dispatch, getState) => {
    dispatch(setStatus('SAVING'))
    let numberOfColumnsToSave = nextColumnWidths.length
    let numberOfColumnsSaved = 0
    const columns = getState().project.activeTable.columns
    nextColumnWidths.map(columnWidth => {
      const columnToSave = columns.find(column => column.id === columnWidth.id)
      mutation.updateColumn(columnToSave.id, columnToSave).then(success => {
        if(success) {
          numberOfColumnsSaved < numberOfColumnsToSave - 1 
            ? numberOfColumnsSaved++ 
            : dispatch(setStatus('SAVED'))
        }
        else {
          dispatch(setStatus('ERROR'))
        }
      })
    })
  }
}

//-----------------------------------------------------------------------------
// Update Row ID
//-----------------------------------------------------------------------------
export const updateRowId = (rowIndex, nextRowId) => ({
  type: 'UPDATE_ROW_ID',
  rowIndex: rowIndex,
  nextRowId: nextRowId
})