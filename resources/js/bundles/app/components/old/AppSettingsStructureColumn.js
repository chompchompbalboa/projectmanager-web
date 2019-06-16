//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import HiddenScrollbarContainer from './HiddenScrollbarContainer'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import ModuleTypeDropdown from './ModuleTypeDropdown'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructureColumn extends Component {

  state = {
    isHeaderDropdownVisible: false,
    isModuleTypeDropdownVisible: false
  }

  handleAddClick = () => {
    const {
      addItem,
      isModules
    } = this.props
    if(isModules) {
      this.setState({
        isHeaderDropdownVisible: false,
        isModuleTypeDropdownVisible: true
      })
    }
    else {
      this.setState({
        isHeaderDropdownVisible: false
      })
      addItem()
    }
  }
  
  render() {
    const { 
      addItem,
      children, 
      isDropdownsRightAligned,
      isVisible,
      hasBorder,
      header,
      width
    } = this.props
    const {
      isModuleTypeDropdownVisible,
      isHeaderDropdownVisible
    } = this.state
    return (
      <Container
        hasBorder={hasBorder}
        isVisible={isVisible}
        width={width}>
        {isVisible &&
          <Header>
            <HeaderText>
              {header}
            </HeaderText>
            <ActionsContainer>
              <Ellipsis
                onClick={() => this.setState({ isHeaderDropdownVisible: !isHeaderDropdownVisible })}>
                . . .
              </Ellipsis>
              {isHeaderDropdownVisible && 
                <Dropdown
                  closeDropdown={() => this.setState({ isHeaderDropdownVisible: false })}
                  isDropdownVisible={isHeaderDropdownVisible}
                  isRightAligned={isDropdownsRightAligned}>
                  <DropdownItem
                    onClick={() => this.handleAddClick()}
                    text="Add New"/>
                  <DropdownItem
                    onClick={() => null}
                    text="Create Template"/>
                </Dropdown>
              }
              {isModuleTypeDropdownVisible && 
                <ModuleTypeDropdown
                  closeDropdown={() => this.setState({ isModuleTypeDropdownVisible: false })}
                  isDropdownVisible={isModuleTypeDropdownVisible}
                  isRightAligned={true}
                  onModuleTypeClick={type => addItem(type)}/>
              }
            </ActionsContainer>
          </Header>
        }
        {children}
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureColumn.propTypes = {
  addItem: func,
  isDropdownsRightAligned: bool,
  isModules: bool,
  isVisible: bool,
  hasBorder: bool,
  header: string,
  width: string
}

AppSettingsStructureColumn.defaultProps = {
  isDropdownsRightAligned: false,
  isModules: false,
  isVisible: true,
  hasBorder: true,
  header: "Header",
  width: '17%'
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled(HiddenScrollbarContainer)`
  width: ${ props => props.width };
  height: calc(100vh - ${ layout.CONTAINER_HEADER_HEIGHT });
  overflow-x: visible;
  overflow-y: scroll;
  border-right: 1px dashed ${ props => props.isVisible && props.hasBorder ? colors.SETTINGS_STRUCTURE_COLUMN_BORDER : 'transparent' };
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-right: 5px solid ${ colors.SETTINGS_STRUCTURE_COLUMN_HEADER_BORDER };
`

const HeaderText = styled.h4`
  padding: 1vh 1vw;
`

const ActionsContainer = styled.div`
  height: 100%;
`

const Ellipsis = styled.div`
  height: 100%;
  cursor: pointer;
  padding: 1vh calc(1vw - 5px) 1vh 1vw;
`

export default AppSettingsStructureColumn