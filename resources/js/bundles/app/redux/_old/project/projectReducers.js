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

    default:
      return state
  }
}

export default projectReducers