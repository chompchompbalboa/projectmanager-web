//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Button = ({ text, onClick }) => {
  return (
    <Container
      onClick={() => onClick()}>
      {text}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
Button.propTypes = {
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
  background-color: ${ colors.PRIMARY };
  color: ${ colors.PRIMARY_BACKGROUND_TEXT_COLOR };
  font-family: Open Sans, sans-serif;
`

export default Button