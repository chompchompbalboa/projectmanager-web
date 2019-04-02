//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import AutosizeTextArea from 'react-autosize-textarea'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCellString = ({ autofocus, placeholder, updateValue, value }) => {
  return (
    <StyledTextarea
      autoFocus={autofocus}
      onChange={(e) => updateValue(e.target.value)}
      placeholder={placeholder}
      value={value}/>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
TableCellString.propTypes = {
  autofocus: bool,
  placeholder: string,
  updateValue: func,
  value: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledTextarea = styled(AutosizeTextArea)`
margin: 0;
padding: 0;
width: 100%;
font-size: inherit;
border: none;
outline: none;
resize: none;
display: flex;
justify-content: center;
align-items: center;
background-color: transparent;
`

export default TableCellString