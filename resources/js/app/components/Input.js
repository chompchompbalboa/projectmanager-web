//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Input = ({
  className, // Required by styled-components
  readOnly,
  onChange,
  value
}) => {
  return (
    <StyledInput
      className={className}
      readOnly={readOnly}
      onChange={onChange}
      style={{
        fontSize: 36
      }}
      value={value}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Input.propTypes = {
  className: string,
  readOnly: bool,
  onChange: func,
  value: string
}

Input.defaultProps = {
  onChange: () => null
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: inherit;
`

export default Input