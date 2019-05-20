//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
const initialState = {
  id: initialData.user.active.id,
  content: 'FOLDERS',
  openFolders: initialData.user.active.openFolders,
  moduleId: initialData.user.active.moduleId,
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const activeReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_ACTIVE_CONTENT': {
      const { nextActiveContent } = action
      return { ...state, content: nextActiveContent }
    }

    case 'UPDATE_ACTIVE_MODULE_ID': {
      const { nextActiveModuleId } = action
      return { ...state, moduleId: nextActiveModuleId }
    }

    default:
      return state
  }
}

export default activeReducers