//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import moment from 'moment'
import _ from 'lodash'
import { date as dateConfig } from '../../_config'

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
  activeProject: null,
  activeTableId: null,
  activeTable: null,
  activeTableSortColumn: null,
  activeTableSortOrder: null,
  projects: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const projectReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'CREATE_ROW': {
      const newRowCells = state.activeTable.columns.map(column => {
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
        activeTable: {
          ...state.activeTable,
          rows: [newRow, ...state.activeTable.rows]
        }
      }
    }

    case 'DELETE_ROW': {
      const {
        rowId
      } = action
      const nextRows = state.activeTable.rows.filter(row => row.id !== rowId)
      return {
        ...state,
        activeTable: {
          ...state.activeTable,
          rows: nextRows
        }
      }
    }

    case 'SET_ACTIVE_PROJECT': 
      return {
        ...state, 
        activeProject: action.nextActiveProject,
        activeTableId: action.nextActiveProject.tables[0].id,
        activeTable: null
      }

    case 'SET_ACTIVE_TABLE': {
      const sortColumn = action.nextActiveTable.columns[0]
      const sortOrder = action.nextActiveTable.columns[0].defaultSortOrder
      const sortedRows = sortRows(action.nextActiveTable.rows, sortColumn, sortOrder)
      if(state.activeTableId === action.nextActiveTable.id) {
        return {
          ...state, 
          activeTable: {
            columns: action.nextActiveTable.columns,
            rows: sortedRows
          },
          activeTableSortColumn: sortColumn,
          activeTableSortOrder: sortOrder
        }
      }
      return state
    }

    case 'SET_ACTIVE_TABLE_ID': 
      return {
        ...state, 
        activeTable: null,
        activeTableId: action.nextActiveTableId
      }

    case 'SET_PROJECTS': 
      return {
        ...state, 
        projects: action.nextProjects
      }

    case 'SORT_ROWS': {
      const {
        activeTable,
        activeTableSortColumn,
        activeTableSortOrder
      } = state
      const {
        nextSortColumn
      } = action

      const nextActiveTableSortOrder = nextSortColumn.id === activeTableSortColumn.id
        ? activeTableSortOrder === 'ASC' ? 'DESC' : 'ASC' 
        : nextSortColumn.defaultSortOrder

      const nextActiveTableRows = sortRows(activeTable.rows, nextSortColumn, nextActiveTableSortOrder)

      return {
        ...state,
        activeTable: {
          ...state.activeTable,
          rows: nextActiveTableRows
        },
        activeTableSortColumn: nextSortColumn,
        activeTableSortOrder: nextActiveTableSortOrder
      }
    }

    case 'UPDATE_CELL': {
      const {
        cellIndex,
        nextCell,
        rowIndex
      } = action
      const nextState = clone(state)
      nextState.activeTable.rows[rowIndex].cells[cellIndex] = nextCell
      return nextState
    }

    case 'UPDATE_CELL_ID': {
      const {
        cellIndex,
        nextCellId,
        rowIndex
      } = action
      const nextState = clone(state)
      nextState.activeTable.rows[rowIndex].cells[cellIndex].id = nextCellId
      return nextState
    }

      case 'UPDATE_ROW_ID': {
        const {
          nextRowId,
          rowIndex
        } = action
        const nextState = clone(state)
        nextState.activeTable.rows[rowIndex].id = nextRowId
        return nextState
      }
  

    default:
      return state
  }
}

export default projectReducers