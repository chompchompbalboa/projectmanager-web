//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppFolderSidebarFolderDropdowns = ({
  closeFolderDropdown,
  closeDeleteDropdown,
  closeFolderCreateModuleDropdown,
  dropdownLeft,
  dropdownTop,
  isFolderDropdownVisible,
  isFolderDeleteDropdownVisible,
  isFolderCreateModuleDropdownVisible
}) => {
  return (
    <Container>
      {isFolderDropdownVisible && 
        <Dropdown
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          isDropdownVisible={isFolderDropdownVisible}
          closeDropdown={closeFolderDropdown}>
          <DropdownItem
            text="Rename"/>
          <DropdownItem
            text="Delete"/>
        </Dropdown>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;`

export default AppFolderSidebarFolderDropdowns