//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors, layout } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentView = ({
  children
}) => {
  return (
    <Container>
      {children}
    </Container>
  )
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

export default AppContentView