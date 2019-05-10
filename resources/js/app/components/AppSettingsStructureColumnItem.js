//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, number, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config' 

import ContentEditable from './ContentEditable'
import ChangeIconDropdown from './ChangeIconDropdown'
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
    isIconDropdownVisible: false,
    isItemRenaming: this.props.isItemRenaming ? this.props.isItemRenaming : false,
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
      isDropdownsRightAligned,
      onClick,
      type,
      updateItem
    } = this.props
    const {
      isActionsDropdownVisible,
      isIconDropdownVisible,
      isDeleteDropdownVisible,
      isItemRenaming,
      name
    } = this.state
    return (
      <Container
        isActive={isActive}>
        <NameContainer
          onClick={onClick}>
          {icon && 
            <IconContainer>
              <Icon icon={icon}/>
            </IconContainer>
          }
          <Name
            focus={isItemRenaming}
            editable={isItemRenaming}
            id={id}
            isItemRenaming={isItemRenaming}
            onBlur={() => this.handleNameBlur()}
            onChange={(e, value) => this.setState({ name: value })}
            value={name}/>
        </NameContainer>
        <ActionsContainer>
          <Ellipsis
            onClick={() => this.setState({ isActionsDropdownVisible: !isActionsDropdownVisible })}>
            . . .
            {isActionsDropdownVisible && 
              <Dropdown
                closeDropdown={() => this.setState({ isActionsDropdownVisible: false })}
                isDropdownVisible={isActionsDropdownVisible}
                isRightAligned={isDropdownsRightAligned}>
                <DropdownItem
                  onClick={() => this.setState({ isActionsDropdownVisible: false, isItemRenaming: true })}
                  text="Rename"/>
                <DropdownItem
                  onClick={() => this.setState({ isActionsDropdownVisible: false, isDeleteDropdownVisible: true })}
                  text="Delete"/>
                {icon && 
                  <DropdownItem
                    onClick={() => this.setState({ isActionsDropdownVisible: false, isIconDropdownVisible: true })}
                    text="Change Icon"/>}
              </Dropdown>}
            {isDeleteDropdownVisible &&
              <DeleteDropdown
                onDelete={() => deleteItem(id)}
                closeDropdown={() => this.setState({ isDeleteDropdownVisible: false })}
                isDropdownVisible={isDeleteDropdownVisible}
                isRightAligned={isDropdownsRightAligned}
                textToMatch={name}
                type={type.toLowerCase()}/>}
            {icon && isIconDropdownVisible &&
              <ChangeIconDropdown
                closeDropdown={() => this.setState({ isIconDropdownVisible: false })}
                isDropdownVisible={isIconDropdownVisible}
                isRightAligned={isDropdownsRightAligned}
                onIconClick={icon => updateItem(id, { icon: icon })}/>}
          </Ellipsis>
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
  isDropdownsRightAligned: bool,
  isItemRenaming: bool,
  onClick: func,
  name: string,
  updateItem: func,
  type: string
}

AppSettingsStructureColumnItem.defaultProps = {
  isDropdownsRightAligned: false
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  cursor: pointer;
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
  padding: 0.7vh 0 0.7vh 1vw;
  height: 100%;
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
  height: 100%;
`

const Ellipsis = styled.div`
  padding: 0.7vh 1vw 0.7vh;
  height: 100%;
  white-space: nowrap;
`