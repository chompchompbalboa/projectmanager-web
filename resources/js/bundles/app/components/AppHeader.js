//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors, layout } from '../config'

import AppHeaderBreadcrumbs from './AppHeaderBreadcrumbs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppHeader = () => {
  return (
    <Container>
      <AppHeaderBreadcrumbs />
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
  height: ${ layout.HEADER_HEIGHT };
  display: flex;
  align-items: center;
  color: ${ colors.TEXT_WHITE };
  font-size: 0.75rem;
`

export default AppHeader