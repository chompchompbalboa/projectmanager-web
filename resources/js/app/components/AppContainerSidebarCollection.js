//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, bool, func, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'

import { selectActiveViewId } from '../redux/active/activeSelectors'
import { selectViewIds, selectViews, selectViewsCount } from '../redux/view/viewSelectors'
import { 
  updateActiveCollectionId as updateActiveCollectionIdAction 
} from '../redux/active/activeActions'

import AppContainerSidebarCollectionView from './AppContainerSidebarCollectionView'
import AppContentSidebarItem from './AppContentSidebarItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeViewId: selectActiveViewId(state),
  viewIds: selectViewIds(state),
  views: selectViews(state),
  viewsCount: selectViewsCount(state),
})

const mapDispatchToProps = dispatch => ({
  updateActiveCollectionId: nextActiveCollectionId => dispatch(updateActiveCollectionIdAction(nextActiveCollectionId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerSidebarCollection = ({ 
  activeViewId,
  collection: {
    id,
    name
  },
  viewIds,
  views,
  isActiveCollection,
  updateActiveCollectionId,
  viewsCount
}) => {
  return (
    <AppContentSidebarItem
      isActiveItem={isActiveCollection}
      name={name}
      onClick={() => updateActiveCollectionId(id)}>
      {(isActiveCollection && viewsCount > 1 && viewIds !== null) && viewIds.map(viewId => (
        <AppContainerSidebarCollectionView
          key={viewId}
          isActiveView={viewId === activeViewId}
          view={views[viewId]}/>
      ))}
    </AppContentSidebarItem>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerSidebarCollection.propTypes = {
  activeViewId: number,
  collection: shape({
    id: number,
    name: string
  }),
  isActiveCollection: bool,
  viewIds: array,
  views: object,
  viewsCount: number,
  updateActiveCollectionId: func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainerSidebarCollection)