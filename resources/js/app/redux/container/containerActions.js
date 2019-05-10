//-----------------------------------------------------------------------------
// Update Container Reducer
//-----------------------------------------------------------------------------
export const createContainer = (newContainerId, newContainer) => ({
  type: 'CREATE_CONTAINER',
  newContainerId: newContainerId,
  newContainer: newContainer
})

//-----------------------------------------------------------------------------
// Delete Container
//-----------------------------------------------------------------------------
export const deleteContainer = containerId => ({
  type: 'DELETE_CONTAINER',
  containerId: containerId
})

//-----------------------------------------------------------------------------
// Update Container Reducer
//-----------------------------------------------------------------------------
export const updateContainerReducer = (containerId, updates) => ({
  type: 'UPDATE_CONTAINER',
  containerId: containerId,
  updates: updates
})

//-----------------------------------------------------------------------------
// Update Container Id
//-----------------------------------------------------------------------------
export const updateContainerId = (containerId, nextContainerId) => ({
  type: 'UPDATE_CONTAINER_ID',
  containerId: containerId,
  nextContainerId: nextContainerId
})