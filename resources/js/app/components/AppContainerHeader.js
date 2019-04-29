//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors, layout } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerHeader = () => {
  return (
    <Container>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: fixed;
  top: 0;
  left: calc(${ layout.SIDEBAR_WIDTH } + ${ layout.CONTAINER_SIDEBAR_WIDTH });
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH } + ${ layout.CONTAINER_SIDEBAR_WIDTH });
  height: ${ layout.CONTAINER_HEADER_HEIGHT };
  background-color: ${ colors.CONTAINER_HEADER_BACKGROUND };
`

export default AppContainerHeader