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
    <Container>
      {moduleIds !== null && moduleIds.map(moduleId => (
        <Module
          key={moduleId}
          module={modules[moduleId]}/>
      ))}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerView.propTypes = {
  moduleIds: array,
  modules: object
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: fixed;
  top: ${ layout.CONTAINER_HEADER_HEIGHT };
  left: calc(${ layout.SIDEBAR_WIDTH } + ${ layout.CONTAINER_SIDEBAR_WIDTH });
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH } - ${ layout.CONTAINER_SIDEBAR_WIDTH });
  height calc(100vh - ${ layout.CONTAINER_HEADER_HEIGHT });
  background-color: ${ colors.CONTAINER_MODULES_BACKGROUND };
  border-top-left-radius: 5px;
`

export default connect(
  mapStateToProps
)(withImmutablePropsToJS(AppContainerView))