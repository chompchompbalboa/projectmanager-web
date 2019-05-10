//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { oneOf } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectActiveContent } from './redux/active/activeSelectors'

import AppContainer from './components/AppContainer'
import AppSettings from './components/AppSettings'
import AppSidebar from './components/AppSidebar'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeContent: selectActiveContent(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const App = ({
  activeContent
}) => {

  const contentComponents = {
    CONTAINER: AppContainer,
    SETTINGS: AppSettings
  }

  const AppActiveContent = contentComponents[activeContent]
  
  return (
    <Container>
      <AppSidebar/>
      <AppActiveContent/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
App.propTypes = {
  activeContent: oneOf([
    'CONTAINER',
    'SETTINGS'
  ])
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default connect(
  mapStateToProps
)(App)
