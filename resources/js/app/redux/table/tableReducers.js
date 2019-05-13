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
// Defaults
//-----------------------------------------------------------------------------
const tempId = () => _.random(-100000, -999999)

const defaultCell = (tableId, columnId, rowId) => ({
  id: tempId(),
  tableId: tableId,
  columnId: columnId,
  rowId: rowId,
  value: null
})


//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const viewReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'CREATE_TABLE_ROW': {
      const {
        columnIds,
        id
      } = state
      const newRowId = tempId()
      console.log(columnIds)
      const newRow = columnIds.map(columnId => defaultCell(id, columnId, newRowId))
      console.log(newRowId)
      console.log(newRow)
      return state
    }

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