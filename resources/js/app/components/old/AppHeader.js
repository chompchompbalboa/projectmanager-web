//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { layout } from '../../_config'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => {
  return {
    status: state.status.message
  }
}

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppHeader = ({ children, status }) => {
  return (
    <Container>
      <HeaderContent>
        {children}
      </HeaderContent>
      <AppStatus>
        {status}
      </AppStatus>
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: ${ layout.SIDEBAR_WIDTH };
  height: ${ layout.HEADER_HEIGHT };
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH });
  padding: ${ layout.PADDING };
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderContent = styled.div`
`

const AppStatus = styled.div`
  margin-right: calc(2 * ${ layout.PADDING });
  font-size: 0.9em;
  font-color: rgb(240,240,240)
`

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppHeader.propTypes = {
  status: string
}

export default connect(
  mapStateToProps
)(AppHeader)