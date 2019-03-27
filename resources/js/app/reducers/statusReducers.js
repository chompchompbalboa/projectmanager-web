//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  status: 'LOADING',
  message: ""
}

//-----------------------------------------------------------------------------
// Messages
//-----------------------------------------------------------------------------
const messages = {
  ADDING_ROW: "Saving...",
  ADDED_ROW: "Saved",
  DELETED: "Deleted",
  DELETING: "Deleting...",
  LOADING: "Loading...",
  READY: "",
  SAVING: "Saving...",
  SAVED: "Saved",
  UPDATING_CELL: "Saving...",
  UPDATED_CELL: "Saved"
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const statusReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
        message: messages[action.status]
      }
    }

    default:
      return state
  }
}

export default statusReducers