//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'

import Tagline from './Tagline'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Logo = ({ fontSize, showTagline }) => {
  return (
    <Container>
      <Name
        fontSize={fontSize}>
        <Build>build</Build><That>that</That>
      </Name>
      {showTagline && 
        <Tagline
          fontSize={fontSize}>
          Project management for people who build things
        </Tagline>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
Logo.propTypes = {
  fontSize: string,
  showTagline: bool
}

Logo.defaultProps = {
  fontSize: '3em',
  showTagline: false
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Name = styled.div`
  display: flex;
  font-size: ${ props => props.fontSize };
`

const Build = styled.div`
`

const That = styled.div`
  font-weight: normal;
`

export default Logo