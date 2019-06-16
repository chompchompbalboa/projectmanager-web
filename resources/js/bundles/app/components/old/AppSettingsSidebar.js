//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number, object, oneOf, shape, string } from 'prop-types'
import { connect } from 'react-redux'

import { 
  updateActiveSettingsContent as updateActiveSettingsContentAction 
} from '../redux/active/activeActions'
import { selectActiveSettingsContent } from '../redux/active/activeSelectors'

import AppContentSidebar from './AppContentSidebar'
import AppContentSidebarItem from './AppContentSidebarItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeSettingsContent: selectActiveSettingsContent(state)
})

const mapDispatchToProps = dispatch => ({
  updateActiveSettingsContent: nextActiveSettingsContent => dispatch(updateActiveSettingsContentAction(nextActiveSettingsContent))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsSidebar = ({
  activeSettingsContent,
  updateActiveSettingsContent
}) => {
  return (
    <AppContentSidebar
      header="Settings">
      <AppContentSidebarItem
        isActiveItem={activeSettingsContent === 'STRUCTURE'}
        name="Structure"
        onClick={() => updateActiveSettingsContent('STRUCTURE')}/>
    </AppContentSidebar>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsSidebar.propTypes = {
  activeCollectionId: number,
  activeContainer: shape({
    name: string
  }),
  activeSettingsContent: oneOf([
    'STRUCTURE'
  ]),
  collectionIds: array,
  collections: object,
  updateActiveSettingsContent: func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettingsSidebar)