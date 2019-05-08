//-----------------------------------------------------------------------------
// Select Active Container
//-----------------------------------------------------------------------------
export const selectActiveContainer = state => state.container.containers !== null ? state.container.containers[state.active.containerId] : null

//-----------------------------------------------------------------------------
// Select Container Ids
//-----------------------------------------------------------------------------
export const selectContainerIds = state => state.container.containerIds

//-----------------------------------------------------------------------------
// Select Containers
//-----------------------------------------------------------------------------
export const selectContainers = state => state.container.containers