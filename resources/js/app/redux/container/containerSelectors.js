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

//-----------------------------------------------------------------------------
// Select Settings Container Id
//-----------------------------------------------------------------------------
export const selectSettingsContainerId = state => {
  const containers = selectContainers(state)
  const settingsContainer = containers.find(container => container.get('sidebarLocation') === 'BOTTOM')
  return settingsContainer.get('id')
}