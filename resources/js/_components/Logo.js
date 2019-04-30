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
      <Name>
        <Build
          fontSize={fontSize}>
          build
        </Build>
        <That
          fontSize={fontSize}>
          that
        </That>
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
`

const Build = styled.div`
  font-size: ${ props => props.fontSize };
  font-weight: bold;
`

const That = styled.div`
  font-size: ${ props => props.fontSize };
`

export default Logo