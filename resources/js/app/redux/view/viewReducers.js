//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  activeContainerId: initialData.activeContainerId,
  activeModal: null,
  leftColumnWidth: 0.13
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const viewReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'UPDATE_ACTIVE_CONTAINER_ID': {
      const {
        nextActiveContainerId
      } = action
      return {
        ...state,
        activeContainerId: nextActiveContainerId
      }
    }

    case 'UPDATE_ACTIVE_MODAL': {
      const {
        nextActiveModal
      } = action
      return {
        ...state,
        activeModal: nextActiveModal
      }
    }

    case 'UPDATE_LEFT_COLUMN_WIDTH': {
      const {
        nextLeftColumnWidth
      } = action
      return {
        ...state,
        leftColumnWidth: nextLeftColumnWidth !== null ? nextLeftColumnWidth : state.leftColumnWidth
      }
    }

    default:
      return state
  }
}

export default viewReducers