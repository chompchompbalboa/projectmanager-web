//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { query } from '../../../_api'

import { updateCollectionIds, updateCollections } from '../collection/collectionActions'
import { updateViewIds, updateViews } from '../view/viewActions'

import collectionNormalizer from '../collection/collectionNormalizer'
import viewNormalizer from '../view/viewNormalizer'

//-----------------------------------------------------------------------------
// Update Active Container Id
//-----------------------------------------------------------------------------
export const updateActiveContainerId = nextActiveContainerId => {
  return dispatch => {
    dispatch(updateActiveContainerIdReducer(nextActiveContainerId))
    dispatch(updateActiveCollectionIdReducer(null))
    dispatch(updateActiveViewIdReducer(null))
    dispatch(updateCollections(null))
    dispatch(updateCollectionIds(null))
    dispatch(updateViews(null))
    dispatch(updateViewIds(null))
    dispatch(updateActiveContainerIdServer(nextActiveContainerId))
  }
}

const updateActiveContainerIdReducer = nextActiveContainerId => ({
  type: 'UPDATE_ACTIVE_CONTAINER_ID',
  nextActiveContainerId: nextActiveContainerId
})

const updateActiveContainerIdServer = nextActiveContainerId => {
  return dispatch => {
    query.getContainer(nextActiveContainerId).then(nextActiveContainer => {
      const {
        nextActiveCollectionId,
        nextActiveViewId,
        nextCollections,
        nextViews
      } = nextActiveContainer
      const normalizedCollections = collectionNormalizer(nextCollections)
      const normalizedViews = viewNormalizer(nextViews)
      dispatch(updateCollections(normalizedCollections.entities.collections))
      dispatch(updateCollectionIds(normalizedCollections.result))
      dispatch(updateViews(normalizedViews.entities.views))
      dispatch(updateViewIds(normalizedViews.result))
      dispatch(updateActiveCollectionIdReducer(nextActiveCollectionId))
      dispatch(updateActiveViewIdReducer(nextActiveViewId))
    })
  }
}

//-----------------------------------------------------------------------------
// Update Active Collection Id
//-----------------------------------------------------------------------------
export const updateActiveCollectionId = nextActiveCollectionId => {
  return dispatch => {
    dispatch(updateActiveCollectionIdReducer(nextActiveCollectionId))
    dispatch(updateActiveViewIdReducer(null))
    dispatch(updateViews(null))
    dispatch(updateViewIds(null))
    dispatch(updateActiveCollectionIdServer(nextActiveCollectionId))
  }
}

const updateActiveCollectionIdReducer = nextActiveCollectionId => ({
  type: 'UPDATE_ACTIVE_COLLECTION_ID',
  nextActiveCollectionId: nextActiveCollectionId
})

const updateActiveCollectionIdServer = nextActiveCollectionId => {
  return dispatch => {
    query.getCollection(nextActiveCollectionId).then(nextActiveCollection => {
      const {
        nextActiveViewId,
        nextViews
      } = nextActiveCollection
      const normalizedViews = viewNormalizer(nextViews)
      dispatch(updateViews(normalizedViews.entities.views))
      dispatch(updateViewIds(normalizedViews.result))
      dispatch(updateActiveCollectionIdReducer(nextActiveCollectionId))
      dispatch(updateActiveViewIdReducer(nextActiveViewId))
    })
  }
}

//-----------------------------------------------------------------------------
// Update Active View Id
//-----------------------------------------------------------------------------
const updateActiveViewIdReducer = nextActiveViewId => ({
  type: 'UPDATE_ACTIVE_VIEW_ID',
  nextActiveViewId: nextActiveViewId
})