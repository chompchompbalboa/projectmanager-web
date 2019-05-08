//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { fromJS } from 'immutable'
import _ from 'lodash'

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
          name: 'Name',
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
        name: 'Name',
        icon: 'PROJECTS',
        collections: [],
        isContainerRenaming: true
      }
      return {
        ...state,
        containers: {...state.containers, [tempId]: newContainer}
      }
    }

    case 'CREATE_STRUCTURE_VIEW': {
      const {
        collectionId
      } = action
      const tempId = _.random(-100000, -900000)
      const newView = fromJS({
          id: tempId,
          name: 'Name',
          modules: [],
          isViewRenaming: true
      })
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
      const newState = { ...state }
      delete newState.collections[collectionId]
      return {
        ...newState, containers: {
          ...newState.containers, [containerId]: {
            ...newState.containers[containerId], collections: 
              newState.containers[containerId].collections.filter(id => id !== collectionId)
          }
        }
      }
    }

    case 'DELETE_STRUCTURE_CONTAINER':  {
      const {
        containerId
      } = action
      const newState = { ...state }
      delete newState.containers[containerId]
      return newState
    }

    case 'DELETE_STRUCTURE_VIEW':  {
      const {
        collectionId,
        viewId
      } = action
      const newState = { ...state }
      delete newState.views[viewId]
      return {
        ...newState, collections: {
          ...newState.collections, [collectionId]: {
            ...newState.collections[collectionId], views: 
              newState.collections[collectionId].views.filter(id => id !== viewId)
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
      const collection = state.getIn(['collections', collectionId])
      return state.setIn([
        'collections',
        collectionId
      ], collection.merge(fromJS(updates)))
    }

    case 'UPDATE_STRUCTURE_COLLECTION_ID':  {
      const {
        containerId,
        collectionId,
        nextCollectionId
      } = action
      const collection = state.getIn(['collections', collectionId]).set('id', nextCollectionId)
      const collectionIndex = state.getIn(['containers', containerId, 'collections']).findIndex(collection => collection === collectionId)
      return state.setIn(['collections', nextCollectionId], collection)
                  .deleteIn(['collections', collectionId])
                  .setIn(['containers', containerId, 'collections', collectionIndex], nextCollectionId)
    }

    case 'UPDATE_STRUCTURE_CONTAINER':  {
      const {
        containerId,
        updates
      } = action
      const container = state.getIn(['containers', containerId])
      return state.setIn([
        'containers',
        containerId
      ], container.merge(fromJS(updates)))
    }

    case 'UPDATE_STRUCTURE_CONTAINER_ID':  {
      const {
        containerId,
        nextContainerId
      } = action
      const container = state.getIn(['containers', containerId]).set('id', nextContainerId)
      return state.setIn(['containers', nextContainerId], container).deleteIn(['containers', containerId])
    }

    case 'UPDATE_STRUCTURE_VIEW':  {
      const {
        viewId,
        updates
      } = action
      const view = state.getIn(['views', viewId])
      return state.setIn([
        'views',
        viewId
      ], view.merge(fromJS(updates)))
    }

    case 'UPDATE_STRUCTURE_VIEW_ID':  {
      const {
        collectionId,
        viewId,
        nextViewId
      } = action
      const view = state.getIn(['views', viewId]).set('id', nextViewId)
      const viewIndex = state.getIn(['collections', collectionId, 'views']).findIndex(view => view === viewId)
      return state.setIn(['views', nextViewId], view)
                  .deleteIn(['views', viewId])
                  .setIn(['collections', collectionId, 'views', viewIndex], nextViewId)
    }


    default:
      return state
  }
}

export default structureReducers