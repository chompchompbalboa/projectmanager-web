//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'

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
      <Tagline
          fontSize={fontSize}
          showTagline={showTagline}>
          Project management for people who build things
      </Tagline>
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
  showTagline: true
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Name = styled.div`
  display: flex;
  font-size: ${ props => props.fontSize };
`

const Build = styled.div`
  font-weight: bold;
`

const That = styled.div`
`

const Tagline = styled.div`
  display: ${ props => props.showTagline ? 'block' : 'none' };
  font-size: calc(${ props => props.fontSize } / 2.5);
`

export default Logo