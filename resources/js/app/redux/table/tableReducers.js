//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import moment from 'moment'
import _ from 'lodash'
import { date as dateConfig } from '../../../_config'

//-----------------------------------------------------------------------------
// Helper functions
//-----------------------------------------------------------------------------
const clone = object => {
  return JSON.parse(JSON.stringify(object))
}

const sortRows = (rows, sortColumn, sortOrder) => {
  const getRowValue = row => {
    const sortCell = _.find(row.cells, cell => {
      return cell.columnId === sortColumn.id
    })
    return sortCell[sortColumn.type.toLowerCase()]
  }
  const compareRowValues = (row1, row2) => {
    const row1Value = getRowValue(row1)
    const row2Value = getRowValue(row2)
    if (row1Value < row2Value) return sortOrder === 'ASC' ? -1 : 1
    if (row1Value > row2Value) return sortOrder === 'ASC' ? 1 : -1
    return 0
  }
  return rows.sort(compareRowValues)
}

//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  id: null,
  rows: null,
  columns: null,
  sortColumn: null,
  sortOrder: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const projectReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'CREATE_COLUMN': {
      console.log('CREATE_COLUMN')
      return state
    }

    case 'CREATE_ROW': {
      const newRowCells = state.columns.map(column => {
        return {
          id: _.random(-100000, -999999),
          tableId: state.activeTableId,
          columnId: column.id,
          rowId: null,
          string: null,
          number: null,
          boolean: null,
          datetime: moment().format(dateConfig.format)
        }
      })
      const newRow = {
        id: _.random(-100000, -999999),
        tableId: state.activeTableId,
        cells: newRowCells,
        isEditable: true
      }
      return {
        ...state,
        rows: [newRow, ...state.rows]
      }
    }

    case 'DELETE_ROW': {
      const {
        rowId
      } = action
      const nextRows = state.rows.filter(row => row.id !== rowId)
      return {
        ...state,
        rows: nextRows
      }
    }

    case 'SET_TABLE': {
      const {
        id,
        columns, 
        rows
      } = action
      console.log('SET_TABLE')
      const sortColumn = columns[0]
      const sortOrder = columns[0].defaultSortOrder
      const sortedRows = sortRows(rows, sortColumn, sortOrder)
      if(state.activeTableId === id) {
        return {
          ...state, 
          id: id,
          columns: columns,
          rows: sortedRows,
          sortColumn: sortColumn,
          sortOrder: sortOrder
        }
      }
      return state
    }

    case 'SET_TABLE_ID': {
      const {
        nextTableId,
      } = action
        return {
          ...state, 
          id: nextTableId,
          rows: null,
          columns: null,
          sortColumn: null,
          sortOrder: null
        }
    }

    case 'SORT_ROWS': {
      const {
        rows,
        sortColumn,
        sortOrder
      } = state
      const {
        nextSortColumn
      } = action

      const nextSortOrder = nextSortColumn.id === sortColumn.id
        ? sortOrder === 'ASC' ? 'DESC' : 'ASC' 
        : nextSortColumn.defaultSortOrder

      const nextRows = sortRows(rows, nextSortColumn, nextSortOrder)

      return {
        ...state,
        rows: nextRows,
        sortColumn: nextSortColumn,
        sortOrder: nextSortOrder
      }
    }

    case 'UPDATE_CELL': {
      const {
        cellIndex,
        nextCell,
        rowIndex
      } = action
      const nextState = clone(state)
      nextState.rows[rowIndex].cells[cellIndex] = nextCell
      return nextState
    }

    case 'UPDATE_CELL_ID': {
      const {
        cellIndex,
        nextCellId,
        rowIndex
      } = action
      const nextState = clone(state)
      nextState.rows[rowIndex].cells[cellIndex].id = nextCellId
      return nextState
    }

    case 'UPDATE_COLUMN_WIDTHS': {
      const {
        nextColumnWidths
      } = action
      const nextState = clone(state)
      nextColumnWidths.forEach(columnWidth => {
        const columnIndex = state.columns.findIndex(column => column.id === columnWidth.id)
        nextState.columns[columnIndex].width = columnWidth.nextWidth
      })
      return nextState
    }

      case 'UPDATE_ROW_ID': {
        const {
          nextRowId,
          rowIndex
        } = action
        const nextState = clone(state)
        nextState.rows[rowIndex].id = nextRowId
        return nextState
      }
  

    default:
      return state
  }
}

export default projectReducers