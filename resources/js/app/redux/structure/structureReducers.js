//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { fromJS } from 'immutable'
import _ from 'lodash'

import structureNormalizer from './structureNormalizer'

//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const initialState = fromJS({
  containers: null,
  collections: null,
  views: null,
  modules: null
})

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const structureReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'CREATE_STRUCTURE_COLLECTION': {
      const {
        containerId
      } = action
      const tempId = _.random(-100000, -900000) + ""
      const newCollection = fromJS({
          id: tempId,
          name: 'Name',
          views: [],
          isCollectionRenaming: true
      })
      return state.setIn(['collections', tempId], newCollection)
                  .setIn(['containers', containerId + "", 'collections', state.getIn(['containers', containerId + "", 'collections']).size], tempId)
    }

    case 'CREATE_STRUCTURE_CONTAINER': {
      const tempId = _.random(-100000, -900000) + ""
      return state.setIn([
        'containers',
        tempId
      ], fromJS({
          id: tempId,
          name: 'Name',
          icon: 'PROJECTS',
          collections: [],
          isContainerRenaming: true
        })
      )
    }

    case 'CREATE_STRUCTURE_VIEW': {
      const {
        collectionId
      } = action
      const tempId = _.random(-100000, -900000) + ""
      const newView = fromJS({
          id: tempId,
          name: 'Name',
          modules: [],
          isViewRenaming: true
      })
      return state.setIn(['views', tempId], newView)
                  .setIn(['collections', collectionId + "", 'views', state.getIn(['collections', collectionId + "", 'views']).size], tempId)
    }

    case 'DELETE_STRUCTURE_COLLECTION':  {
      const {
        containerId,
        collectionId
      } = action
      return state.deleteIn(['collections', collectionId + ""])
                  .deleteIn(['containers', containerId + "", 'collections', state.getIn(['containers', containerId + "", 'collections']).findIndex(collection => collection === collectionId)])
    }

    case 'DELETE_STRUCTURE_CONTAINER':  {
      const {
        containerId
      } = action
      return state.deleteIn(['containers', containerId + ""])
    }

    case 'DELETE_STRUCTURE_VIEW':  {
      const {
        collectionId,
        viewId
      } = action
      return state.deleteIn(['views', viewId + ""])
                  .deleteIn(['collections', collectionId + "", 'views', state.getIn(['collections', collectionId + "", 'views']).findIndex(view => view === viewId)])
    }

    case 'SET_STRUCTURE': {
      const {
        structure
      } = action
      const normalizedStructure = structureNormalizer(_.sortBy(structure, ['name']))
      return fromJS({
        containers: normalizedStructure.entities.containers,
        collections: normalizedStructure.entities.collections,
        views: normalizedStructure.entities.views,
        modules: normalizedStructure.entities.modules
      })
    }

    case 'UPDATE_STRUCTURE_COLLECTION':  {
      const {
        collectionId,
        updates
      } = action
      const collection = state.getIn(['collections', collectionId + ""])
      return state.setIn([
        'collections',
        collectionId + ""
      ], collection.merge(fromJS(updates)))
    }

    case 'UPDATE_STRUCTURE_COLLECTION_ID':  {
      const {
        containerId,
        collectionId,
        nextCollectionId
      } = action
      const collection = state.getIn(['collections', collectionId + ""]).set('id', nextCollectionId)
      const collectionIndex = state.getIn(['containers', containerId + "", 'collections']).findIndex(collection => collection === collectionId)
      return state.setIn(['collections', nextCollectionId + ""], collection)
                  .deleteIn(['collections', collectionId + ""])
                  .setIn(['containers', containerId + "", 'collections', collectionIndex], nextCollectionId)
    }

    case 'UPDATE_STRUCTURE_CONTAINER':  {
      const {
        containerId,
        updates
      } = action
      const container = state.getIn(['containers', containerId + ""])
      return state.setIn([
        'containers',
        containerId + ""
      ], container.merge(fromJS(updates)))
    }

    case 'UPDATE_STRUCTURE_CONTAINER_ID':  {
      const {
        containerId,
        nextContainerId
      } = action
      const container = state.getIn(['containers', containerId + ""]).set('id', nextContainerId)
      return state.setIn(['containers', nextContainerId + ""], container).deleteIn(['containers', containerId + ""])
    }

    case 'UPDATE_STRUCTURE_VIEW':  {
      const {
        viewId,
        updates
      } = action
      const view = state.getIn(['views', viewId + ""])
      return state.setIn([
        'views',
        viewId + ""
      ], view.merge(fromJS(updates)))
    }

    case 'UPDATE_STRUCTURE_VIEW_ID':  {
      const {
        collectionId,
        viewId,
        nextViewId
      } = action
      const view = state.getIn(['views', viewId + ""]).set('id', nextViewId)
      const viewIndex = state.getIn(['collections', collectionId + "", 'views']).findIndex(view => view === viewId)
      return state.setIn(['views', nextViewId + ""], view)
                  .deleteIn(['views', viewId + ""])
                  .setIn(['collections', collectionId + "", 'views', viewIndex], nextViewId)
    }


    default:
      return state
  }
}

export default structureReducers