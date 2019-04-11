import { mutation } from '../../../_api'
import { timing } from '../../../_config'
import clone from '../../../_utils/clone'

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
    const columnPositions = state.table.columns.map(column => {
      if (column.id > 0) {
        return {id: column.id, position: column.position}
      }
    })
    // Save the column
    dispatch(createColumnServer(newColumn, rowIds, columnPositions))
  }
}
const createColumnReducer = (columnId, beforeOrAfter) => ({
  type: 'CREATE_COLUMN',
  beforeOrAfter: beforeOrAfter,
  columnId: columnId
})
const createColumnServer = (newColumn, rowIds, columnPositions) => {
  return (dispatch, getState) => {
    dispatch(setStatus('SAVING'))
    mutation.createColumn(newColumn, rowIds, columnPositions).then(saveResults => {
      const {
        nextCellIds,
        nextColumnId,
        columnId
      } = saveResults
      const columnIndex = getState().table.columns.findIndex(column => column.id === columnId)
      dispatch(updateColumnId(columnIndex, nextColumnId))
      const state = getState()
      const nextRows = clone(state.table.rows)
      // Update the cell ids
      nextCellIds.forEach(({ rowId, nextCellId }) => {
        const rowIndex = state.table.rows.findIndex(row => row.id === rowId)
        const cellIndex = state.table.rows[rowIndex].cells.findIndex(cell => cell.columnId === nextColumnId)
        nextRows[rowIndex].cells[cellIndex].id = nextCellId
        dispatch(updateRows(nextRows))
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
      // Get the row index
      const rowIndex = getState().table.rows.findIndex(row => row.id === rowId)
      // Update the row id
      dispatch(updateRowId(rowIndex, nextRowId))
      // Update the cell ids
      const nextRows = clone(getState().table.rows)
      nextCellIds.forEach(({ cellId, nextCellId }) => {
        const cellIndex = getState().table.rows[rowIndex].cells.findIndex(cell => cell.id === cellId)
        nextRows[rowIndex].cells[cellIndex].id = nextCellId
      })
      dispatch(updateRows(nextRows))
      dispatch(setStatus('ADDED_ROW'))
  })
  }
}

//-----------------------------------------------------------------------------
// Create Table
//-----------------------------------------------------------------------------
export const createTable = nextTableId => ({
  type: 'CREATE_TABLE',
  nextTableId: nextTableId
})

//-----------------------------------------------------------------------------
// Delete Columns
//-----------------------------------------------------------------------------
export const deleteColumn = columnId => {
  return (dispatch, getState) => {
    const columns = getState().table.columns
    const columnIndex = columns.findIndex(column => column.id === columnId)
    const deletedColumnWidth = columns[columnIndex].width
    const nextColumnWidths = columns.map((column, index) => {
      if(index === columnIndex - 1 || index === columnIndex + 1) {
      const isDeletedColumnFirstOrLast = (columnIndex === 0 || columnIndex === columns.length - 1)
      const widthModifier = isDeletedColumnFirstOrLast ? deletedColumnWidth : (deletedColumnWidth / 2)
        return {
          id: column.id,
          nextWidth: Number((column.width + widthModifier).toFixed(2))
        }
      }
    }).filter(nextColumnWidth => {return nextColumnWidth}) // Filter out undefineds
    dispatch(setStatus('DELETING'))
    dispatch(deleteColumnReducer(columnId))
    dispatch(updateColumnWidths(nextColumnWidths))
    dispatch(deleteColumnServer(columnId))
  }
}
const deleteColumnReducer = columnId => ({
  type: 'DELETE_COLUMN',
  columnId: columnId
})
const deleteColumnServer = columnId => {
  return async dispatch => {
    return mutation.deleteColumn(columnId).then(success => {
      success && dispatch(setStatus('DELETED'))
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
export const sortRows = (nextSortColumnId, nextSortOrder) => ({
  type: 'SORT_ROWS',
  nextSortColumnId: nextSortColumnId,
  nextSortOrder: nextSortOrder
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
// Update Column Type
//-----------------------------------------------------------------------------
let updateColumnTypeTimeout
export const updateColumnType = (columnId, nextType) => {
  return dispatch => {
    clearTimeout(updateColumnTypeTimeout)
    dispatch(updateColumnTypeReducer(columnId, nextType))
    updateColumnTypeTimeout = window.setTimeout(() => dispatch(updateColumnTypeServer(columnId)), timing.SAVE_INTERVAL)
  }
}
const updateColumnTypeReducer = (columnId, nextType) => ({
  type: 'UPDATE_COLUMN_TYPE',
  columnId: columnId,
  nextType: nextType
})
const updateColumnTypeServer = columnId => {
  return (dispatch, getState) => {
    dispatch(setStatus('SAVING'))
    const columns = getState().table.columns
    const columnToSave = columns.find(column => column.id === columnId)
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

//-----------------------------------------------------------------------------
// Update Rows
//-----------------------------------------------------------------------------
export const updateRows = nextRows => ({
  type: 'UPDATE_ROWS',
  nextRows: nextRows
})