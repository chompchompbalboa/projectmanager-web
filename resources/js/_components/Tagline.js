//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Tagline = ({ fontSize }) => {
  return (
    <Container
      fontSize={fontSize}>
      Custom built software to power your business
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
Tagline.propTypes = {
  fontSize: string
}

Tagline.defaultProps = {
  fontSize: '3em'
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  font-family: Open Sans, sans-serif;
  font-size: calc(${ props => props.fontSize } / 2.25);
`

export default Tagline