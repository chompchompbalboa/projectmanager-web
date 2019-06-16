//-----------------------------------------------------------------------------
// Update Collections
//-----------------------------------------------------------------------------
export const updateCollections = nextCollections => ({
  type: 'UPDATE_COLLECTIONS',
  nextCollections: nextCollections
})

//-----------------------------------------------------------------------------
// Update Collection Ids
//-----------------------------------------------------------------------------
export const updateCollectionIds = nextCollectionIds => ({
  type: 'UPDATE_COLLECTION_IDS',
  nextCollectionIds: nextCollectionIds
})