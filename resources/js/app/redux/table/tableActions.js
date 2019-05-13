//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation } from '../../../_api'

//-----------------------------------------------------------------------------
// Create Table Row
//-----------------------------------------------------------------------------
export const createTableRow = () => {
  return dispatch => {
    dispatch(createTableRowReducer())
    //mutation.createTableRow()
  }
}

const createTableRowReducer = () => ({
  type: 'CREATE_TABLE_ROW'
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