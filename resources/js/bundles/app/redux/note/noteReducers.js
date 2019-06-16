//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const initialState = {
  id: null,
  value: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const viewReducers = (state = initialState, action) => {
  switch(action.type) {
      
    case 'SET_NOTE': {
      const {
        note
      } = action
      return note
    }
      
    case 'UPDATE_NOTE': {
      const {
        updates
      } = action
      return {...state, ...updates}
    }

    default:
      return state
  }
}

export default viewReducers