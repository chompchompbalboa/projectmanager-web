//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import moment from 'moment'
import _ from 'lodash'

import { date as dateConfig } from '../../../_config'
import clone from '../../../_utils/clone'

//-----------------------------------------------------------------------------
// Helper functions
//-----------------------------------------------------------------------------
const defaultCell = (id, columnId) => ({
  id: _.random(-100000, -999999),
  tableId: id,
  columnId: columnId,
  rowId: null,
  string: null,
  number: null,
  boolean: null,
  datetime: moment().format(dateConfig.format)
})

const sortColumns = columns => {
  return columns.sort((a, b) => a.position - b.position)
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
const tableReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'CREATE_COLUMN': {
      const {
        beforeOrAfter,
        columnId
      } = action
      const insertWidth = 0.1
      const newColumnId = _.random(-100000, -999999)
      const newColumn = {
        id: newColumnId,
        tableId: state.id,
        name: "",
        required: true,
        position: null,
        type: 'STRING',
        defaultSortOrder: 'ASC',
        width: insertWidth,
        isEditable: true
      }
      const columnIndex = state.columns.findIndex(column => column.id === columnId)
      const insertIndex = beforeOrAfter === 'BEFORE' ? columnIndex : columnIndex + 1
      const columns = clone(state.columns)
      columns.splice(insertIndex, 0, newColumn)
      const nextColumns = columns.map((column, index) => {
        column.position = index
        column.width = column.width - (insertWidth / columns.length)
        return column
      })
      const nextRows = state.rows.map(row => {
        const nextCells = row.cells.concat([defaultCell(state.id, newColumnId)])
        return {...row, cells: nextCells}
      })
      return {
        ...state,
        columns: nextColumns,
        rows: nextRows
      }
    }

    case 'CREATE_ROW': {
      const newRowCells = state.columns.map(column => {
        return defaultCell(state.id, column.id)
      })
      const newRow = {
        id: _.random(-100000, -999999),
        tableId: state.id,
        cells: newRowCells,
        isEditable: true
      }
      return {
        ...state,
        rows: [newRow, ...state.rows]
      }
    }

    case 'DELETE_COLUMN': {
      const {
        columnId
      } = action
      const nextColumns = state.columns.filter(column => column.id !== columnId)
      const nextRows = state.rows.map(row => {
        const nextCells = row.cells.filter(cell => cell.columnId !== columnId)
        return {
          ...row,
          cells: nextCells
        }
      })
      return {
        ...state,
        columns: nextColumns,
        rows: nextRows
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
      const sortColumn = columns[0]
      const sortOrder = columns[0].defaultSortOrder
      const sortedColumns = sortColumns(columns)
      const sortedRows = sortRows(rows, sortColumn, sortOrder)
      if(state.id === id) {
        return {
          ...state, 
          id: id,
          columns: sortedColumns,
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

    case 'TOGGLE_COLUMN_IS_EDITABLE': {
      const {
        columnId
      } = action
      const nextColumns = state.columns.map(column => {
        if(column.id === columnId) {
          return {
            ...column,
            isEditable: column.isEditable ? false : true
          }
        }
        return {
          ...column,
          isEditable: false
        }
      })
      return {
        ...state,
        columns: nextColumns
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

    case 'UPDATE_COLUMN_ID': {
      const {
        nextColumnId,
        columnIndex
      } = action
      const columnId = state.columns[columnIndex].id
      const nextState = clone(state)
      const nextRows = nextState.rows.map(row => {
        const nextCells = row.cells.map(cell => {
          if (cell.columnId === columnId) {
            cell.columnId = nextColumnId
          }
          return cell
        })
        return {
          ...row,
          cells: nextCells
        }
      })
      nextState.columns[columnIndex].id = nextColumnId
      nextState.rows = nextRows
      return nextState
    }

    case 'UPDATE_COLUMN_NAME': {
      const {
        columnId,
        nextName
      } = action
      const nextColumns = state.columns.map(column => {
        if(column.id === columnId) {
          return {
            ...column,
            name: nextName
          }
        }
        return column
      })
      return {
        ...state,
        columns: nextColumns
      }
    }

    case 'UPDATE_COLUMN_TYPE': {
      const {
        columnId,
        nextType
      } = action
      const nextColumns = state.columns.map(column => {
        if(column.id === columnId) {
          return {
            ...column,
            type: nextType
          }
        }
        return column
      })
      return {
        ...state,
        columns: nextColumns
      }
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

    case 'UPDATE_ROWS': {
      const {
        nextRows
      } = action
      return {
        ...state,
        rows: nextRows
      }
    }
  

    default:
      return state
  }
}

export default tableReducers