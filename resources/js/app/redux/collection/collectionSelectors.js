//-----------------------------------------------------------------------------
// Select Active Collection
//-----------------------------------------------------------------------------
export const selectActiveCollection = state => state.getIn(['collection', 'collections', state.getIn(['active', 'collectionId']) + ""])

//-----------------------------------------------------------------------------
// Select Collection Ids
//-----------------------------------------------------------------------------
export const selectCollectionIds = state => state.getIn(['collection', 'collectionIds'])

//-----------------------------------------------------------------------------
// Select Collections
//-----------------------------------------------------------------------------
export const selectCollections = state => state.getIn(['collection', 'collections'])