//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  activeModal: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const modalReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'UPDATE_ACTIVE_MODAL': {
      const {
        nextActiveModal
      } = action
      return {
        ...state,
        activeModal: nextActiveModal
      }
    }

    default:
      return state
  }
}

export default modalReducers