//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import AutosizeTextArea from 'react-autosize-textarea'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class SheetCellString extends Component {
  
  constructor(props) {
    super(props)
    this.textarea = React.createRef();
  }
  
  componentDidUpdate = () => {
    const {
      isActive
    } = this.props
    isActive && this.textarea.current.focus()
  }
  
  render() {
    const { 
      isActive,
      updateSheetCell,
      updateValue, 
      value 
    } = this.props
    const cursor = isActive ? 'text' : 'default'
    return (
      <StyledTextarea
        ref={this.textarea}
        style={{
          cursor: cursor
        }}
        readOnly={!isActive}
        onBlur={updateSheetCell}
        onChange={(e) => updateValue(e.target.value)}
        value={value === null ? "" : value}/>
    )
  }
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
SheetCellString.propTypes = {
  isActive: bool,
  updateSheetCell: func,
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

export default SheetCellString