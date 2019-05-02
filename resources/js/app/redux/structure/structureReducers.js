//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { fromJS } from 'immutable'

import structureNormalizer from './structureNormalizer'

//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const initialState = fromJS({
  containers: null,
  containerIds: null
})

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const viewReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_VIEW_IDS': {
      const {
        nextViewIds
      } = action
      return state.set('viewIds', fromJS(nextViewIds))
    }

    case 'UPDATE_VIEWS': {
      const {
        nextViews
      } = action
      return state.set('views', fromJS(nextViews))
    }

    case 'SET_STRUCTURE': {
      const {
        structure
      } = action
      console.log(structure)
      const normalizedStructure = structureNormalizer(structure)
      console.log(normalizedStructure)
      return fromJS({
        containers: normalizedStructure.entities.containers,
        containerIds: normalizedStructure.result
      })
    }

    default:
      return state
  }
}

export default viewReducers