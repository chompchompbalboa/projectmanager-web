
export const selectActiveContainer = state => state.getIn(['container', 'containers', state.getIn(['active', 'containerId']) + ""])

export const selectContainerIds = state => state.getIn(['container', 'containerIds'])

export const selectContainers = state => state.getIn(['container', 'containers'])