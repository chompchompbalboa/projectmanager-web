//-----------------------------------------------------------------------------
// Update Modules
//-----------------------------------------------------------------------------
export const updateModules = nextModules => {
  return dispatch => {
    dispatch(updateModulesReducer(nextModules))
  }
}

const updateModulesReducer = nextModules => ({
  type: 'UPDATE_MODULES',
  nextModules: nextModules
})

//-----------------------------------------------------------------------------
// Update Module Ids
//-----------------------------------------------------------------------------
export const updateModuleIds = nextModuleIds => ({
  type: 'UPDATE_MODULE_IDS',
  nextModuleIds: nextModuleIds
})