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

    default:
      return state
  }
}

export default projectReducers