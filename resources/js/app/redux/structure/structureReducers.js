//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import _ from 'lodash'
import clone from '../../../_utils/clone'

import structureNormalizer from './structureNormalizer'

//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
const initialState = {
  containers: null,
  collections: null,
  views: null,
  modules: null
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const structureReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'CREATE_STRUCTURE_COLLECTION': {
      const {
        containerId
      } = action
      const tempId = _.random(-100000, -900000)
      const newCollection = {
          id: tempId,
          name: 'New Collection',
          views: [],
          isCollectionRenaming: true
      }
      return {
        ...state,
        collections: {...state.collections, [tempId]: newCollection},
        containers: {
          ...state.containers, [containerId]: {
            ...state.containers[containerId], collections: [
              ...state.containers[containerId].collections, tempId
            ]
          }
        }
      }
    }

    case 'CREATE_STRUCTURE_CONTAINER': {
      const tempId = _.random(-100000, -900000)
      const newContainer = {
        id: tempId,
        name: 'New Container',
        icon: 'PROJECTS',
        collections: [],
        isContainerRenaming: true
      }
      return {
        ...state,
        containers: {...state.containers, [tempId]: newContainer}
      }
    }

    case 'CREATE_STRUCTURE_MODULE': {
      const {
        moduleType,
        viewId
      } = action
      const tempId = _.random(-100000, -900000)
      const newModule = {
          id: tempId,
          type: moduleType,
          typeId: null,
          name: moduleType,
          isModuleRenaming: true
      }
      return {
        ...state,
        modules: {...state.modules, [tempId]: newModule},
        views: {
          ...state.views, [viewId]: {
            ...state.views[viewId], modules: [
              ...state.views[viewId].modules, tempId
            ]
          }
        }
      }
    }

    case 'CREATE_STRUCTURE_VIEW': {
      const {
        collectionId
      } = action
      const tempId = _.random(-100000, -900000)
      const newView = {
          id: tempId,
          name: 'New View',
          modules: [],
          isViewRenaming: true
      }
      return {
        ...state,
        views: {...state.views, [tempId]: newView},
        collections: {
          ...state.collections, [collectionId]: {
            ...state.collections[collectionId], views: [
              ...state.collections[collectionId].views, tempId
            ]
          }
        }
      }
    }

    case 'DELETE_STRUCTURE_COLLECTION':  {
      const {
        containerId,
        collectionId
      } = action
      const nextState = { ...state }
      delete nextState.collections[collectionId]
      return {
        ...nextState, containers: {
          ...nextState.containers, [containerId]: {
            ...nextState.containers[containerId], collections: 
              nextState.containers[containerId].collections.filter(id => id !== collectionId)
          }
        }
      }
    }

    case 'DELETE_STRUCTURE_CONTAINER':  {
      const {
        containerId
      } = action
      const nextState = { ...state }
      delete nextState.containers[containerId]
      return nextState
    }

    case 'DELETE_STRUCTURE_MODULE':  {
      const {
        viewId,
        moduleId
      } = action
      const nextState = { ...state }
      delete nextState.modules[moduleId]
      return {
        ...nextState, views: {
          ...nextState.views, [viewId]: {
            ...nextState.views[viewId], modules: 
              nextState.views[viewId].modules.filter(id => id !== moduleId)
          }
        }
      }
    }

    case 'DELETE_STRUCTURE_VIEW':  {
      const {
        collectionId,
        viewId
      } = action
      const nextState = { ...state }
      delete nextState.views[viewId]
      return {
        ...nextState, collections: {
          ...nextState.collections, [collectionId]: {
            ...nextState.collections[collectionId], views: 
              nextState.collections[collectionId].views.filter(id => id !== viewId)
          }
        }
      }
    }

    case 'SET_STRUCTURE': {
      const {
        structure
      } = action
      const normalizedStructure = structureNormalizer(_.sortBy(structure, ['name']))
      return {
        containers: normalizedStructure.entities.containers,
        collections: normalizedStructure.entities.collections,
        views: normalizedStructure.entities.views,
        modules: normalizedStructure.entities.modules
      }
    }

    case 'UPDATE_STRUCTURE_COLLECTION':  {
      const {
        collectionId,
        updates
      } = action
      return {
        ...state, collections: {
          ...state.collections, [collectionId]: {
            ...state.collections[collectionId], ...updates, isCollectionRenaming: false
          }
        }
      }
    }

    case 'UPDATE_STRUCTURE_COLLECTION_ID':  {
      const {
        containerId,
        collectionId,
        nextCollectionId
      } = action
      const nextState = clone(state)
      
      const collection = nextState.collections[collectionId]
      collection.id = nextCollectionId
      
      nextState.collections[nextCollectionId] = collection
      delete nextState.collections[collectionId]
      
      const collectionIndex = nextState.containers[containerId].collections.findIndex(id => id === collectionId)
      nextState.containers[containerId].collections[collectionIndex] = nextCollectionId
      return {
        ...state,
        collections: nextState.collections,
        containers: nextState.containers
      }
    }

    case 'UPDATE_STRUCTURE_CONTAINER':  {
      const {
        containerId,
        updates
      } = action
      return {
        ...state, containers: {
          ...state.containers, [containerId]: {
            ...state.containers[containerId], ...updates, isContainerRenaming: false
          }
        }
      }
    }

    case 'UPDATE_STRUCTURE_CONTAINER_ID':  {
      const {
        containerId,
        nextContainerId
      } = action
      const nextState = clone(state)
      
      const container = nextState.containers[containerId]
      container.id = nextContainerId
      
      nextState.containers[nextContainerId] = container
      delete nextState.containers[containerId]
      
      return {
        ...state,
        containers: nextState.containers
      }
    }

    case 'UPDATE_STRUCTURE_MODULE':  {
      const {
        moduleId,
        updates
      } = action
      return {
        ...state, modules: {
          ...state.modules, [moduleId]: {
            ...state.modules[moduleId], ...updates, isModuleRenaming: false
          }
        }
      }
    }

    case 'UPDATE_STRUCTURE_MODULE_ID':  {
      const {
        viewId,
        moduleId,
        nextModuleId
      } = action
      const nextState = clone(state)

      const module = nextState.modules[moduleId]
      module.id = nextModuleId
      
      nextState.modules[nextModuleId] = module
      delete nextState.modules[moduleId]
      
      const moduleIndex = nextState.views[viewId].modules.findIndex(id => id === moduleId)
      nextState.views[viewId].modules[moduleIndex] = nextModuleId

      return {
        ...state,
        views: nextState.views,
        modules: nextState.modules
      }
    }

    case 'UPDATE_STRUCTURE_VIEW':  {
      const {
        viewId,
        updates
      } = action
      return {
        ...state, views: {
          ...state.views, [viewId]: {
            ...state.views[viewId], ...updates, isViewRenaming: false
          }
        }
      }
    }

    case 'UPDATE_STRUCTURE_VIEW_ID':  {
      const {
        collectionId,
        viewId,
        nextViewId
      } = action
      const nextState = clone(state)

      const view = nextState.views[viewId]
      view.id = nextViewId
      
      nextState.views[nextViewId] = view
      delete nextState.views[viewId]
      
      const viewIndex = nextState.collections[collectionId].views.findIndex(id => id === viewId)
      nextState.collections[collectionId].views[viewIndex] = nextViewId

      return {
        ...state,
        collections: nextState.collections,
        views: nextState.views
      }
    }


    default:
      return state
  }
}

export default structureReducers