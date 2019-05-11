//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func } from 'prop-types'

import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ModuleTypeDropdown = ({
  closeDropdown,
  isDropdownVisible,
  onModuleTypeClick,
  ...props
}) => {

  const handleModuleTypeClick = type => {
    closeDropdown()
    onModuleTypeClick(type)
  }

  return (
    <Dropdown
      closeDropdown={closeDropdown}
      isDropdownVisible={isDropdownVisible}
      {...props}>
      <DropdownItem
        onClick={() => handleModuleTypeClick('TABLE')}
        text="Table">
      </DropdownItem>
    </Dropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ModuleTypeDropdown.propTypes = {
  closeDropdown: func,
  isDropdownVisible: bool,
  onModuleTypeClick: func
}

export default ModuleTypeDropdown