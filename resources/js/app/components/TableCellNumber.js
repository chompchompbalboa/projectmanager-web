//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCellNumber = ({ autofocus, placeholder, updateValue, value }) => {
  return (
      <StyledInput
        type="number"
        onChange={(e) => updateValue(e.target.value)}
        placeholder={placeholder}
        value={value}/>
  )
}

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

export default TableCellNumber