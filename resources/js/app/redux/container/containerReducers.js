//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import _ from 'lodash'

import containerNormalizer from './containerNormalizer'

//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const normalizedContainers = containerNormalizer(_.sortBy(initialData.containers, ['name']))
const initialState = {
  containers: normalizedContainers.entities.containers,
  containerIds: normalizedContainers.result
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const containerReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'CREATE_CONTAINER': {
      const {
        newContainerId,
        newContainer
      } = action
      return {
        ...state,
        containerIds: [ ...state.containerIds, newContainerId ],
        containers: { ...state.containers, [newContainerId]: newContainer }
      }
    }

    case 'DELETE_CONTAINER':  {
      const {
        containerId
      } = action
      const nextState = { ...state }
      delete nextState.containers[containerId]
      return {
        ...state,
        containerIds: state.containerIds.filter(id => id !== containerId),
        containers: nextState.containers
      }
    }

    case 'UPDATE_CONTAINER':  {
      const {
        containerId,
        updates
      } = action
      return {
        ...state, containers: {
          ...state.containers, [containerId]: {
            ...state.containers[containerId], ...updates
          }
        }
      }
    }

    case 'UPDATE_CONTAINER_ID':  {
      const {
        containerId,
        nextContainerId
      } = action
      const nextState = { ...state }
      
      const container = nextState.containers[containerId]
      container.id = nextContainerId
      delete container.isContainerRenaming
      
      nextState.containers[nextContainerId] = container
      delete nextState.containers[containerId]
      
      const containerIndex = nextState.containerIds.findIndex(id => id === containerId)
      nextState.containerIds[containerIndex]= nextContainerId
      return {
        ...state,
        containers: nextState.containers,
        containerIds: nextState.containerIds
      }
    }

    default:
      return state
  }
}

export default containerReducers