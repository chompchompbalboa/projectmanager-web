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

    case 'UPDATE_STRUCTURE_CONTAINER':  {
      const {
        containerId,
        nextContainer
      } = action
      const container = state.getIn(['containers', containerId + ""])
      return state.setIn([
        'containers',
        containerId + ""
      ], container.merge(fromJS(nextContainer)))
    }

    case 'UPDATE_STRUCTURE_CONTAINER_ID':  {
      const {
        containerId,
        nextContainerId
      } = action
      const container = state.getIn(['containers', containerId + ""]).set('id', nextContainerId)
      return state.setIn(['containers', nextContainerId + ""], container).deleteIn(['containers', containerId + ""])
    }

    case 'UPDATE_STRUCTURE_COLLECTION_ID':  {
      const {
        containerId,
        nextContainerId
      } = action
      const container = state.getIn(['containers', containerId + ""]).set('id', nextContainerId)
      return state.setIn(['containers', nextContainerId + ""], container).deleteIn(['containers', containerId + ""])
    }


    default:
      return state
  }
}

export default structureReducers