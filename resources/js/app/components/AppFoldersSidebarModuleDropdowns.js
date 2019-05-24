//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import CreateModuleDropdown from './CreateModuleDropdown'
import DeleteDropdown from './DeleteDropdown'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppFolderSidebarModuleDropdowns = ({
  closeDropdowns,
  deleteModule,
  dropdownLeft,
  dropdownTop,
  moduleName,
  isDeleteDropdownVisible,
  isDropdownVisible,
  openDeleteDropdown,
  toggleModuleIsRenaming
}) => {
  return (
    <Container>
      {isDropdownVisible && 
        <Dropdown
          closeDropdown={closeDropdowns}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          isDropdownVisible={isDropdownVisible}>
          <DropdownItem
            onClick={toggleModuleIsRenaming}
            text="Rename"/>
          <DropdownItem
            onClick={openDeleteDropdown}
            text="Delete"/>
        </Dropdown>}
      {isDeleteDropdownVisible && 
        <DeleteDropdown
          closeDropdown={closeDropdowns}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          isDropdownVisible={isDeleteDropdownVisible}
          onDelete={deleteModule}
          textToMatch={moduleName}
          type="module"/>}
    </Container>
  )
}

AppFolderSidebarModuleDropdowns.propTypes = {
  closeDropdowns: func,
  deleteModule: func,
  dropdownLeft: string,
  dropdownTop: string,
  moduleName: string,
  isDeleteDropdownVisible: bool,
  isDropdownVisible: bool,
  openDeleteDropdown: func,
  toggleModuleIsRenaming: func,
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;`

export default AppFolderSidebarModuleDropdowns