//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation, query } from '../../../_api'

import { createContainer, deleteContainer, updateContainerId, updateContainerReducer } from '../container/containerActions'
import { selectUserId } from '../user/userSelectors'

//-----------------------------------------------------------------------------
// Create Container
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
// Delete Container
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
// Update Container Reducer
//-----------------------------------------------------------------------------
const updateStructureContainerReducer = (containerId, nextContainer) => ({
  type: 'UPDATE_STRUCTURE_CONTAINER',
  containerId: containerId,
  nextContainer: nextContainer
})

//-----------------------------------------------------------------------------
// Update Container Name
//-----------------------------------------------------------------------------
export const updateStructureContainer = (containerId, updates) => {
  return dispatch => {
    dispatch(updateStructureContainerReducer(containerId, updates))
    dispatch(updateContainerReducer(containerId, updates))
    mutation.updateContainer(containerId, updates).then(nextContainer => {})
  }
}


