//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation } from '../../../_api'
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
    console.log(updates)
    mutation.updateTableColumn(columnId, updates)
  }
}

const updateTableColumnReducer = (columnId, updates) => ({
  type: 'UPDATE_TABLE_COLUMN',
  columnId: columnId,
  updates: updates
})