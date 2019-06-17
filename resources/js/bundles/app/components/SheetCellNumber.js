//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number, oneOfType, string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const SheetCellNumber = ({ 
  updateSheetCell,
  updateValue, 
  value 
}) => {
  return (
      <StyledInput
        type="number"
        onBlur={() => updateSheetCell()}
        onChange={(e) => updateValue(e.target.value)}
        value={value === null ? "" : value}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SheetCellNumber.propTypes = {
  updateSheetCell: func,
  updateValue: func,
  value: oneOfType([string, number])
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled.input`
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: inherit;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export default SheetCellNumber