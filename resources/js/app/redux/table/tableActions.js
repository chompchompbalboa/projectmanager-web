import _ from 'lodash'

import { mutation } from '../../../_api'
import { timing } from '../../../_config'

import { setStatus } from '../status/statusActions'

//-----------------------------------------------------------------------------
// Create Column
//-----------------------------------------------------------------------------
export const createColumn = (columnId, beforeOrAfter) => {
  return (dispatch, getState) => {
    dispatch(createColumnReducer(columnId, beforeOrAfter))
    // Get the newly created column from state
    const state = getState()
    const newColumn = state.table.columns.find(column => column.id < 0)
    const rowIds = state.table.rows.map(row => {return row.id})
    // Save the column
    dispatch(createColumnServer(newColumn, rowIds))
  }
}
const createColumnReducer = (columnId, beforeOrAfter) => ({
  type: 'CREATE_COLUMN',
  beforeOrAfter: beforeOrAfter,
  columnId: columnId
})
const createColumnServer = (newColumn, rowIds) => {
  return (dispatch, getState) => {
    dispatch(setStatus('SAVING'))
    mutation.createColumn(newColumn, rowIds).then(saveResults => {
      const {
        nextCellIds,
        nextColumnId,
        columnId
      } = saveResults
      const columnIndex = getState().table.columns.findIndex(column => column.id === columnId)
      dispatch(updateColumnId(columnIndex, nextColumnId))
      const state = getState()
      // Update the cell ids
      nextCellIds.forEach(({ rowId, nextCellId }) => {
        const rowIndex = state.table.rows.findIndex(row => row.id === rowId)
        const cellIndex = state.table.rows[rowIndex].cells.findIndex(cell => cell.columnId === nextColumnId)
        dispatch(updateCellId(rowIndex, cellIndex, nextCellId))
      })
      dispatch(setStatus('SAVED'))
    })
  }
}

//-----------------------------------------------------------------------------
// Create Row
//-----------------------------------------------------------------------------
export const createRow = () => {
  return (dispatch, getState) => {
    // Add the row
    dispatch(createRowReducer())
    // Get the newly created row from state
    const newRow = getState().table.rows[0]
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
      const rowIndex = _.findIndex(state.table.rows, ['id', rowId])
      // Update the row id
      dispatch(updateRowId(rowIndex, nextRowId))
      // Update the cell ids
      nextCellIds.forEach(({ cellId, nextCellId }) => {
        const cellIndex = _.findIndex(state.table.rows[rowIndex].cells, ['id', cellId])
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
// Toggle Column isEditable
//-----------------------------------------------------------------------------
export const toggleColumnIsEditable = columnId => ({
  type: 'TOGGLE_COLUMN_IS_EDITABLE',
  columnId: columnId
})

//-----------------------------------------------------------------------------
// Update Cell
//-----------------------------------------------------------------------------
export const updateCell = (rowId, cellId, type, value) => {
  return (dispatch, getState) => {
    const state = getState()
    const rowIndex = state.table.rows.findIndex(row => row.id === rowId)
    const cellIndex = state.table.rows[rowIndex].cells.findIndex(cell => cell.id === cellId)
    // Make sure the value has changed
    if (state.table.rows[rowIndex].cells[cellIndex][type.toLowerCase()] !== value) {
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
// Update Column ID
//-----------------------------------------------------------------------------
export const updateColumnId = (columnIndex, nextColumnId) => ({
  type: 'UPDATE_COLUMN_ID',
  columnIndex: columnIndex,
  nextColumnId: nextColumnId
})

//-----------------------------------------------------------------------------
// Update Column Name
//-----------------------------------------------------------------------------
let updateColumnNameTimeout
export const updateColumnName = (columnId, nextName) => {
  return dispatch => {
    clearTimeout(updateColumnNameTimeout)
    dispatch(updateColumnNameReducer(columnId, nextName))
    updateColumnNameTimeout = window.setTimeout(() => dispatch(updateColumnNameServer(columnId)), timing.SAVE_INTERVAL)
  }
}
const updateColumnNameReducer = (columnId, nextName) => ({
  type: 'UPDATE_COLUMN_NAME',
  columnId: columnId,
  nextName: nextName
})
const updateColumnNameServer = columnId => {
  return (dispatch, getState) => {
    dispatch(setStatus('SAVING'))
    const columns = getState().table.columns
    const columnToSave = columns.find(column => column.id === columnId)
    if(columnToSave.name !== "") {
      mutation.updateColumn(columnToSave.id, columnToSave).then(success => {
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
    const columns = getState().table.columns
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