//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

import { mutation } from 'api'
import clone from 'utils/clone'
//-----------------------------------------------------------------------------
// Defaults
//-----------------------------------------------------------------------------
const defaultCell = (tableId, columnId, rowId) => ({
  id: createUuid(),
  tableId: tableId,
  columnId: columnId,
  rowId: rowId,
  value: null
})

//-----------------------------------------------------------------------------
// Create Table Column
//-----------------------------------------------------------------------------
export const createTableColumn = () => {
  return (dispatch, getState) => {
    const {
      columnIds,
      id,
      rowIds,
      rows
    } = clone(getState().table)
    const newColumnId = createUuid()
    // Create cells
    let newCells = {}
    let nextRows = rows
    rowIds && rowIds.forEach(rowId => {
      const newCellId = createUuid()
      newCells[newCellId] = defaultCell(id, newColumnId, rowId)
      nextRows[rowId].cells.push(newCellId)
    })
    // Create column
    const newColumn = {
      id: newColumnId,
      tableId: id,
      name: String.fromCharCode(65 + (columnIds.length)),
      position: columnIds.length,
      type: 'STRING',
      width: 200
    }
    dispatch(createTableColumnReducer(newColumn, newCells, nextRows))
    mutation.createTableColumn(newColumn, newCells)
  }
}

const createTableColumnReducer = (newColumn, newCells, nextRows) => ({
  type: 'CREATE_TABLE_COLUMN',
  newColumn: newColumn,
  newCells: newCells,
  nextRows: nextRows
})

//-----------------------------------------------------------------------------
// Create Table Row
//-----------------------------------------------------------------------------
export const createTableRow = () => {
  return (dispatch, getState) => {
    const {
      columnIds,
      id
    } = clone(getState().table)
    if (columnIds.length > 0) {
      const newRowId = createUuid()
      // Create cells
      let newCells = {}
      columnIds && columnIds.forEach(columnId => {
        const newCellId = createUuid()
        newCells[newCellId] = defaultCell(id, columnId, newRowId)
      })
      const cellIds = Object.keys(newCells).map(newCellId => newCellId)
      // Create row
      const newRow = {
        id: newRowId,
        tableId: id
      }
      dispatch(createTableRowReducer({...newRow, cells: cellIds}, newCells))
      mutation.createTableRow(newRow, newCells)
    }
  }
}

const createTableRowReducer = (newRow, newCells) => ({
  type: 'CREATE_TABLE_ROW',
  newRow: newRow,
  newCells: newCells
})

//-----------------------------------------------------------------------------
// Delete Table Column
//-----------------------------------------------------------------------------
export const deleteTableColumn = columnId => {
  return dispatch => {
    dispatch(deleteTableColumnReducer(columnId))
    mutation.deleteTableColumn(columnId)
  }
}

const deleteTableColumnReducer = columnId => ({
  type: 'DELETE_TABLE_COLUMN',
  columnId: columnId
})

//-----------------------------------------------------------------------------
// Delete Table Row
//-----------------------------------------------------------------------------
export const deleteTableRow = rowId => {
  return dispatch => {
    dispatch(deleteTableRowReducer(rowId))
    mutation.deleteTableRow(rowId)
  }
}

const deleteTableRowReducer = rowId => ({
  type: 'DELETE_TABLE_ROW',
  rowId: rowId
})

//-----------------------------------------------------------------------------
// Set Table
//-----------------------------------------------------------------------------
export const setTable = table => ({
  type: 'SET_TABLE',
  table: table
})

//-----------------------------------------------------------------------------
// Update Table Cell
//-----------------------------------------------------------------------------
export const updateTableCell = (cellId, updates) => {
  return dispatch => {
    dispatch(updateTableCellReducer(cellId, updates))
    mutation.updateTableCell(cellId, updates)
  }
}

const updateTableCellReducer = (cellId, updates) => ({
  type: 'UPDATE_TABLE_CELL',
  cellId: cellId,
  updates: updates
})

//-----------------------------------------------------------------------------
// Update Table Column
//-----------------------------------------------------------------------------
export const updateTableColumn = (columnId, updates) => {
  return dispatch => {
    dispatch(updateTableColumnReducer(columnId, updates))
    mutation.updateTableColumn(columnId, updates)
  }
}

const updateTableColumnReducer = (columnId, updates) => ({
  type: 'UPDATE_TABLE_COLUMN',
  columnId: columnId,
  updates: updates
})