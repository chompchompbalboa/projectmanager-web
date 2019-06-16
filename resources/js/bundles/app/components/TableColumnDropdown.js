//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'

import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableColumnDropdown = ({
  closeDropdown,
  dropdownLeft,
  dropdownTop,
  isDropdownVisible,
  openDeleteDropdown
}) => {
  return (
    <Dropdown
      closeDropdown={closeDropdown}
      dropdownLeft={dropdownLeft}
      dropdownTop={dropdownTop}
      isDropdownVisible={isDropdownVisible}>
      <DropdownItem
        onClick={() => openDeleteDropdown()}
        text="Delete"/>
    </Dropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableColumnDropdown.propTypes = {
  closeDropdown: func,
  dropdownLeft: string,
  dropdownTop: string,
  isDropdownVisible: bool,
  openDeleteDropdown: func
}

export default TableColumnDropdown