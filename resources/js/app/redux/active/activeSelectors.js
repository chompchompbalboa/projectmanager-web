//-----------------------------------------------------------------------------
// Select Active Container Id
//-----------------------------------------------------------------------------
export const selectActiveContainerId = state => state.active.containerId

//-----------------------------------------------------------------------------
// Select Active Content
//-----------------------------------------------------------------------------
export const selectActiveContent = state => state.active.content

//-----------------------------------------------------------------------------
// Select Active Collection Id
//-----------------------------------------------------------------------------
export const selectActiveCollectionId = state => state.active.collectionId

//-----------------------------------------------------------------------------
// Select Active Settings Structure Collection Id
//-----------------------------------------------------------------------------
export const selectActiveSettingsStructureCollectionId = state => {
  if(state.structure.collections && state.structure.collections[state.active.settingsStructureCollectionId]) {
    return state.active.settingsStructureCollectionId
  }
  return null
}

//-----------------------------------------------------------------------------
// Select Active Settings Structure Container Id
//-----------------------------------------------------------------------------
export const selectActiveSettingsStructureContainerId = state => {
  if(state.structure.containers && state.structure.containers[state.active.settingsStructureContainerId]) {
    return state.active.settingsStructureContainerId
  }
  return null
}

//-----------------------------------------------------------------------------
// Select Active Settings Structure Module Id
//-----------------------------------------------------------------------------
export const selectActiveSettingsStructureModuleId = state => {
  if(state.structure.modules && state.structure.modules[state.active.settingsStructureModuleId]) {
    return state.active.settingsStructureModuleId
  }
  return null
}

//-----------------------------------------------------------------------------
// Select Active Settings Structure View Id
//-----------------------------------------------------------------------------
export const selectActiveSettingsStructureViewId = state => {
  if(state.structure.views && state.structure.views[state.active.settingsStructureViewId]) {
    return state.active.settingsStructureViewId
  }
  return null
}

//-----------------------------------------------------------------------------
// Select Active Settings Content
//-----------------------------------------------------------------------------
export const selectActiveSettingsContent = state => state.active.settingsContent

//-----------------------------------------------------------------------------
// Select Active View Id
//-----------------------------------------------------------------------------
export const selectActiveViewId = state => state.active.viewId