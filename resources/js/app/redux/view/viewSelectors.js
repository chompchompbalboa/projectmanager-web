//-----------------------------------------------------------------------------
// Select Active View
//-----------------------------------------------------------------------------
export const selectActiveView = state => state.view.views && state.view.views !== null ? state.view.views[state.active.viewId] : null

//-----------------------------------------------------------------------------
// Select View Ids
//-----------------------------------------------------------------------------
export const selectViewIds = state => state.view.viewIds ? state.view.viewIds : null

//-----------------------------------------------------------------------------
// Select Views
//-----------------------------------------------------------------------------
export const selectViews = state => state.view.views ? state.view.views : null