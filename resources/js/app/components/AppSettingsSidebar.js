//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import AppContentSidebar from './AppContentSidebar'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerSidebar = () => {
  return (
    <AppContentSidebar
      header="Settings">
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
)(withImmutablePropsToJS(AppContainerSidebar))