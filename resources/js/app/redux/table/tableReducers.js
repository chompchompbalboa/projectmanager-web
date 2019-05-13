//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import tableNormalizer from './tableNormalizer'

//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const initialState = {
  id: null,
  cells: null,
  columns: null,
  columnIds: null,
  rows: null,
  rowIds: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const viewReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'SET_TABLE': {
      const {
        table
      } = action
      const normalizedTable = tableNormalizer(table)
      return {
        ...state,
        id: table.id,
        cells: normalizedTable.entities.cells,
        columns: normalizedTable.entities.columns,
        columnIds: normalizedTable.entities.table[table.id].columns,
        rows: normalizedTable.entities.rows,
        rowIds: normalizedTable.entities.table[table.id].rows
      }
    }

    case 'UPDATE_TABLE_COLUMN':  {
      const {
        columnId,
        updates
      } = action
      return {
        ...state, columns: {
          ...state.columns, [columnId]: {
            ...state.columns[columnId], ...updates
          }
        }
      }
    }

    default:
      return state
  }
}

export default viewReducers