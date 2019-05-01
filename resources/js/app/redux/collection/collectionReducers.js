//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { fromJS } from 'immutable'

import collectionNormalizer from './collectionNormalizer'

//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const normalizedCollections = collectionNormalizer(initialData.collections)
const initialState = fromJS({
  collections: normalizedCollections.entities.collections,
  collectionIds: normalizedCollections.result
})

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const collectionReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_COLLECTION_IDS': {
      const {
        nextCollectionIds
      } = action
      return state.set('collectionIds', fromJS(nextCollectionIds))
    }

    case 'UPDATE_COLLECTIONS': {
      const {
        nextCollections
      } = action
      return state.set('collections', fromJS(nextCollections))
    }

    default:
      return state
  }
}

export default collectionReducers