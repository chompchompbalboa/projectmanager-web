//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import AutosizeTextArea from 'react-autosize-textarea'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCellString = ({ 
  updateTableCell,
  updateValue, 
  value 
}) => {
  return (
    <StyledTextarea
      onBlur={() => updateTableCell()}
      onChange={(e) => updateValue(e.target.value)}
      value={value === null ? "" : value}/>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
TableCellString.propTypes = {
  updateTableCell: func,
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