//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'

import { selectActiveModuleId } from '../redux/active/activeSelectors'

import AppContentView from './AppContentView'
import Module from './Module'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeModuleId: selectActiveModuleId(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppFoldersModule = ({
  activeModuleId
}) => {
  return (
    <AppContentView>
      <Module
        key={activeModuleId}
        moduleId={activeModuleId}/>
    </AppContentView>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppFoldersModule.propTypes = {
  activeModuleId: string
}

export default connect(
  mapStateToProps
)(AppFoldersModule)