//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { layout } from '../../_config'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeContainerId: state.view.activeContainerId
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainer = ({ activeContainerId }) => {
  return (
    <Container>
      {activeContainerId}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainer.propTypes = {
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: ${ layout.SIDEBAR_WIDTH };
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH });
  min-height: 100vh;
`

export default connect(
  mapStateToProps
)(AppContainer)