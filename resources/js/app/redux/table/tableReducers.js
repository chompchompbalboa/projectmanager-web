//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import _ from 'lodash'

import clone from '../../../_utils/clone'

//-----------------------------------------------------------------------------
// Helper functions
//-----------------------------------------------------------------------------
const breakdownRows = (rows, columns, formulas) => {
  let brokendownRows = rows
  formulas.forEach(formula => {
    brokendownRows = brokendownRows.filter(row => {
      const column = columns.find(column => column.id === formula.columnId)
      const cell = row.cells.find(cell => cell.columnId === formula.columnId)
      const rowValue = cell[column.type.toLowerCase()]
      const formulaValue = formula[column.type.toLowerCase()]
      switch(formula.type) {
        case 'EQUALS':
          return rowValue == formulaValue
        case 'GREATER_THAN':
          return rowValue > formulaValue
        case 'LESS_THAN':
          return rowValue < formulaValue
        default: 
          return true
      }
    })
  })
  return brokendownRows
}

const defaultCell = (id, columnId) => ({
  id: _.random(-100000, -999999),
  tableId: id,
  columnId: columnId,
  rowId: null,
  string: null,
  number: null,
  boolean: false,
  datetime: null
})

const defaultColumn = (id, tableId, width) => ({
  id: id,
  tableId: tableId,
  name: "",
  required: true,
  position: null,
  type: 'STRING',
  width: width,
  isEditing: false,
  isRenaming: true
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
  breakdown: null,
  id: null,
  isEditing: false,
  rows: null,
  columns: null,
  sortColumn: null,
  sortOrder: null,
  visibleRows: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const tableReducers = (state = defaultState, action) => {
  switch(action.type) {
      
    case 'CREATE_BREAKDOWN': {
      const {
        tableId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : [...table.breakdowns, {
            id: _.random(-100000, -900000),
            name: null,
            formulas: []
          }]
        }
      })
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'CREATE_BREAKDOWN_FORMULA': {
      const {
        breakdownId,
        defaultColumnId,
        tableId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.map(breakdown => {
            return {
              ...breakdown,
              formulas: breakdown.id !== breakdownId ? breakdown.formulas : [...breakdown.formulas, {
                id: _.random(-100000, -900000),
                type: 'EQUALS',
                columnId: defaultColumnId,
                boolean: null,
                datetime: null, 
                number: null,
                string: null
              }]
            }
          })
        }
      })
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'CREATE_COLUMN': {
      const {
        beforeOrAfter,
        columnId
      } = action
      const columnIndex = state.columns.findIndex(column => column.id === columnId)
      const insertIndex = beforeOrAfter === 'BEFORE' ? columnIndex : columnIndex + 1
      const columns = clone(state.columns)
      const insertWidth = Number((1 / (columns.length + 1)).toFixed(2))
      const newColumnId = _.random(-100000, -999999)
      const newColumn = defaultColumn(newColumnId, state.id, insertWidth)
      columns.splice(insertIndex, 0, newColumn)
      let totalWidth = 0
      const nextColumns = columns.map((column, index) => {
        const isLastColumn = index === columns.length - 1
        const calculatedColumnWidth = Number((column.id !== newColumnId ? (column.width * (1 - insertWidth)) : insertWidth).toFixed(2))
        column.position = index
        column.width = Number((isLastColumn ? 1 - totalWidth : calculatedColumnWidth).toFixed(2))
        totalWidth = totalWidth + calculatedColumnWidth
        return column
      })
      const nextRows = state.rows.map(row => {
        const nextCells = row.cells.concat([defaultCell(state.id, newColumnId)])
        return {...row, cells: nextCells}
      })
      const nextVisibleRows = state.visibleRows.map(row => {
        const nextCells = row.cells.concat([defaultCell(state.id, newColumnId)])
        return {...row, cells: nextCells}
      })
      return {
        ...state,
        columns: nextColumns,
        rows: nextRows,
        visibleRows: nextVisibleRows
      }
    }

    case 'CREATE_ROW': {
      const newRowCells = state.columns.map(column => {
        return defaultCell(state.id, column.id)
      })
      const newRowId = _.random(-100000, -999999)
      const newRow = {
        id: newRowId,
        tableId: state.id,
        cells: newRowCells,
        isEditable: true
      }
      return {
        ...state,
        rows: [newRow, ...state.rows],
        visibleRows: [newRow, ...state.visibleRows]
      }
    }

    case 'CREATE_TABLE': {
      const tableId = _.random(-100000, -999999)
      const firstColumn = defaultColumn(null, tableId, 1)
      return {
        breakdown: null,
        id: tableId,
        isEditing: true,
        rows: [],
        columns: [{...firstColumn, position: 0}],
        sortColumn: firstColumn,
        sortOrder: 'ASC',
        tables: [...state.tables, {
          id: tableId,
          name: "",
          breakdowns: [],
          isRenaming: true,
        }],
        visibleRows: []
      }
    }

    case 'DELETE_BREAKDOWN': {
      const {
        tableId,
        breakdownId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.filter(breakdown => breakdown.id !== breakdownId)
        }
      })
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'DELETE_BREAKDOWN_FORMULA': {
      const {
        tableId,
        breakdownId,
        formulaId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.map(breakdown => {
            return {
              ...breakdown,
              formulas: breakdown.id !== breakdownId ? breakdown.formulas : breakdown.formulas.filter(formula => formula.id !== formulaId)
            }
          })
        }
      })
      return {
        ...state,
        tables: nextTables
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
      const nextVisibleRows = state.visibleRows.map(row => {
        const nextCells = row.cells.filter(cell => cell.columnId !== columnId)
        return {
          ...row,
          cells: nextCells
        }
      })
      return {
        ...state,
        columns: nextColumns,
        rows: nextRows,
        visibleRows: nextVisibleRows
      }
    }

    case 'DELETE_ROW': {
      const {
        rowId
      } = action
      const nextRows = state.rows.filter(row => row.id !== rowId)
      const nextVisibleRows = state.visibleRows.filter(row => row.id !== rowId)
      return {
        ...state,
        rows: nextRows,
        visibleRows: nextVisibleRows
      }
    }

    case 'DELETE_TABLE': {
      const {
        tableId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.filter(table => table.id !== tableId)
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'SET_BREAKDOWN': {
      const {
        nextBreakdown,
        nextTableId
      } = action
      if (nextTableId !== state.id) {
        return {
          ...state,
          breakdown: nextBreakdown,
          id: nextTableId,
          rows: null,
          columns: null,
          sortColumn: null,
          sortOrder: null
        }
      }
      return {
        ...state,
        breakdown: nextBreakdown,
        visibleRows: nextBreakdown !== null ? sortRows(breakdownRows(state.rows, state.columns, nextBreakdown.formulas), state.sortColumn, state.sortOrder) : state.rows
      }
    }

    case 'SET_TABLE': {
      const {
        id,
        columns, 
        rows
      } = action
      const isNewTable = columns.length === 0
      const sortColumn = isNewTable ? null : columns[0] 
      const sortOrder = isNewTable ? null : columns[0].defaultSortOrder
      const sortedColumns = isNewTable ? columns : sortColumns(columns)
      const brokendownRows = state.breakdown === null ? rows : breakdownRows(rows, columns, state.breakdown.formulas)
      const sortedBrokendownRows = isNewTable ? brokendownRows : sortRows(brokendownRows, sortColumn, sortOrder)
      if(state.id === id) {
        return {
          ...state, 
          id: id,
          columns: sortedColumns,
          rows: rows,
          sortColumn: sortColumn,
          sortOrder: sortOrder,
          visibleRows: sortedBrokendownRows
        }
      }
      return state
    }

    case 'SET_TABLE_ID': {
      const {
        nextTableId,
      } = action
      if(state.id !== nextTableId) {
        return {
          ...state, 
          id: nextTableId,
          breakdown: null,
          rows: null,
          columns: null,
          sortColumn: null,
          sortOrder: null,
          visibleRows: null,
        }
      }
      return {
        ...state,
        breakdown: null,
        visibleRows: state.rows
      }
    }

    case 'SET_TABLES': {
      const {
        nextTables
      } = action
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'SORT_ROWS': {
      const {
        visibleRows
      } = state
      const {
        nextSortColumnId,
        nextSortOrder
      } = action

      const nextSortColumn = state.columns.find(column => column.id === nextSortColumnId)
      const nextVisibleRows = sortRows(visibleRows, nextSortColumn, nextSortOrder)

      return {
        ...state,
        sortColumn: nextSortColumn,
        sortOrder: nextSortOrder,
        visibleRows: nextVisibleRows,
      }
    }

    case 'TOGGLE_COLUMN_IS_RENAMING': {
      const {
        columnId
      } = action
      const nextColumns = state.columns.map(column => {
        if(column.id === columnId) {
          return {
            ...column,
            isRenaming: column.isRenaming ? false : true
          }
        }
        return {
          ...column,
          isRenaming: false
        }
      })
      return {
        ...state,
        columns: nextColumns
      }
    }

    case 'TOGGLE_TABLE_IS_RENAMING': {
      const {
        tableId
      } = action
      const {
        tables
      } = state
      const nextActiveProjectTables = tables.map(table => {
        return {
          ...table,
          isRenaming: table.id === tableId ? (table.isRenaming ? false : true) : table.isRenaming
        }
      })
      return {
        ...state,
        tables: nextActiveProjectTables
      }
    }

    case 'UPDATE_BREAKDOWN_FORMULA_COLUMN_ID': {
      const {
        breakdownId,
        formulaId,
        nextBreakdownFormulaColumnId,
        tableId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.map(breakdown => {
            return {
              ...breakdown,
              formulas: breakdown.id !== breakdownId ? breakdown.formulas : breakdown.formulas.map(formula => {
                return {
                  ...formula,
                  columnId: formula.id !== formulaId ? formula.columnId : Number(nextBreakdownFormulaColumnId)
                }
              })
            }
          })
        }
      })
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'UPDATE_BREAKDOWN_FORMULA_ID': {
      const {
        breakdownId,
        formulaId,
        nextFormulaId,
        tableId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.map(breakdown => {
            return {
              ...breakdown,
              formulas: breakdown.id !== breakdownId ? breakdown.formulas : breakdown.formulas.map(formula => {
                return {
                  ...formula,
                  id: formula.id !== formulaId ? formula.id : nextFormulaId
                }
              })
            }
          })
        }
      })
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'UPDATE_BREAKDOWN_FORMULA_TYPE': {
      const {
        breakdownId,
        formulaId,
        nextBreakdownFormulaType,
        tableId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.map(breakdown => {
            return {
              ...breakdown,
              formulas: breakdown.id !== breakdownId ? breakdown.formulas : breakdown.formulas.map(formula => {
                return {
                  ...formula,
                  type: formula.id !== formulaId ? formula.type : nextBreakdownFormulaType
                }
              })
            }
          })
        }
      })
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'UPDATE_BREAKDOWN_FORMULA_VALUE': {
      const {
        breakdownId,
        columnType,
        formulaId,
        nextBreakdownFormulaValue,
        tableId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.map(breakdown => {
            return {
              ...breakdown,
              formulas: breakdown.id !== breakdownId ? breakdown.formulas : breakdown.formulas.map(formula => {
                return {
                  ...formula,
                  boolean: formula.id === formulaId && columnType === 'BOOLEAN' ? nextBreakdownFormulaValue : formula.boolean,
                  datetime: formula.id === formulaId && columnType === 'DATETIME' ? nextBreakdownFormulaValue : formula.datetime,
                  number: formula.id === formulaId && columnType === 'NUMBER' ? nextBreakdownFormulaValue : formula.number,
                  string: formula.id === formulaId && columnType === 'STRING' ? nextBreakdownFormulaValue : formula.string
                }
              })
            }
          })
        }
      })
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'UPDATE_BREAKDOWN_ID': {
      const {
        breakdownId,
        nextBreakdownId,
        tableId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.map(breakdown => {
            return {
              ...breakdown,
              id: breakdown.id !== breakdownId ? breakdown.id : nextBreakdownId
            }
          })
        }
      })
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'UPDATE_BREAKDOWN_NAME': {
      const {
        breakdownId,
        nextBreakdownName,
        tableId
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.map(breakdown => {
            return {
              ...breakdown,
              name: breakdown.id !== breakdownId ? breakdown.name : nextBreakdownName
            }
          })
        }
      })
      return {
        ...state,
        tables: nextTables
      }
    }

    case 'UPDATE_CELL': {
      const {
        cellId,
        nextCell,
        rowId
      } = action
      const nextState = clone(state)

      const rowsRowIndex = state.rows.findIndex(row => row.id === rowId)
      const rowsCellIndex = state.rows[rowsRowIndex].cells.findIndex(cell => cell.id === cellId)
      nextState.rows[rowsRowIndex].cells[rowsCellIndex] = nextCell

      const visibleRowsRowIndex = state.visibleRows.findIndex(row => row.id === rowId)
      const visibleRowsCellIndex = state.visibleRows[visibleRowsRowIndex].cells.findIndex(cell => cell.id === cellId)
      nextState.visibleRows[visibleRowsRowIndex].cells[visibleRowsCellIndex] = nextCell

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
      const nextVisibleRows = nextState.visibleRows.map(row => {
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
      nextState.visibleRows = nextVisibleRows
      return nextState
    }

    case 'UPDATE_COLUMN_NAME': {
      const {
        columnId,
        nextName
      } = action
      const nextColumns = state.columns.map(column => {
        return {
          ...column,
          name: column.id === columnId ? nextName : column.name
        }
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
        rowId
      } = action
      const nextState = clone(state)
      const rowsRowIndex = nextState.rows.findIndex(row => row.id === rowId)
      const visibleRowsRowIndex = nextState.visibleRows.findIndex(row => row.id === rowId)
      nextState.rows[rowsRowIndex].id = nextRowId
      nextState.visibleRows[visibleRowsRowIndex].id = nextRowId
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

    case 'UPDATE_TABLE_NAME': {
      const {
        tableId,
        nextTableName
      } = action
      const {
        tables
      } = state
      const nextActiveProjectTables = tables.map(table => {
        return {
          ...table,
          name: table.id === tableId ? nextTableName : table.name
        }
      })
      return {
        ...state,
        tables: nextActiveProjectTables
      }
    }

    case 'UPDATE_VISIBLE_ROWS': {
      const {
        nextVisibleRows
      } = action
      return {
        ...state,
        visibleRows: nextVisibleRows
      }
    }

    case 'UPDATE_TABLE_ID': {
      const {
        nextTableId,
      } = action
      const {
        tables
      } = state
      const nextTables = tables.map(table => {
        return {
          ...table,
          id: table.id === state.id ? nextTableId : table.id
        }
      })
      return {
        ...state,
        id: nextTableId,
        tables: nextTables
      }
    }
  

    default:
      return state
  }
}

export default tableReducers