//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func } from 'prop-types'
import styled from 'styled-components'

import icons from './icons'

import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import Icon from './Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ChangeIconDropdown = ({
  closeDropdown,
  isDropdownVisible,
  onIconClick
}) => {
  return (
    <Dropdown
      closeDropdown={closeDropdown}
      isDropdownVisible={isDropdownVisible}>
      <IconsContainer>
        {Object.keys(icons).map(iconKey => (
          <DropdownItem
            key={iconKey}
            onClick={() => onIconClick(iconKey)}>
            <IconContainer>
              <Icon
                icon={iconKey}/>
              <IconName>
                {iconKey}
              </IconName>
            </IconContainer>
          </DropdownItem>
        ))}
      </IconsContainer>
    </Dropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ChangeIconDropdown.propTypes = {
  closeDropdown: func,
  isDropdownVisible: bool,
  onIconClick: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const IconsContainer = styled.div`
  color: white;
  max-height: 50vh;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`

const IconName = styled.div`
  margin-left: 0.75vw;
`

export default ChangeIconDropdown