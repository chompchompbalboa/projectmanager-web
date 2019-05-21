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
const AppFolderSidebarFolderDropdowns = ({
  closeDropdowns,
  deleteFolder,
  dropdownLeft,
  dropdownTop,
  folderName,
  isFolderDropdownVisible,
  isFolderDeleteDropdownVisible,
  isFolderCreateModuleDropdownVisible,
  openFolderDeleteDropdown,
  toggleFolderIsRenaming
}) => {
  return (
    <Container>
      {isFolderDropdownVisible && 
        <Dropdown
          closeDropdown={closeDropdowns}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          isDropdownVisible={isFolderDropdownVisible}>
          <DropdownItem
            onClick={toggleFolderIsRenaming}
            text="Rename"/>
          <DropdownItem
            onClick={openFolderDeleteDropdown}
            text="Delete"/>
        </Dropdown>}
      {isFolderDeleteDropdownVisible && 
        <DeleteDropdown
          closeDropdown={closeDropdowns}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          isDropdownVisible={isFolderDeleteDropdownVisible}
          onDelete={deleteFolder}
          textToMatch={folderName}/>}
      {isFolderCreateModuleDropdownVisible && 
        <CreateModuleDropdown
          closeDropdown={closeDropdowns}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          isDropdownVisible={isFolderCreateModuleDropdownVisible}
          createDropdown={() => console.log('createModule')}/>}
    </Container>
  )
}

AppFolderSidebarFolderDropdowns.propTypes = {
  closeDropdowns: func,
  dropdownLeft: string,
  dropdownTop: string,
  folderName: string,
  isFolderDropdownVisible: bool,
  isFolderDeleteDropdownVisible: bool,
  isFolderCreateModuleDropdownVisible: bool,
  openFolderDeleteDropdown: func,
  toggleFolderIsRenaming: func,
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;`

export default AppFolderSidebarFolderDropdowns