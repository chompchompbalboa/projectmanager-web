//-----------------------------------------------------------------------------
// Initial State
//-----------------------------------------------------------------------------
const initialState = {
  collectionId: initialData.activeCollectionId,
  containerId: initialData.activeContainerId,
  content: 'SETTINGS',
  settingsContent: 'STRUCTURE',
  viewId: initialData.activeViewId,
  settingsStructureContainerId: null,
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
      return {...state, content: nextActiveContent}
    }

    case 'UPDATE_ACTIVE_SETTINGS_CONTENT': {
      const {
        nextActiveSettingsContent
      } = action
      return {...state, settingsContent: nextActiveSettingsContent}
    }

    case 'UPDATE_ACTIVE_SETTINGS_STRUCTURE_CONTAINER_ID': {
      const {
        nextActiveSettingsStructureContainerId
      } = action
      return {...state, settingsStructureContainerId: nextActiveSettingsStructureContainerId}
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