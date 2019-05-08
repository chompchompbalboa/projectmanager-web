//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppSettingsStructureModuleAddModule extends Component {

  state = {
    isActionsDropdownVisible: false
  }

  types = [
    {type: 'BOARDS', text: 'Boards'},
    {type: 'TABLE', text: 'Table'},
  ]

  render() {
    const {
      isActionsDropdownVisible
    } = this.state
    return (
      <Container>
        <Add
          onClick={() => this.setState({ isActionsDropdownVisible: !isActionsDropdownVisible })}>
          Add...
        </Add>
        <Dropdown
          closeDropdown={() => this.setState({ isActionsDropdownVisible: false })}
          isDropdownVisible={isActionsDropdownVisible}>
          {this.types.map((type, index) => (
            <DropdownItem
              key={index}
              onClick={() => console.log(type.type)}
              text={type.text}/>
          ))}
        </Dropdown>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  margin-left: 7vw;
`

const Add = styled.h5`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`