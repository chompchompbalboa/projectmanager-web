//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'

import { selectCollectionIds, selectCollections } from '../redux/collection/collectionSelectors'
import { selectActiveContainer } from '../redux/container/containerSelectors'
import { selectActiveCollectionId } from '../redux/active/activeSelectors'

import AppContainerSidebarCollection from './AppContainerSidebarCollection'
import AppContentSidebar from './AppContentSidebar'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeCollectionId: selectActiveCollectionId(state),
  activeContainer: selectActiveContainer(state),
  collectionIds: selectCollectionIds(state),
  collections: selectCollections(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerSidebar = ({ 
  activeCollectionId, 
  activeContainer,
  collectionIds,
  collections
}) => {
  return (
    <AppContentSidebar
      header={activeContainer.name}>
      {collectionIds !== null && collectionIds.map(collectionId => (
        <AppContainerSidebarCollection
          key={collectionId}
          collection={collections[collectionId]}
          isActiveCollection={collectionId === activeCollectionId}/>
      ))}
    </AppContentSidebar>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerSidebar.propTypes = {
  activeCollectionId: number,
  activeContainer: shape({
    name: string
  }),
  collectionIds: array,
  collections: object
}

export default connect(
  mapStateToProps
)(AppContainerSidebar)