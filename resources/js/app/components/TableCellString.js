//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { layout, timing } from '../../_config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCellString = ({ autofocus, isEditable, placeholder, updateValue, value }) => {
  return (
    <Container>
        {isEditable 
          ?<StyledTextarea
              autoFocus={autofocus}
              rows="1"
              onChange={(e) => updateValue(e.target.value)}
              placeholder={placeholder}
              value={value}/>
          :<Value>{value}</Value>
        }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
`

const Value = styled.div`
	width: 100%;
`

const StyledTextarea = styled.textarea`
cursor: pointer;
margin: 0;
padding: 0;
width: 100%;
height: 100%;
font-size: inherit;
border: none;
outline: none;
resize: none;
display: flex;
justify-content: center;
align-items: center;
background-color: transparent;
transition: all ${ timing.TRANSITION_DURATION };
&:hover {
  &::placeholder {
    color: black;
  }
}
`

export default TableCellString