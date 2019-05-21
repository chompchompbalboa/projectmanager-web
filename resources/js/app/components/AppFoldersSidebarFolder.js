//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, number, object, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config'

import AppFoldersSidebarFolderDropdowns from './AppFoldersSidebarFolderDropdowns'
import AppFoldersSidebarModule from './AppFoldersSidebarModule'
import Icon from './Icon'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppFoldersSidebarFolder extends Component {

  state = {
    dropdownLeft: null,
    dropdownTop: null,
    isFolderCreateModuleDropdownVisible: false,
    isFolderDropdownVisible: false,
    isFolderDeleteDropdownVisible: false,
    isFolderItemsVisible: false
  }

  handleFolderInfoContextMenu = e => {
    e.preventDefault()
    this.setState({
      dropdownLeft: e.pageX + 'px',
      dropdownTop: e.pageY + 'px',
      isFolderDropdownVisible: true
    })
  }

  render() {
    const {
      folder,
      folders,
      level,
      modules
    } = this.props
    const {
      dropdownLeft,
      dropdownTop,
      isFolderCreateModuleDropdownVisible,
      isFolderDeleteDropdownVisible,
      isFolderDropdownVisible,
      isFolderItemsVisible
    } = this.state
    return (
      <Container>
        <FolderInfo
          level={level}
          onClick={() => this.setState({ isFolderItemsVisible: !isFolderItemsVisible })}
          onContextMenu={e => this.handleFolderInfoContextMenu(e)}>
          <Icon
            icon={isFolderItemsVisible ? "FOLDER_OPEN" : "FOLDER_CLOSED"}
            size="1rem"/>
          <FolderName>
            {folder.name}
          </FolderName>
        </FolderInfo>
        <AppFoldersSidebarFolderDropdowns 
          closeFolderDropdown={() => this.setState({ isFolderDropdownVisible: false })}
          closeFolderDeleteDropdown={() => this.setState({ isFolderDeleteDropdownVisible: false })}
          closeFolderCreateModuleDropdown={() => this.setState({ isFolderCreateModuleDropdownVisible: false })}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          isFolderDropdownVisible={isFolderDropdownVisible}
          isFolderDeleteDropdownVisible={isFolderDeleteDropdownVisible}
          isFolderCreateModuleDropdownVisible={isFolderCreateModuleDropdownVisible}/>
        <FolderItems
          isFolderItemsVisible={isFolderItemsVisible}>
          <FolderSubfolders>
            {folder.folders && folder.folders.map(subFolderId => (
              <AppFoldersSidebarFolder
                key={subFolderId}
                folder={folders[subFolderId]}
                folders={folders}
                level={level + 1}
                modules={modules}/>
            ))}
          </FolderSubfolders>
          <FolderModules>
            {folder.modules && folder.modules.map(moduleId => (
              <AppFoldersSidebarModule 
                key={moduleId}
                level={level + 1}
                module={modules[moduleId]}/>
            ))}
          </FolderModules>
        </FolderItems>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppFoldersSidebarFolder.propTypes = {
  folder: shape({
    name: string,
    folders: array,
    modules: array
  }),
  folders: object,
  level: number,
  modules: object
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;
`

const FolderInfo = styled.div`
  padding: 0.25rem;
  padding-left: ${ props => (props.level / 2) + 'rem' };
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  &:hover {
    background-color: ${ colors.SIDEBAR_BACKGROUND_ACTIVE };
  }
`

const FolderName = styled.div`
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const FolderItems = styled.div`
  display: ${ props => props.isFolderItemsVisible ? 'block' : 'none' };
`

const FolderSubfolders = styled.div``

const FolderModules = styled.div``