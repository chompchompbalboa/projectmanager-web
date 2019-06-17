//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { oneOf } from 'prop-types'
import styled from 'styled-components'

import { colors } from './config'

import AppFile from './components/AppFile'
import AppHeader from './components/AppHeader'
import AppSidebar from './components/AppSidebar'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const App = () => (
  <Container>
    <AppSidebar />
    <AppHeader />
    <AppFile />
  </Container>
)

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
App.propTypes = {
  activeContent: oneOf([
    'FOLDERS'
  ])
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${ colors.BACKGROUND };
`

export default App
