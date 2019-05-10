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

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructureColumn extends Component {

  state = {
    isHeaderDropdownVisible: false
  }

  handleAddClick = () => {
    const {
      addItem
    } = this.props
    this.setState({
      isHeaderDropdownVisible: false
    })
    addItem()
  }
  
  render() {
    const { 
      children, 
      isVisible,
      header,
      width
    } = this.props
    const {
      isHeaderDropdownVisible
    } = this.state
    return (
      <Container
        isVisible={isVisible}
        width={width}>
        {isVisible &&
          <Header>
            <HeaderText>
              {header}
            </HeaderText>
            <Ellipsis
              onClick={() => this.setState({ isHeaderDropdownVisible: !isHeaderDropdownVisible })}>
              . . .
              <Dropdown
                closeDropdown={() => this.setState({ isHeaderDropdownVisible: false })}
                isDropdownVisible={isHeaderDropdownVisible}>
                <DropdownItem
                  onClick={() => this.handleAddClick()}
                  text="Add New"/>
                <DropdownItem
                  onClick={() => null}
                  text="Create Template"/>
              </Dropdown>
            </Ellipsis>
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
  isVisible: bool,
  hasBorder: bool,
  header: string,
  width: string
}

AppSettingsStructureColumn.defaultProps = {
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
  overflow-y: scroll;
  border-right: 1px dashed ${ props => props.isVisible ? colors.SETTINGS_STRUCTURE_COLUMN_BORDER : 'transparent' };
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

const Ellipsis = styled.div`
  cursor: pointer;
  padding: 1vh calc(1vw - 5px) 1vh 1vw;
`

export default AppSettingsStructureColumn