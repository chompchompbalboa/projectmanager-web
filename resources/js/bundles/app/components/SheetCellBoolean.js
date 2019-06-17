//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const SheetCellBoolean = ({
  updateSheetCell,
  updateValue, 
  value 
}) => {
  
  const handleChange = nextValue => {
    updateValue(String(nextValue))
    window.setTimeout(() => updateSheetCell(), 25)
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
SheetCellBoolean.propTypes = {
  updateSheetCell: func,
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

export default SheetCellBoolean