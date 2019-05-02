//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { colors, layout } from '../config'

import { selectModuleIds, selectModules } from '../redux/module/moduleSelectors'

import AppContentView from './AppContentView'
import Module from './Module'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  moduleIds: selectModuleIds(state),
  modules: selectModules(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerView = ({
  moduleIds,
  modules
}) => {
  return (
    <AppContentView>
      AppContainerView
      {moduleIds !== null && moduleIds.map(moduleId => (
        <Module
          key={moduleId}
          module={modules[moduleId]}/>
      ))}
    </AppContentView>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerView.propTypes = {
  moduleIds: array,
  modules: object
}

export default connect(
  mapStateToProps
)(withImmutablePropsToJS(AppContainerView))