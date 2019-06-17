//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

import { mutation } from 'api'
import clone from 'utils/clone'
//-----------------------------------------------------------------------------
// Defaults
//-----------------------------------------------------------------------------
const defaultCell = (sheetId, columnId, rowId) => ({
  id: createUuid(),
  sheetId: sheetId,
  columnId: columnId,
  rowId: rowId,
  value: null
})

//-----------------------------------------------------------------------------
// Create Sheet Column
//-----------------------------------------------------------------------------
export const createSheetColumn = () => {
  return (dispatch, getState) => {
    const {
      columnIds,
      id,
      rowIds,
      rows
    } = clone(getState().sheet)
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
      sheetId: id,
      name: String.fromCharCode(65 + (columnIds.length)),
      position: columnIds.length,
      type: 'STRING',
      width: 200
    }
    dispatch(createSheetColumnReducer(newColumn, newCells, nextRows))
    mutation.createSheetColumn(newColumn, newCells)
  }
}

const createSheetColumnReducer = (newColumn, newCells, nextRows) => ({
  type: 'CREATE_SHEET_COLUMN',
  newColumn: newColumn,
  newCells: newCells,
  nextRows: nextRows
})

//-----------------------------------------------------------------------------
// Create Sheet Row
//-----------------------------------------------------------------------------
export const createSheetRow = () => {
  return (dispatch, getState) => {
    const {
      columnIds,
      id
    } = clone(getState().sheet)
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
        sheetId: id
      }
      dispatch(createSheetRowReducer({...newRow, cells: cellIds}, newCells))
      mutation.createSheetRow(newRow, newCells)
    }
  }
}

const createSheetRowReducer = (newRow, newCells) => ({
  type: 'CREATE_SHEET_ROW',
  newRow: newRow,
  newCells: newCells
})

//-----------------------------------------------------------------------------
// Delete Sheet Column
//-----------------------------------------------------------------------------
export const deleteSheetColumn = columnId => {
  return dispatch => {
    dispatch(deleteSheetColumnReducer(columnId))
    mutation.deleteSheetColumn(columnId)
  }
}

const deleteSheetColumnReducer = columnId => ({
  type: 'DELETE_SHEET_COLUMN',
  columnId: columnId
})

//-----------------------------------------------------------------------------
// Delete Sheet Row
//-----------------------------------------------------------------------------
export const deleteSheetRow = rowId => {
  return dispatch => {
    dispatch(deleteSheetRowReducer(rowId))
    mutation.deleteSheetRow(rowId)
  }
}

const deleteSheetRowReducer = rowId => ({
  type: 'DELETE_SHEET_ROW',
  rowId: rowId
})

//-----------------------------------------------------------------------------
// Set Sheet
//-----------------------------------------------------------------------------
export const setSheet = sheet => ({
  type: 'SET_SHEET',
  sheet: sheet
})

//-----------------------------------------------------------------------------
// Update Sheet Cell
//-----------------------------------------------------------------------------
export const updateSheetCell = (cellId, updates) => {
  return dispatch => {
    dispatch(updateSheetCellReducer(cellId, updates))
    mutation.updateSheetCell(cellId, updates)
  }
}

const updateSheetCellReducer = (cellId, updates) => ({
  type: 'UPDATE_SHEET_CELL',
  cellId: cellId,
  updates: updates
})

//-----------------------------------------------------------------------------
// Update Sheet Column
//-----------------------------------------------------------------------------
export const updateSheetColumn = (columnId, updates) => {
  return dispatch => {
    dispatch(updateSheetColumnReducer(columnId, updates))
    mutation.updateSheetColumn(columnId, updates)
  }
}

const updateSheetColumnReducer = (columnId, updates) => ({
  type: 'UPDATE_SHEET_COLUMN',
  columnId: columnId,
  updates: updates
})