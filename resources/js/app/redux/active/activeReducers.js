//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { fromJS } from 'immutable'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
const initialState = fromJS({
  collectionId: initialData.activeCollectionId,
  containerId: initialData.activeContainerId,
  content: 'CONTAINER',
  viewId: initialData.activeViewId
})

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const activeReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_ACTIVE_COLLECTION_ID': {
      const {
        nextActiveCollectionId
      } = action
      return state.set('collectionId', fromJS(nextActiveCollectionId))
    }

    case 'UPDATE_ACTIVE_CONTAINER_ID': {
      const {
        nextActiveContainerId
      } = action
      return state.set('containerId', fromJS(nextActiveContainerId))
    }

    case 'UPDATE_ACTIVE_VIEW_ID': {
      const {
        nextActiveViewId
      } = action
      return state.set('viewId', fromJS(nextActiveViewId))
    }

    case 'UPDATE_ACTIVE_CONTENT': {
      const {
        nextActiveContent
      } = action
      return state.set('content', fromJS(nextActiveContent))
    }

    default:
      return state
  }
}

export default activeReducers