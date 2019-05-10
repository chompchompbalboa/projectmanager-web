//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation, query } from '../../../_api'
import clone from '../../../_utils/clone'

import { 
  selectActiveSettingsStructureCollectionId, 
  selectActiveSettingsStructureContainerId,
  selectActiveSettingsStructureViewId 
} from '../active/activeSelectors'
import { createContainer, deleteContainer, updateContainerId, updateContainerReducer } from '../container/containerActions'
import { selectUserId } from '../user/userSelectors'

//-----------------------------------------------------------------------------
// Create Structure Collection
//-----------------------------------------------------------------------------
export const createStructureCollection = () => {
  return (dispatch, getState) => {
    const containerId = selectActiveSettingsStructureContainerId(getState())
    dispatch(createStructureCollectionReducer(containerId))
    const tempId = Object.keys(getState().structure.collections).find(id => id < 0)
    const newCollection = clone(getState().structure.collections[tempId])
    //eslint-disable-next-line
    const { isCollectionRenaming, views, ...newCollectionForServer } = newCollection // Remove properties that aren't stored in the db
    mutation.createCollection(containerId, newCollection.id, newCollectionForServer).then(collectionIds => {
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
    const userId = selectUserId(getState())
    const tempId = Object.keys(getState().structure.containers).find(id => id < 0)
    const newContainer = clone(getState().structure.containers[tempId])
    //eslint-disable-next-line
    const { isContainerRenaming, collections, ...newContainerForServer } = newContainer // Remove properties that aren't stored in the db
    dispatch(createContainer(newContainer.id, newContainer))
    mutation.createContainer(userId, newContainer.id, newContainerForServer).then(containerIds => {
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
// Create Structure Module
//-----------------------------------------------------------------------------
export const createStructureModule = () => {
  return (dispatch, getState) => {
    const viewId = selectActiveSettingsStructureViewId(getState())
    dispatch(createStructureModuleReducer(viewId))
    const tempId = Object.keys(getState().structure.modules).find(id => id < 0)
    const newModule = clone(getState().structure.modules[tempId])
    //eslint-disable-next-line
    const { isModuleRenaming, modules, ...newModuleForServer } = newModule // Remove properties that aren't stored in the db
    mutation.createModule(viewId, newModule.id, newModuleForServer).then(moduleIds => {
      const {
        moduleId,
        nextModuleId
      } = moduleIds
      dispatch(updateStructureModuleId(viewId, moduleId, nextModuleId))
    })
  }
}

const createStructureModuleReducer = viewId => ({
  type: 'CREATE_STRUCTURE_MODULE',
  viewId: viewId
})

const updateStructureModuleId = (viewId, moduleId, nextModuleId) => ({
  type: 'UPDATE_STRUCTURE_MODULE_ID',
  viewId: viewId,
  moduleId: moduleId,
  nextModuleId: nextModuleId
})

//-----------------------------------------------------------------------------
// Create Structure View
//-----------------------------------------------------------------------------
export const createStructureView = () => {
  return (dispatch, getState) => {
    const collectionId = selectActiveSettingsStructureCollectionId(getState())
    dispatch(createStructureViewReducer(collectionId))
    const tempId = Object.keys(getState().structure.views).find(id => id < 0)
    const newView = clone(getState().structure.views[tempId])
    //eslint-disable-next-line
    const { isViewRenaming, modules, ...newViewForServer } = newView // Remove properties that aren't stored in the db
    mutation.createView(collectionId, newView.id, newViewForServer).then(viewIds => {
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
export const deleteStructureCollection = (collectionId) => {
  return (dispatch, getState) => {
    const containerId = selectActiveSettingsStructureContainerId(getState())
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
export const deleteStructureView = (viewId) => {
  return (dispatch, getState) => {
    const collectionId = selectActiveSettingsStructureCollectionId(getState())
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


