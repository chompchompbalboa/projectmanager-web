//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
const initialState = {
  collectionId: initialData.activeCollectionId,
  containerId: initialData.activeContainerId,
  content: 'CONTAINER',
  settingsContent: 'STRUCTURE',
  viewId: initialData.activeViewId,
  settingsStructureCollectionId: null,
  settingsStructureContainerId: null,
  settingsStructureModuleId: null,
  settingsStructureViewId: null,
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const activeReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_ACTIVE_COLLECTION_ID': {
      const {
        nextActiveCollectionId
      } = action
      return {...state, collectionId: nextActiveCollectionId}
    }

    case 'UPDATE_ACTIVE_CONTAINER_ID': {
      const {
        nextActiveContainerId
      } = action
      return {...state, containerId: nextActiveContainerId}
    }

    case 'UPDATE_ACTIVE_CONTENT': {
      const {
        nextActiveContent
      } = action
      return {
        ...state, 
        content: nextActiveContent,
        containerId: null,
        collectionId: null,
        viewId: null
      }
    }

    case 'UPDATE_ACTIVE_SETTINGS_CONTENT': {
      const {
        nextActiveSettingsContent
      } = action
      return {...state, settingsContent: nextActiveSettingsContent}
    }

    case 'UPDATE_ACTIVE_SETTINGS_STRUCTURE_COLLECTION_ID': {
      const {
        nextActiveSettingsStructureCollectionId
      } = action
      return {
        ...state, 
        settingsStructureCollectionId: nextActiveSettingsStructureCollectionId,
        settingsStructureModuleId: null,
        settingsStructureViewId: null
      }
    }

    case 'UPDATE_ACTIVE_SETTINGS_STRUCTURE_CONTAINER_ID': {
      const {
        nextActiveSettingsStructureContainerId
      } = action
      return {
        ...state,
        settingsStructureCollectionId: null,
        settingsStructureContainerId: nextActiveSettingsStructureContainerId,
        settingsStructureModuleId: null,
        settingsStructureViewId: null
      }
    }

    case 'UPDATE_ACTIVE_SETTINGS_STRUCTURE_MODULE_ID': {
      const {
        nextActiveSettingsStructureModuleId
      } = action
      return {
        ...state,
        settingsStructureModuleId: nextActiveSettingsStructureModuleId
      }
    }

    case 'UPDATE_ACTIVE_SETTINGS_STRUCTURE_VIEW_ID': {
      const {
        nextActiveSettingsStructureViewId
      } = action
      return {
        ...state,
        settingsStructureViewId: nextActiveSettingsStructureViewId,
        settingsStructureModuleId: null
      }
    }

    case 'UPDATE_ACTIVE_VIEW_ID': {
      const {
        nextActiveViewId
      } = action
      return {...state, viewId: nextActiveViewId}
    }

    default:
      return state
  }
}

export default activeReducers