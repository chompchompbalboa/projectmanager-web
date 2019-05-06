//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import ContentEditable from 'react-input-autosize'

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
  onChange: () =>
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled(AutosizeInput)`
  border: none;
  outline: none;
  font-size: 36px;
`

export default Input