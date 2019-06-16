//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppDevelopmentInput = ({ onChange, placeholder, value }) => {
  return (
    <Container>
      <Label>{placeholder}:&nbsp;</Label>
      <StyledInput 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppDevelopmentInput.propTypes = {
  onChange: func,
  placeholder: string,
  value: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.div`
  font-size: 14px;
`

const StyledInput = styled.input`
  padding: 0.5vh;
  outline: none;
  background-color: transparent;
  border: none;
  color: black;
  font-size: 14px;
`

export default AppDevelopmentInput