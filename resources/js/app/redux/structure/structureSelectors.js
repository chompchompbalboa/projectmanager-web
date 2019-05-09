//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { 
  selectActiveSettingsStructureCollectionId, 
  selectActiveSettingsStructureContainerId,
  selectActiveSettingsStructureViewId 
} from '../active/activeSelectors'

//-----------------------------------------------------------------------------
// Select Structure Collection Ids
//-----------------------------------------------------------------------------
export const selectStructureCollectionIds = state => {
  const activeSettingsStructureContainerId = selectActiveSettingsStructureContainerId(state)
  if (activeSettingsStructureContainerId === null) {
    return []
  }
  return state.structure.containers[activeSettingsStructureContainerId].collections
}

//-----------------------------------------------------------------------------
// Select Structure Module Ids
//-----------------------------------------------------------------------------
export const selectStructureModuleIds = state => {
  const activeSettingsStructureViewId = selectActiveSettingsStructureViewId(state)
  if (activeSettingsStructureViewId === null) {
    return []
  }
  return state.structure.views[activeSettingsStructureViewId].modules
}

//-----------------------------------------------------------------------------
// Select Structure View Ids
//-----------------------------------------------------------------------------
export const selectStructureViewIds = state => {
  const activeSettingsStructureCollectionId = selectActiveSettingsStructureCollectionId(state)
  if (activeSettingsStructureCollectionId === null) {
    return []
  }
  return state.structure.collections[activeSettingsStructureCollectionId].views
}

//-----------------------------------------------------------------------------
// Select Structure Collections
//-----------------------------------------------------------------------------
export const selectStructureCollections = state => state.structure.collections

//-----------------------------------------------------------------------------
// Select Structure Containers
//-----------------------------------------------------------------------------
export const selectStructureContainers = state => state.structure.containers

//-----------------------------------------------------------------------------
// Select Structure Modules
//-----------------------------------------------------------------------------
export const selectStructureModules = state => state.structure.modules

//-----------------------------------------------------------------------------
// Select Structure Views
//-----------------------------------------------------------------------------
export const selectStructureViews = state => state.structure.views