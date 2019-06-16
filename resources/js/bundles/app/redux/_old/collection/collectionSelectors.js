//-----------------------------------------------------------------------------
// Select Active Collection
//-----------------------------------------------------------------------------
export const selectActiveCollection = state => state.collection.collections && state.collection.collections !== null ? state.collection.collections[state.active.collectionId] : null

//-----------------------------------------------------------------------------
// Select Collection Ids
//-----------------------------------------------------------------------------
export const selectCollectionIds = state => state.collection.collectionIds ? state.collection.collectionIds : null

//-----------------------------------------------------------------------------
// Select Collections
//-----------------------------------------------------------------------------
export const selectCollections = state => state.collection.collections ? state.collection.collections : null