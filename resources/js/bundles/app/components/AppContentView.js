//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import HiddenScrollbarContainer from './HiddenScrollbarContainer'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentView = ({
  children,
  className // Required by styled components
}) => {
  return (
    <Container
      className={className}>
      {children}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContentView.propTypes = {
  className: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled(HiddenScrollbarContainer)`
  position: fixed;
  z-index: 1;
  top: ${ layout.HEADER_HEIGHT };
  left: ${ layout.SIDEBAR_WIDTH };
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH });
  height calc(100vh - ${ layout.HEADER_HEIGHT });
  background-color: ${ colors.MODULE_BACKGROUND };
  border-top-left-radius: 5px;
`

export default AppContentView