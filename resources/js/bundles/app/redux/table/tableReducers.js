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

    case 'CREATE_TABLE': {
      const {
        newTable
      } = action
      return newTable
    }

    case 'CREATE_TABLE_COLUMN': {
      const {
        newColumn,
        newCells,
        nextRows
      } = action
      const nextState = {
        ...state,
        cells: { ...state.cells, ...newCells },
        columnIds: [ ...state.columnIds, newColumn.id ],
        columns: { ...state.columns, [newColumn.id]: newColumn },
        rows: nextRows
      }
      return nextState
    }

    case 'CREATE_TABLE_ROW': {
      const {
        newCells,
        newRow
      } = action
      const nextState = {
        ...state,
        cells: { ...state.cells, ...newCells },
        rows: { ...state.rows, [newRow.id]: newRow },
        rowIds: [ ...state.rowIds, newRow.id ]
      }
      return nextState
    }

    case 'DELETE_TABLE_COLUMN': {
      const {
        columnId
      } = action
      const { [columnId]: {}, ...nextColumns } = state.columns
      const nextColumnIds = state.columnIds.filter(column => column !== columnId)
      const nextState = {
        ...state,
        columns: nextColumns,
        columnIds: nextColumnIds,
        rowIds: nextColumnIds.length !== 0 ? state.rowIds : [],
        rows: nextColumnIds.length !== 0 ? state.rows : {}
      }
      return nextState
    }

    case 'DELETE_TABLE_ROW': {
      const {
        rowId
      } = action
      const { [rowId]: {}, ...nextRows } = state.rows
      const nextState = {
        ...state,
        rows: nextRows,
        rowIds: state.rowIds.filter(row => row !== rowId)
      }
      return nextState
    }

    case 'SET_TABLE': {
      const {
        table
      } = action
      const normalizedTable = tableNormalizer(table)
      return {
        ...state,
        id: table.id,
        cells: normalizedTable.entities.cells || {},
        columns: normalizedTable.entities.columns || {},
        columnIds: normalizedTable.entities.table[table.id].columns || [],
        rows: normalizedTable.entities.rows || {},
        rowIds: normalizedTable.entities.table[table.id].rows || [] 
      }
    }

    case 'UPDATE_TABLE_CELL':  {
      const {
        cellId,
        updates
      } = action
      return {
        ...state, cells: {
          ...state.cells, [cellId]: {
            ...state.cells[cellId], ...updates
          }
        }
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