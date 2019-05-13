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
  top: ${ layout.CONTAINER_HEADER_HEIGHT };
  left: calc(${ layout.SIDEBAR_WIDTH } + ${ layout.CONTAINER_SIDEBAR_WIDTH });
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH } - ${ layout.CONTAINER_SIDEBAR_WIDTH });
  height calc(100vh - ${ layout.CONTAINER_HEADER_HEIGHT });
  background-color: ${ colors.CONTAINER_MODULES_BACKGROUND };
  border-top-left-radius: 5px;
`

export default AppContentView