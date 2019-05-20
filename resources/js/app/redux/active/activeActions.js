//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Update Active Content
//-----------------------------------------------------------------------------
export const updateActiveContent = nextActiveContent => {
  return dispatch => {
    dispatch(updateActiveContentReducer(nextActiveContent))
  }
}

const updateActiveContentReducer = nextActiveContent => ({
  type: 'UPDATE_ACTIVE_CONTENT',
  nextActiveContent: nextActiveContent
})

//-----------------------------------------------------------------------------
// Update Active Module Id
//-----------------------------------------------------------------------------
export const updateActiveModuleId = nextActiveModuleId => ({
  type: 'UPDATE_ACTIVE_MODULE_ID',
  nextActiveModuleId: nextActiveModuleId
})