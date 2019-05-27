//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func } from 'prop-types'
import styled from 'styled-components'

import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import Icon from './Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const CreateModuleDropdown = ({
  closeDropdown,
  createModule,
  isDropdownVisible,
  ...props
}) => {

  const modules = [
    { name: 'Table', type: 'TABLE' },
    { name: 'Note', type: 'NOTE' },
    { name: 'Calendar', type: 'CALENDAR' }
  ]
  return (
    <Dropdown
      closeDropdown={closeDropdown}
      isDropdownVisible={isDropdownVisible}
      {...props}>
      <ModulesContainer>
        {modules.map(module => (
          <DropdownItem
            key={module.type}
            onClick={() => createModule(module.type)}>
            <ModuleContainer>
              <Icon
                icon={'MODULE_' + module.type}/>
              <ModuleName>
                {module.name}
              </ModuleName>
            </ModuleContainer>
          </DropdownItem>
        ))}
      </ModulesContainer>
    </Dropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
CreateModuleDropdown.propTypes = {
  closeDropdown: func,
  createModule: func,
  isDropdownVisible: bool
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const ModulesContainer = styled.div`
  max-height: 50vh;
`

const ModuleContainer = styled.div`
  display: flex;
  align-items: center;
`

const ModuleName = styled.div`
  margin-left: 0.75vw;
`

export default CreateModuleDropdown