//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  id: Number(initialData.organizationId),
  name: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const organizationReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'SET_ORGANIZATION_NAME': {
      const {
        nextName
      } = action

      return {
        ...state,
        name: nextName
      }
    }

    default:
      return state
  }
}

export default organizationReducers