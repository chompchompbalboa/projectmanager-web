//-----------------------------------------------------------------------------
// Select Active Container
//-----------------------------------------------------------------------------
export const selectActiveContainer = state => state.container.containers && state.container.containers !== null ? state.container.containers[state.active.containerId] : null

//-----------------------------------------------------------------------------
// Select Container Ids
//-----------------------------------------------------------------------------
export const selectContainerIds = state => state.container.containerIds ? state.container.containerIds : null

//-----------------------------------------------------------------------------
// Select Containers
//-----------------------------------------------------------------------------
export const selectContainers = state => state.container.containers ? state.container.containers : null