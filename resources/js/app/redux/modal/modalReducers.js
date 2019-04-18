//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  activeModal: null,
  activeModalTableId: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const modalReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'UPDATE_ACTIVE_MODAL': {
      const {
        nextActiveModal,
        nextActiveId
      } = action

      return {
        ...state,
        activeModal: nextActiveModal,
        activeModalTableId: nextActiveModal === 'BREAKDOWNS' ? nextActiveId : null
      }
    }

    default:
      return state
  }
}

export default modalReducers