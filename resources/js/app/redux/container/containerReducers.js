//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { fromJS } from 'immutable'

import containerNormalizer from './containerNormalizer'

//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const normalizedContainers = containerNormalizer(initialData.containers)
const initialState = fromJS({
  containers: normalizedContainers.entities.containers,
  containerIds: normalizedContainers.result
})

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const containerReducers = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default containerReducers