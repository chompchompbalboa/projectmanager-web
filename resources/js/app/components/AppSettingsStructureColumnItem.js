//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, number, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config' 

import ContentEditable from './ContentEditable'
import DeleteDropdown from './DeleteDropdown'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import Icon from './Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppSettingsStructureColumnItem extends Component {

  state = {
    isActionsDropdownVisible: false,
    isDeleteDropdownVisible: false,
    isItemRenaming: false,
    name: this.props.name
  }

  handleNameBlur = () => {
    const {
      id,
      updateItem
    } = this.props
    const {
      name
    } = this.state
    this.setState({
      isItemRenaming: false
    })
    updateItem(id, { name: name })
  }

  render() {
    const {
      deleteItem,
      icon,
      id,
      isActive,
      onClick,
      type
    } = this.props
    const {
      isActionsDropdownVisible,
      isDeleteDropdownVisible,
      isItemRenaming,
      name
    } = this.state
    return (
      <Container
        isActive={isActive}
        onClick={onClick}>
        <NameContainer>
          <IconContainer>
            {icon && <Icon icon={icon}/>}
          </IconContainer>
          <Name
            focus={isItemRenaming}
            editable={isItemRenaming}
            isItemRenaming={isItemRenaming}
            onBlur={() => this.handleNameBlur()}
            onChange={(e, value) => this.setState({ name: value })}
            value={name}/>
        </NameContainer>
        <ActionsContainer>
          <Ellipsis
            onClick={() => this.setState({ isActionsDropdownVisible: true })}>
            . . .
          </Ellipsis>
          {isActionsDropdownVisible && 
              <Dropdown
                closeDropdown={() => this.setState({ isActionsDropdownVisible: false })}
                isDropdownVisible={isActionsDropdownVisible}>
                <DropdownItem
                  onClick={() => this.setState({ isActionsDropdownVisible: false, isItemRenaming: true })}
                  text="Rename"/>
                <DropdownItem
                  onClick={() => this.setState({ isActionsDropdownVisible: false, isDeleteDropdownVisible: true })}
                  text="Delete"/>
              </Dropdown>}
          {isDeleteDropdownVisible &&
            <DeleteDropdown
              onDelete={() => deleteItem(id)}
              closeDropdown={() => this.setState({ isDeleteDropdownVisible: false })}
              isDropdownVisible={isDeleteDropdownVisible}
              textToMatch={name}
              type={type.toLowerCase()}/>}
        </ActionsContainer>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureColumnItem.propTypes = {
  deleteItem: func,
  icon: string,
  id: number,
  isActive: bool,
  onClick: func,
  name: string,
  updateItem: func,
  type: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  cursor: pointer;
  padding: 0.7vh 1vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${ props => props.isActive ? colors.SETTINGS_STRUCTURE_COLUMN_ITEM_BACKGROUND_ACTIVE : colors.SETTINGS_STRUCTURE_COLUMN_ITEM_BACKGROUND_INACTIVE };
  &:hover {
    background-color: ${ colors.SETTINGS_STRUCTURE_COLUMN_ITEM_BACKGROUND_ACTIVE };
  }
`

const NameContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`

const IconContainer = styled.div`
  margin-right: 0.5rem;
`

const Name = styled(ContentEditable)`
  white-space: nowrap;
`

const ActionsContainer = styled.div`
  z-index: 10;
  height: 100%;
`

const Ellipsis = styled.div`
  height: 100%;
  white-space: nowrap;
`