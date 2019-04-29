//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Button = ({ backgroundColor, text, onClick }) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      onClick={() => onClick()}>
      {text}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
Button.propTypes = {
  backgroundColor: string,
  onClick: func,
  text: string
}

Button.defaultProps = {
  onClick: () => null,
  text: "Button"
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  cursor: pointer;
  padding: 1.5vh 3vh;
  border-radius: 5px;
  background-color: ${ props => props.backgroundColor };
  color: white;
  font-family: Open Sans, sans-serif;
`

export default Button