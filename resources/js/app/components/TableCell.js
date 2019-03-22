//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, node, number, oneOfType, string } from 'prop-types'
import styled from 'styled-components'

import { layout, timing } from '../../_config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class TableCell extends Component {

  state = {
    value: this.props.value === null ? "" : this.props.value
  }

  updateValue = (nextValue) => {
    this.setState({
      value: nextValue
    })
  }

  render() {
    const {
      autofocus,
      isEditable,
      placeholder,
      type,
      width
    } = this.props
    const {
      value
    } = this.state
    return (
      <Container
        widthPercentage={width}>
        {isEditable 
          ?<StyledTextarea
              autoFocus={autofocus}
              rows="1"
              onChange={(e) => this.updateValue(e.target.value)}
              placeholder={placeholder}
              value={value}/>
          :<Value>{value}</Value>
        }
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableCell.propTypes = {
  autofocus: bool,
  isEditable: bool,
  placeholder: string,
  type: string,
	value: oneOfType([node, number, string]),
	width: number
}

TableCell.defaultProps = {
  autofocus: false,
	width: 1
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	padding: 0 ${ layout.TABLE_PADDING };
	width: calc(100% * ${props => props.widthPercentage});
	font-weight: ${props => props.fontWeight};
	display: flex;
	justify-content: ${props => props.justifyContent};
  align-items: flex-start;
`

const Value = styled.div`
	cursor: ${props => props.valueCursor};
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
