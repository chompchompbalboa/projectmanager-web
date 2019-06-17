//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
const initialState = {
  folderPath: null,
  fileId: null,
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const activeReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_ACTIVE_FOLDER_PATH': {
      const { nextActiveFolderPath } = action
      return { ...state, folderPath: nextActiveFolderPath }
    }

    case 'UPDATE_ACTIVE_FILE_ID': {
      const { nextActiveFileId } = action
      return { ...state, fileId: nextActiveFileId }
    }

    default:
      return state
  }
}

export default activeReducers