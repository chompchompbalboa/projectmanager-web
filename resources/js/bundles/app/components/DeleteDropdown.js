//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'


import Dropdown from './Dropdown'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class ChangeIconDropdown extends Component {

  state = {
    inputValue: ''
  }

  handleDelete = () => {
    const {
      closeDropdown,
      onDelete
    } = this.props
    closeDropdown()
    onDelete()
  }
  
  render() {
    const {
      closeDropdown,
      isDropdownVisible,
      textToMatch,
      type,
      ...props
    } = this.props
    const {
      inputValue
    } = this.state
    return (
      <Dropdown
        closeDropdown={closeDropdown}
        isDropdownVisible={isDropdownVisible}
        width="auto"
        {...props}>
        <DeleteContainer
          >
          <Prompt>
            Are you sure you want to delete this { type }?
            Please enter the { type } name below to confirm:
          </Prompt>
          <StyledInput
            ref={input => input && input.focus()}
            onChange={e => this.setState({ inputValue: e.target.value })}
            value={inputValue}/>
          <DeleteButton
            onClick={inputValue === textToMatch ? this.handleDelete : null}
            isTextMatched={inputValue === textToMatch}>
            Delete
          </DeleteButton>
        </DeleteContainer>
      </Dropdown>
    )
  }
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ChangeIconDropdown.propTypes = {
  closeDropdown: func,
  isDropdownVisible: bool,
  onDelete: func,
  textToMatch: string,
  type: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const DeleteContainer = styled.div`
  padding: 2vh
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: normal;
`

const Prompt = styled.div`
  text-align: center;
`

const StyledInput = styled.input`
  width: 75%;
  margin: 1.5vh 0;
  padding: 0.25rem;
  border: 2px solid gray;
  border-radius: 5px;
  outline: none;
  background-color: transparent;
  font-size: 0.9rem;
  letter-spacing: 0.25px;
  text-align: center;
`

const DeleteButton = styled.div`
  cursor: ${ props => props.isTextMatched ? 'pointer' : 'auto'};
  width: 75%;
  padding: 0.3rem;
  text-align: center;
  border-radius: 5px;
  background-color: ${ props => props.isTextMatched ? 'rgb(220, 0, 0)' : 'rgb(150, 150, 150)'};;
  color: white;
  opacity: ${ props => props.isTextMatched ? '0.85' : '0.375'};
  &:hover {
    opacity: ${ props => props.isTextMatched ? '1' : '0.375'};
  }
`

export default ChangeIconDropdown