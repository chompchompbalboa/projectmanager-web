//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { query } from '../../../_api'

import { updateCollectionIds, updateCollections } from '../collection/collectionActions'
import { updateModuleIds, updateModules } from '../module/moduleActions'
import { updateViewIds, updateViews } from '../view/viewActions'

import collectionNormalizer from '../collection/collectionNormalizer'
import moduleNormalizer from '../module/moduleNormalizer'
import viewNormalizer from '../view/viewNormalizer'

import { 
  selectActiveCollectionId,
  selectActiveContainerId, 
  selectActiveViewId
} from '../active/activeSelectors'

//-----------------------------------------------------------------------------
// Update Active Container Id
//-----------------------------------------------------------------------------
export const updateActiveContainerId = nextActiveContainerId => {
  return (dispatch, getState) => {
    dispatch(updateActiveContent('CONTAINER'))
    const activeContainerId = selectActiveContainerId(getState())
    if(nextActiveContainerId !== activeContainerId) {
      dispatch(updateActiveContainerIdReducer(nextActiveContainerId))
      dispatch(updateActiveCollectionIdReducer(null))
      dispatch(updateActiveViewIdReducer(null))
      dispatch(updateCollections(null))
      dispatch(updateCollectionIds(null))
      dispatch(updateViews(null))
      dispatch(updateViewIds(null))
      dispatch(updateModules(null))
      dispatch(updateModuleIds(null))
      dispatch(updateActiveContainerIdServer(nextActiveContainerId))
    }
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
        nextModules,
        nextViews
      } = nextActiveContainer
      const normalizedCollections = collectionNormalizer(nextCollections)
      const normalizedViews = viewNormalizer(nextViews)
      const normalizedModules = moduleNormalizer(nextModules)
      dispatch(updateCollections(normalizedCollections.entities.collections))
      dispatch(updateCollectionIds(normalizedCollections.result))
      dispatch(updateViews(normalizedViews.entities.views))
      dispatch(updateViewIds(normalizedViews.result))
      dispatch(updateModules(normalizedModules.entities.modules))
      dispatch(updateModuleIds(normalizedModules.result))
      dispatch(updateActiveCollectionIdReducer(nextActiveCollectionId))
      dispatch(updateActiveViewIdReducer(nextActiveViewId))
    })
  }
}

//-----------------------------------------------------------------------------
// Update Active Content
//-----------------------------------------------------------------------------
export const updateActiveContent = nextActiveContent => {
  return dispatch => {
    dispatch(updateActiveContentReducer(nextActiveContent))
  }
}

const updateActiveContentReducer = nextActiveContent => ({
  type: 'UPDATE_ACTIVE_CONTENT',
  nextActiveContent: nextActiveContent
})

//-----------------------------------------------------------------------------
// Update Active Collection Id
//-----------------------------------------------------------------------------
export const updateActiveCollectionId = nextActiveCollectionId => {
  return (dispatch, getState) => {
    const activeCollectionId = selectActiveCollectionId(getState())
    if(nextActiveCollectionId !== activeCollectionId) {
      dispatch(updateActiveCollectionIdReducer(nextActiveCollectionId))
      dispatch(updateActiveViewIdReducer(null))
      dispatch(updateViews(null))
      dispatch(updateViewIds(null))
      dispatch(updateModules(null))
      dispatch(updateModuleIds(null))
      dispatch(updateActiveCollectionIdServer(nextActiveCollectionId))
    }
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
        nextModules,
        nextViews
      } = nextActiveCollection
      const normalizedViews = viewNormalizer(nextViews)
      const normalizedModules = moduleNormalizer(nextModules)
      dispatch(updateViews(normalizedViews.entities.views))
      dispatch(updateViewIds(normalizedViews.result))
      dispatch(updateModules(normalizedModules.entities.modules))
      dispatch(updateModuleIds(normalizedModules.result))
      dispatch(updateActiveCollectionIdReducer(nextActiveCollectionId))
      dispatch(updateActiveViewIdReducer(nextActiveViewId))
    })
  }
}

//-----------------------------------------------------------------------------
// Update Active Settings Content
//-----------------------------------------------------------------------------
export const updateActiveSettingsContent = nextActiveSettingsContent => {
  return dispatch => {
    dispatch(updateActiveContentReducer('SETTINGS'))
    dispatch(updateActiveSettingsContentReducer(nextActiveSettingsContent))
  }
}

const updateActiveSettingsContentReducer = nextActiveSettingsContent => ({
  type: 'UPDATE_ACTIVE_SETTINGS_CONTENT',
  nextActiveSettingsContent: nextActiveSettingsContent
})

//-----------------------------------------------------------------------------
// Update Active Settings Container Id
//-----------------------------------------------------------------------------
export const updateActiveSettingsStructureContainerId = nextActiveSettingsStructureContainerId => {
  return dispatch => {
    dispatch(updateActiveContentReducer('SETTINGS'))
    dispatch(updateActiveSettingsContentReducer('STRUCTURE'))
    dispatch(updateActiveSettingsStructureContainerIdReducer(nextActiveSettingsStructureContainerId))
  }
}

const updateActiveSettingsStructureContainerIdReducer = nextActiveSettingsStructureContainerId => ({
  type: 'UPDATE_ACTIVE_SETTINGS_STRUCTURE_CONTAINER_ID',
  nextActiveSettingsStructureContainerId: nextActiveSettingsStructureContainerId
})

//-----------------------------------------------------------------------------
// Update Active View Id
//-----------------------------------------------------------------------------
export const updateActiveViewId = nextActiveViewId => {
  return (dispatch, getState) => {
    const activeViewId = selectActiveViewId(getState())
    if(nextActiveViewId !== activeViewId) {
      dispatch(updateActiveViewIdReducer(nextActiveViewId))
      dispatch(updateModules(null))
      dispatch(updateModuleIds(null))
      dispatch(updateActiveViewIdServer(nextActiveViewId))
    }
  }
}

const updateActiveViewIdReducer = nextActiveViewId => ({
  type: 'UPDATE_ACTIVE_VIEW_ID',
  nextActiveViewId: nextActiveViewId
})

const updateActiveViewIdServer = nextActiveViewId => {
  return dispatch => {
    query.getView(nextActiveViewId).then(nextActiveView => {
      const {
        nextModules
      } = nextActiveView
      const normalizedModules = moduleNormalizer(nextModules)
      dispatch(updateModules(normalizedModules.entities.modules))
      dispatch(updateModuleIds(normalizedModules.result))
    })
  }
}