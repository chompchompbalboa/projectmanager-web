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
const CreateFileDropdown = ({
  closeDropdown,
  createFile,
  isDropdownVisible,
  ...props
}) => {

  const files = [
    { name: 'Table', type: 'TABLE' },
    { name: 'Note', type: 'NOTE' },
    { name: 'Calendar', type: 'CALENDAR' }
  ]
  return (
    <Dropdown
      closeDropdown={closeDropdown}
      isDropdownVisible={isDropdownVisible}
      {...props}>
      <FilesContainer>
        {files.map(file => (
          <DropdownItem
            key={file.type}
            onClick={() => createFile(file.type)}>
            <FileContainer>
              <Icon
                icon={'FILE_' + file.type}
                size="0.9rem"/>
              <FileName>
                {file.name}
              </FileName>
            </FileContainer>
          </DropdownItem>
        ))}
      </FilesContainer>
    </Dropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
CreateFileDropdown.propTypes = {
  closeDropdown: func,
  createFile: func,
  isDropdownVisible: bool
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const FilesContainer = styled.div`
  max-height: 50vh;
`

const FileContainer = styled.div`
  display: flex;
  align-items: center;
`

const FileName = styled.div`
  margin-left: 0.75vw;
`

export default CreateFileDropdown