//-----------------------------------------------------------------------------
// Select Active View
//-----------------------------------------------------------------------------
export const selectActiveView = state => state.getIn(['view', 'views', state.getIn(['active', 'viewId']) + ""])

//-----------------------------------------------------------------------------
// Select View Ids
//-----------------------------------------------------------------------------
export const selectViewIds = state => state.getIn(['view', 'viewIds'])

//-----------------------------------------------------------------------------
// Select Views
//-----------------------------------------------------------------------------
export const selectViews = state => state.getIn(['view', 'views'])

//-----------------------------------------------------------------------------
// Select Views Count
//-----------------------------------------------------------------------------
export const selectViewsCount = state => {
  const views = selectViews(state)
  return views !== null ? views.size : 0
}