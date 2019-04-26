//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import containerNormalizer from './containerNormalizer'

//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const normalizedContainers = containerNormalizer(initialData.containers)
const defaultState = {
  containers: normalizedContainers.entities.containers,
  containerIds: normalizedContainers.result
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const containerReducers = (state = defaultState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default containerReducers