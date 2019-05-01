//-----------------------------------------------------------------------------
// Select Active Container Id
//-----------------------------------------------------------------------------
export const selectActiveContainerId = state => state.getIn(['active', 'containerId'])

//-----------------------------------------------------------------------------
// Select Active Content
//-----------------------------------------------------------------------------
export const selectActiveContent = state => state.getIn(['active', 'content'])

//-----------------------------------------------------------------------------
// Select Active Collection Id
//-----------------------------------------------------------------------------
export const selectActiveCollectionId = state => state.getIn(['active', 'collectionId'])

//-----------------------------------------------------------------------------
// Select Active View Id
//-----------------------------------------------------------------------------
export const selectActiveViewId = state => state.getIn(['active', 'viewId'])