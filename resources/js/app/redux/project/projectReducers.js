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
  console.log(action)
  switch(action.type) {

    case 'CREATE_TABLE_IN_ACTIVE_PROJECT': {
      const nextTable = {
        id: _.random(-100000, -999999),
        name: "",
        isEditing: true
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

    case 'TOGGLE_TABLE_IS_EDITING': {
      const {
        tableId
      } = action
      const nextActiveProjectTables = state.activeProject.tables.map(table => {
        return {
          ...table,
          isEditing: table.id === tableId ? (table.isEditing ? false : true) : table.isEditing
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