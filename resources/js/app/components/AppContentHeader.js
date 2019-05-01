//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors, layout } from '../config'

import AppContentHeaderBreadcrumbs from './AppContentHeaderBreadcrumbs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentHeader = () => {
  return (
    <Container>
      <AppContentHeaderBreadcrumbs />
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
  display: flex;
  align-items: center;
  color: ${ colors.TEXT_WHITE };
  font-size: 0.75rem;
`

export default AppContentHeader