//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors, layout } from '../config'

import AppContainerHeader from './AppContainerHeader'
import AppContainerSidebar from './AppContainerSidebar'
import AppContainerView from './AppContainerView'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainer = () => {
  return (
    <Container>
      <AppContainerSidebar />
      <AppContainerHeader />
      <AppContainerView />
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
  position: fixed;
  top: 0;
  left: ${ layout.SIDEBAR_WIDTH };
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH });
  min-height: 100vh;
  background-color: ${ colors.CONTAINER_BACKGROUND };
`

export default AppContainer