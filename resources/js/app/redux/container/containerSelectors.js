//-----------------------------------------------------------------------------
// Select Active Container
//-----------------------------------------------------------------------------
export const selectActiveContainer = state => state.getIn(['container', 'containers', state.getIn(['active', 'containerId']) + ""])

//-----------------------------------------------------------------------------
// Select Container Ids
//-----------------------------------------------------------------------------
export const selectContainerIds = state => state.getIn(['container', 'containerIds'])

//-----------------------------------------------------------------------------
// Select Containers
//-----------------------------------------------------------------------------
export const selectContainers = state => state.getIn(['container', 'containers'])