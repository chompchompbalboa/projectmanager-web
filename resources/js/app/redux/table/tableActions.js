//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

import { mutation } from '../../../_api'
import clone from '../../../_utils/clone'
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
// Create Table Row
//-----------------------------------------------------------------------------
export const createTableRow = () => {
  return (dispatch, getState) => {
    const {
      columnIds,
      id
    } = clone(getState().table)
    const newRowId = createUuid()
    // Create cells
    let newCells = {}
    columnIds.map(columnId => {
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

const createTableRowReducer = (newRow, newCells) => ({
  type: 'CREATE_TABLE_ROW',
  newRow: newRow,
  newCells: newCells
})

//-----------------------------------------------------------------------------
// Set Table
//-----------------------------------------------------------------------------
export const setTable = table => ({
  type: 'SET_TABLE',
  table: table
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