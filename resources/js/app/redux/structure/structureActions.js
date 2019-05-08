//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation, query } from '../../../_api'

import { createContainer, deleteContainer, updateContainerId, updateContainerReducer } from '../container/containerActions'
import { selectUserId } from '../user/userSelectors'

//-----------------------------------------------------------------------------
// Create Structure Collection
//-----------------------------------------------------------------------------
export const createStructureCollection = containerId => {
  return (dispatch, getState) => {
    dispatch(createStructureCollectionReducer(containerId))
    const newCollection = getState().getIn(['structure', 'collections']).find(collection => Number(collection.get('id')) < 0).delete('views').delete('isCollectionRenaming')
    const newCollectionId = newCollection.get('id')
    mutation.createCollection(containerId, newCollectionId, newCollection.toJS()).then(collectionIds => {
      const {
        collectionId,
        nextCollectionId
      } = collectionIds
      dispatch(updateStructureCollectionId(containerId, collectionId, nextCollectionId))
    })
  }
}

const createStructureCollectionReducer = containerId => ({
  type: 'CREATE_STRUCTURE_COLLECTION',
  containerId: containerId
})

const updateStructureCollectionId = (containerId, collectionId, nextCollectionId) => ({
  type: 'UPDATE_STRUCTURE_COLLECTION_ID',
  containerId: containerId,
  collectionId: collectionId,
  nextCollectionId: nextCollectionId
})

//-----------------------------------------------------------------------------
// Create Structure Container
//-----------------------------------------------------------------------------
export const createStructureContainer = () => {
  return (dispatch, getState) => {
    dispatch(createStructureContainerReducer())
    const newContainer = getState().getIn(['structure', 'containers']).find(container => Number(container.get('id')) < 0).delete('collections').delete('isContainerRenaming')
    const newContainerId = newContainer.get('id')
    const userId = getState().getIn(['user', 'id'])
    dispatch(createContainer(newContainerId, newContainer))
    mutation.createContainer(userId, newContainerId, newContainer.toJS()).then(containerIds => {
      const {
        containerId,
        nextContainerId
      } = containerIds
      dispatch(updateContainerId(containerId, nextContainerId))
      dispatch(updateStructureContainerId(containerId, nextContainerId))
    })
  }
}

const createStructureContainerReducer = () => ({
  type: 'CREATE_STRUCTURE_CONTAINER'
})

const updateStructureContainerId = (containerId, nextContainerId) => ({
  type: 'UPDATE_STRUCTURE_CONTAINER_ID',
  containerId: containerId,
  nextContainerId: nextContainerId
})

//-----------------------------------------------------------------------------
// Create Structure View
//-----------------------------------------------------------------------------
export const createStructureView = collectionId => {
  return (dispatch, getState) => {
    dispatch(createStructureViewReducer(collectionId))
    const newView = getState().getIn(['structure', 'views']).find(view => Number(view.get('id')) < 0).delete('modules').delete('isViewRenaming')
    const newViewId = newView.get('id')
    mutation.createView(collectionId, newViewId, newView.toJS()).then(viewIds => {
      const {
        viewId,
        nextViewId
      } = viewIds
      dispatch(updateStructureViewId(collectionId, viewId, nextViewId))
    })
  }
}

const createStructureViewReducer = collectionId => ({
  type: 'CREATE_STRUCTURE_VIEW',
  collectionId: collectionId
})

const updateStructureViewId = (collectionId, viewId, nextViewId) => ({
  type: 'UPDATE_STRUCTURE_VIEW_ID',
  collectionId: collectionId,
  viewId: viewId,
  nextViewId: nextViewId
})

//-----------------------------------------------------------------------------
// Delete Structure Collection
//-----------------------------------------------------------------------------
export const deleteStructureCollection = (containerId, collectionId) => {
  return dispatch => {
    dispatch(deleteStructureCollectionReducer(containerId, collectionId))
    mutation.deleteCollection(collectionId)
  }
}

const deleteStructureCollectionReducer = (containerId, collectionId) => ({
  type: 'DELETE_STRUCTURE_COLLECTION',
  collectionId: collectionId,
  containerId: containerId
})


//-----------------------------------------------------------------------------
// Delete Structure Container
//-----------------------------------------------------------------------------
export const deleteStructureContainer = containerId => {
  return dispatch => {
    dispatch(deleteStructureContainerReducer(containerId))
    dispatch(deleteContainer(containerId))
    mutation.deleteContainer(containerId)
  }
}

const deleteStructureContainerReducer = containerId => ({
  type: 'DELETE_STRUCTURE_CONTAINER',
  containerId: containerId
})

//-----------------------------------------------------------------------------
// Delete Structure View
//-----------------------------------------------------------------------------
export const deleteStructureView = ( collectionId, viewId) => {
  return dispatch => {
    dispatch(deleteStructureViewReducer(collectionId, viewId))
    mutation.deleteView(viewId)
  }
}

const deleteStructureViewReducer = (collectionId, viewId) => ({
  type: 'DELETE_STRUCTURE_VIEW',
  collectionId: collectionId,
  viewId: viewId
})

//-----------------------------------------------------------------------------
// Set Structure
//-----------------------------------------------------------------------------
export const setStructure = () => {
  return (dispatch, getState) => {
    const userId = selectUserId(getState())
    query.getStructure(userId).then(structure => {
      dispatch(setStructureReducer(structure))
    })
  }
}

const setStructureReducer = structure => ({
  type: 'SET_STRUCTURE',
  structure: structure
})

//-----------------------------------------------------------------------------
// Update Structure Collection
//-----------------------------------------------------------------------------
export const updateStructureCollection = (collectionId, updates) => {
  return dispatch => {
    dispatch(updateStructureCollectionReducer(collectionId, updates))
    mutation.updateCollection(collectionId, updates)
  }
}

//-----------------------------------------------------------------------------
// Update Structure Collection Reducer
//-----------------------------------------------------------------------------
const updateStructureCollectionReducer = (collectionId, updates) => ({
  type: 'UPDATE_STRUCTURE_COLLECTION',
  collectionId: collectionId,
  updates: updates
})

//-----------------------------------------------------------------------------
// Update Structure Container
//-----------------------------------------------------------------------------
export const updateStructureContainer = (containerId, updates) => {
  return dispatch => {
    dispatch(updateStructureContainerReducer(containerId, updates))
    dispatch(updateContainerReducer(containerId, updates))
    mutation.updateContainer(containerId, updates)
  }
}

//-----------------------------------------------------------------------------
// Update Structure Container Reducer
//-----------------------------------------------------------------------------
const updateStructureContainerReducer = (containerId, updates) => ({
  type: 'UPDATE_STRUCTURE_CONTAINER',
  containerId: containerId,
  updates: updates
})

//-----------------------------------------------------------------------------
// Update Structure View
//-----------------------------------------------------------------------------
export const updateStructureView = (viewId, updates) => {
  return dispatch => {
    dispatch(updateStructureViewReducer(viewId, updates))
    mutation.updateView(viewId, updates)
  }
}

//-----------------------------------------------------------------------------
// Update Structure View Reducer
//-----------------------------------------------------------------------------
const updateStructureViewReducer = (viewId, updates) => ({
  type: 'UPDATE_STRUCTURE_VIEW',
  viewId: viewId,
  updates: updates
})


