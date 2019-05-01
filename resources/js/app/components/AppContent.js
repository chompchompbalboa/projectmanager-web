//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors, layout } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContent = ({ children }) => {
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
  top: 0;
  left: ${ layout.SIDEBAR_WIDTH };
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH });
  min-height: 100vh;
  background-color: ${ colors.CONTAINER_BACKGROUND };
`

export default AppContent