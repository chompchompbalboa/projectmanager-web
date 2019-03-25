//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import _ from 'lodash'

//-----------------------------------------------------------------------------
// Helper functions
//-----------------------------------------------------------------------------
const clone = object => {
  return JSON.parse(JSON.stringify(object))
}

//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  activeProject: null,
  activeTableId: null,
  activeTable: null,
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
          datetime: null
        }
      })
      const newRow = {
        id: _.random(-100000, -999999),
        tableId: state.activeTableId,
        cells: newRowCells,
        isEditable: true,
        isSortable: false
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

    case 'SET_ACTIVE_TABLE':
      if(state.activeTableId === action.nextActiveTable.id) {
        return {
          ...state, 
          activeTable: {
            columns: action.nextActiveTable.columns,
            rows: action.nextActiveTable.rows
          }
        }
      }
      return state

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