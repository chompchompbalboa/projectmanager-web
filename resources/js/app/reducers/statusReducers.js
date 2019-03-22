//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import _ from 'lodash'

//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  message: null
}

//-----------------------------------------------------------------------------
// Messages
//-----------------------------------------------------------------------------
const messages = {
  SAVING: "Saving...",
  WAITING_TO_SAVE: "Waiting to save..."
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const projectReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'SET_STATUS_MESSAGE': {
      const nextState = _.cloneDeep(state)
      nextState.message = messages[action.status]
      return nextState
    }

    default:
      return state
  }
}

export default projectReducers