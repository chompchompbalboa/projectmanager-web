//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string, func } from 'prop-types'
import styled from 'styled-components'

import AppContainer from './components/AppContainer'
//import AppModal from './components/AppModal'
import AppSidebar from './components/AppSidebar'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const App = () => {
  return (
    <Container>
      <AppSidebar/>
      <AppContainer/>
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
