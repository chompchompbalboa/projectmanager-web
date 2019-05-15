//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCellBoolean = ({
  updateTableCell,
  updateValue, 
  value 
}) => {
  
  const handleChange = nextValue => {
    updateValue(String(nextValue))
    window.setTimeout(() => updateTableCell(), 25)
  }

  return (
    <StyledInput 
       type="checkbox"
       checked={![null, 'false'].includes(value)}
       onChange={(e) => handleChange(e.target.checked)}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableCellBoolean.propTypes = {
  updateTableCell: func,
  updateValue: func,
  value: string
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