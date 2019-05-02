//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { selectStructureViews } from '../redux/structure/structureSelectors'

import AppSettingsStructureView from './AppSettingsStructureView'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  views: selectStructureViews(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureCollection = ({
  collection,
  views
}) => {
  return (
    <Container>
      &nbsp;&nbsp;&nbsp;{collection.name}
      {views && views !== null && collection.views && collection.views.map(viewId => (
        <AppSettingsStructureView
          key={viewId}
          view={views[viewId]}/>
      ))}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default connect(
  mapStateToProps
)(withImmutablePropsToJS(AppSettingsStructureCollection))