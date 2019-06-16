//-----------------------------------------------------------------------------
// Update Views
//-----------------------------------------------------------------------------
export const updateViews = nextViews => ({
  type: 'UPDATE_VIEWS',
  nextViews: nextViews
})

//-----------------------------------------------------------------------------
// Update View Ids
//-----------------------------------------------------------------------------
export const updateViewIds = nextViewIds => ({
  type: 'UPDATE_VIEW_IDS',
  nextViewIds: nextViewIds
})