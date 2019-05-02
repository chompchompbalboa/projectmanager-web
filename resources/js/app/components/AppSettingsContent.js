//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { oneOf } from 'prop-types'
import { connect } from 'react-redux'

import { selectActiveSettingsContent } from '../redux/active/activeSelectors'

import AppContentView from './AppContentView'
import AppSettingsStructure from './AppSettingsStructure'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeSettingsContent: selectActiveSettingsContent(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsContent = ({
  activeSettingsContent
}) => {
  
  const appSettingsContentMap = {
    STRUCTURE: AppSettingsStructure
  }
  
  const AppSettingsContentType = appSettingsContentMap[activeSettingsContent]
  
  return (
    <AppContentView>
      <AppSettingsContentType />
    </AppContentView>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsContent.propTypes = {
  activeSettingsContent: oneOf([
    'STRUCTURE'
  ])
}

export default connect(
  mapStateToProps
)(AppSettingsContent)