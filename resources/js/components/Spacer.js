//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Spacer = ({ height, width }) => {
  return (
    <Container 
      height={height}
      width={width}/>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
Spacer.propTypes = {
  height: string,
  width: string
}

Spacer.defaultProps = {
  height: '3vh',
  width: '4vh'
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: ${ props => props.width };
  height: ${ props => props.height };
`

export default Spacer