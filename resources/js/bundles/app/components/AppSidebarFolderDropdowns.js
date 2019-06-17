//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, number, string } from 'prop-types'
import styled from 'styled-components'

import CreateFileDropdown from './CreateFileDropdown'
import DeleteDropdown from './DeleteDropdown'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSidebarFolderDropdowns = ({
  closeDropdowns,
  copyFolder,
  createFolder,
  createFile,
  cutFolder,
  deleteFolder,
  dropdownLeft,
  dropdownTop,
  folderName,
  isFolderDropdownVisible,
  isFolderDeleteDropdownVisible,
  isFolderCreateFileDropdownVisible,
  level,
  openFolderCreateFileDropdown,
  openFolderDeleteDropdown,
  pasteIntoFolder,
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
            onClick={openFolderCreateFileDropdown}
            text="New File"/>
          <DropdownItem
            onClick={createFolder}
            text="New Folder"/>
          {level > 1 && // Don't let the user cut or copy the root folders
          <>
          <DropdownItem
            onClick={copyFolder}
            text="Copy"/>
          <DropdownItem
            onClick={cutFolder}
            text="Cut"/>
          </>
          }
          <DropdownItem
            onClick={pasteIntoFolder}
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
      {isFolderCreateFileDropdownVisible && 
        <CreateFileDropdown
          closeDropdown={closeDropdowns}
          createFile={createFile}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          isDropdownVisible={isFolderCreateFileDropdownVisible}/>}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSidebarFolderDropdowns.propTypes = {
  closeDropdowns: func,
  copyFolder: func,
  createFolder: func,
  createFile: func,
  cutFolder: func,
  deleteFolder: func,
  dropdownLeft: string,
  dropdownTop: string,
  folderName: string,
  isFolderDropdownVisible: bool,
  isFolderDeleteDropdownVisible: bool,
  isFolderCreateFileDropdownVisible: bool,
  level: number,
  openFolderCreateFileDropdown: func,
  openFolderDeleteDropdown: func,
  pasteIntoFolder: func,
  toggleFolderIsRenaming: func,
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;`

export default AppSidebarFolderDropdowns