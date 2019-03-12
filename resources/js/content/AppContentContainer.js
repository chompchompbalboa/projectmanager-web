//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentContainer = ({ children, isActive }) => {
  return (
    <Container
      isActive={isActive}>
      {children}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContentContainer.propTypes = {
  isActive: bool
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: ${ props => props.isActive ? 'initial' : 'none'};
  width: 100%;
`

export default AppContentContainer