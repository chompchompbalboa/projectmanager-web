//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import DeleteDropdown from './DeleteDropdown'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSidebarFileDropdowns = ({
  closeDropdowns,
  copyFile,
  cutFile,
  deleteFile,
  dropdownLeft,
  dropdownTop,
  fileName,
  isDeleteDropdownVisible,
  isDropdownVisible,
  openDeleteDropdown,
  toggleFileIsRenaming
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
            onClick={copyFile}
            text="Copy"/>
          <DropdownItem
            onClick={cutFile}
            text="Cut"/>
          <DropdownItem
            onClick={toggleFileIsRenaming}
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
          onDelete={deleteFile}
          textToMatch={fileName}
          type="file"/>}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSidebarFileDropdowns.propTypes = {
  closeDropdowns: func,
  copyFile: func,
  cutFile: func,
  deleteFile: func,
  dropdownLeft: string,
  dropdownTop: string,
  fileName: string,
  isDeleteDropdownVisible: bool,
  isDropdownVisible: bool,
  openDeleteDropdown: func,
  toggleFileIsRenaming: func,
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;`

export default AppSidebarFileDropdowns