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
// Select Active Settings Structure Container Id
//-----------------------------------------------------------------------------
export const selectActiveSettingsStructureContainerId = state => {
  if(state.active.settingsStructureContainerId === null) {
    return state.container.containerIds[0]
  }
  return state.active.settingsStructureContainerId
}

//-----------------------------------------------------------------------------
// Select Active Settings Content
//-----------------------------------------------------------------------------
export const selectActiveSettingsContent = state => state.active.settingsContent

//-----------------------------------------------------------------------------
// Select Active View Id
//-----------------------------------------------------------------------------
export const selectActiveViewId = state => state.active.viewId