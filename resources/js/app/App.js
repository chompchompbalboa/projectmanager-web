//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { string, func } from 'prop-types'
import styled from 'styled-components'

import AppContainer from './content/AppContainer'
import AppModal from './content/AppModal'
import AppSidebar from './content/AppSidebar'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const App = () => {
  return (
    <Container>
      <AppSidebar/>
      <AppContainer/>
      <AppModal/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
App.propTypes = {
  activeContent: string,
  activeModal: string,
  updateActiveContent: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default App
