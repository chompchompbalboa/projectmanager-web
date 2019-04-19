//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import _ from 'lodash'

//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  activeProject: null,
  projects: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const projectReducers = (state = defaultState, action) => {
  switch(action.type) {
      
    case 'CREATE_BREAKDOWN': {
      const {
        tableId
      } = action
      const {
        activeProject
      } = state
      const nextTables = activeProject.tables.map(table => {
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
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
      }
    }

    case 'CREATE_BREAKDOWN_FORMULA': {
      const {
        breakdownId,
        defaultColumnId,
        tableId
      } = action
      const {
        activeProject
      } = state
      const nextTables = activeProject.tables.map(table => {
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
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
      }
    }

    case 'CREATE_TABLE_IN_ACTIVE_PROJECT': {
      const nextTable = {
        id: _.random(-100000, -999999),
        name: "",
        breakdowns: [],
        isRenaming: true,
      }
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          tables: [
            ...state.activeProject.tables, 
            nextTable
          ]
        }
      }
    }

    case 'DELETE_BREAKDOWN': {
      const {
        tableId,
        breakdownId
      } = action
      const nextTables = state.activeProject.tables.map(table => {
        return {
          ...table,
          breakdowns: table.id !== tableId ? table.breakdowns : table.breakdowns.filter(breakdown => breakdown.id !== breakdownId)
        }
      })
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
      }
    }

    case 'DELETE_BREAKDOWN_FORMULA': {
      const {
        tableId,
        breakdownId,
        formulaId
      } = action
      const nextTables = state.activeProject.tables.map(table => {
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
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
      }
    }

    case 'DELETE_TABLE': {
      const {
        tableId
      } = action
      const nextTables = state.activeProject.tables.filter(table => table.id !== tableId)
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
      }
    }

    case 'SET_ACTIVE_PROJECT': 
      return {
        ...state, 
        activeProject: action.nextActiveProject,
      }

    case 'SET_PROJECTS': 
      return {
        ...state, 
        projects: action.nextProjects
      }

    case 'TOGGLE_TABLE_IS_RENAMING': {
      const {
        tableId
      } = action
      const nextActiveProjectTables = state.activeProject.tables.map(table => {
        return {
          ...table,
          isRenaming: table.id === tableId ? (table.isRenaming ? false : true) : table.isRenaming
        }
      })
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          tables: nextActiveProjectTables
        }
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
        activeProject
      } = state
      const nextTables = activeProject.tables.map(table => {
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
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
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
        activeProject
      } = state
      const nextTables = activeProject.tables.map(table => {
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
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
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
        activeProject
      } = state
      const nextTables = activeProject.tables.map(table => {
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
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
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
        activeProject
      } = state
      const nextTables = activeProject.tables.map(table => {
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
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
      }
    }

    case 'UPDATE_BREAKDOWN_ID': {
      const {
        breakdownId,
        nextBreakdownId,
        tableId
      } = action
      const {
        activeProject
      } = state
      const nextTables = activeProject.tables.map(table => {
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
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
      }
    }

    case 'UPDATE_BREAKDOWN_NAME': {
      const {
        breakdownId,
        nextBreakdownName,
        tableId
      } = action
      const {
        activeProject
      } = state
      const nextTables = activeProject.tables.map(table => {
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
        activeProject: {
          ...state.activeProject,
          tables: nextTables
        }
      }
    }
      
    case 'UPDATE_TABLE_ID_IN_ACTIVE_PROJECT_TABLES': {
      const {
        tableId,
        nextTableId
      } = action
      const nextActiveProjectTables = state.activeProject.tables.map(table => {
        return {
          ...table,
          id: table.id === tableId ? nextTableId : table.id
        }
      })
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          tables: nextActiveProjectTables
        }
      }
    }

    case 'UPDATE_TABLE_NAME': {
      const {
        tableId,
        nextTableName
      } = action
      const nextActiveProjectTables = state.activeProject.tables.map(table => {
        return {
          ...table,
          name: table.id === tableId ? nextTableName : table.name
        }
      })
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          tables: nextActiveProjectTables
        }
      }
    }

    default:
      return state
  }
}

export default projectReducers