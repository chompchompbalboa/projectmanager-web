//-----------------------------------------------------------------------------
// Select Structure Collections
//-----------------------------------------------------------------------------
export const selectStructureCollections = state => state.getIn(['structure', 'collections'])

//-----------------------------------------------------------------------------
// Select Structure Containers
//-----------------------------------------------------------------------------
export const selectStructureContainers = state => state.getIn(['structure', 'containers'])

//-----------------------------------------------------------------------------
// Select Structure Modules
//-----------------------------------------------------------------------------
export const selectStructureModules = state => state.getIn(['structure', 'modules'])

//-----------------------------------------------------------------------------
// Select Structure Views
//-----------------------------------------------------------------------------
export const selectStructureViews = state => {
  return state.getIn(['structure', 'views'])
}