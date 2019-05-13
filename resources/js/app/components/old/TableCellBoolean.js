//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, number, oneOfType } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCellBoolean = ({ updateValue, value }) => {
  return (
    <StyledInput 
       type="checkbox"
       checked={value === null ? false : value}
       onChange={(e) => updateValue(e.target.checked)}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableCellBoolean.propTypes = {
  updateValue: func,
  value: oneOfType([bool, number])
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled.input`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default TableCellBoolean