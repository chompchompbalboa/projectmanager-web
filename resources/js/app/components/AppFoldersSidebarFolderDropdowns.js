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
  copyFolder,
  createFolder,
  createModule,
  deleteFolder,
  dropdownLeft,
  dropdownTop,
  folderName,
  isFolderDropdownVisible,
  isFolderDeleteDropdownVisible,
  isFolderCreateModuleDropdownVisible,
  openFolderCreateModuleDropdown,
  openFolderDeleteDropdown,
  pasteFolder,
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
            onClick={openFolderCreateModuleDropdown}
            text="New File"/>
          <DropdownItem
            onClick={createFolder}
            text="New Folder"/>
          <DropdownItem
            onClick={copyFolder}
            text="Copy"/>
          <DropdownItem
            onClick={pasteFolder}
            text="Paste"/>
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
          textToMatch={folderName}
          type="folder"/>}
      {isFolderCreateModuleDropdownVisible && 
        <CreateModuleDropdown
          closeDropdown={closeDropdowns}
          createModule={createModule}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          isDropdownVisible={isFolderCreateModuleDropdownVisible}/>}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppFolderSidebarFolderDropdowns.propTypes = {
  closeDropdowns: func,
  createFolder: func,
  createModule: func,
  deleteFolder: func,
  dropdownLeft: string,
  dropdownTop: string,
  folderName: string,
  isFolderDropdownVisible: bool,
  isFolderDeleteDropdownVisible: bool,
  isFolderCreateModuleDropdownVisible: bool,
  openFolderCreateModuleDropdown: func,
  openFolderDeleteDropdown: func,
  toggleFolderIsRenaming: func,
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;`

export default AppFolderSidebarFolderDropdowns