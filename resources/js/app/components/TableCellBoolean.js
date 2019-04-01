//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCellBoolean = ({ isEditable, updateValue, value }) => {
  return (
    <StyledInput 
       type="checkbox"
       checked={value}
       onChange={(e) => updateValue(e.target.checked)}/>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default TableCellBoolean