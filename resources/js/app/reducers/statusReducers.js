//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  MESSAGE: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const projectReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'SET_STATUS_MESSAGE': {
      console.log('SET_STATUS_MESSAGE')
      return state
    }

    default:
      return state
  }
}

export default projectReducers