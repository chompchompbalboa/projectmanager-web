//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'

import { 
  updateActiveViewId as updateActiveViewIdAction 
} from '../redux/active/activeActions'

import AppContentSidebarItemSubitem from './AppContentSidebarItemSubitem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  updateActiveViewId: nextActiveViewId => dispatch(updateActiveViewIdAction(nextActiveViewId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerSidebarCollectionView = ({
  isActiveView,
  view: {
    id,
    name
  },
  updateActiveViewId
}) => {
  return (
    <AppContentSidebarItemSubitem
      isActiveSubitem={isActiveView}
      onClick={() => updateActiveViewId(id)}>
      {name}
    </AppContentSidebarItemSubitem>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerSidebarCollectionView.propTypes = {
  isActiveView: bool,
  view: shape({
    id: number,
    name: string
  }),
  updateActiveViewId: func
}

export default connect(
  null,
  mapDispatchToProps
)(AppContainerSidebarCollectionView)