//-----------------------------------------------------------------------------
// Select Active View
//-----------------------------------------------------------------------------
export const selectActiveView = state => state.view.views !== null ? state.view.views[state.active.viewId] : null

//-----------------------------------------------------------------------------
// Select View Ids
//-----------------------------------------------------------------------------
export const selectViewIds = state => state.view.viewIds

//-----------------------------------------------------------------------------
// Select Views
//-----------------------------------------------------------------------------
export const selectViews = state => state.view.views

//-----------------------------------------------------------------------------
// Select Views Count
//-----------------------------------------------------------------------------
export const selectViewsCount = state => {
  const views = selectViews(state)
  return views !== null ? Object.keys(views).length : 0
}