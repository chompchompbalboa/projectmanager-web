//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { oneOf } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectActiveContent } from './redux/active/activeSelectors'

import AppFolders from './components/AppFolders'

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
    FOLDERS: AppFolders
  }

  const AppActiveContent = contentComponents[activeContent]
  
  return (
    <Container>
      <AppActiveContent/>
    </Container>
  )
}

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
const Container = styled.div``

export default connect(
  mapStateToProps
)(App)
