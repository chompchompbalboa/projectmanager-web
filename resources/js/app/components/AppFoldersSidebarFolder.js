//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import { 
  deleteFolder as deleteFolderAction,
  updateFolder as updateFolderAction 
} from '../redux/folder/folderActions'

import AppFoldersSidebarFolderDropdowns from './AppFoldersSidebarFolderDropdowns'
import AppFoldersSidebarModule from './AppFoldersSidebarModule'
import ContentEditable from './ContentEditable'
import Icon from './Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  deleteFolder: (parentFolderId, folderId) => dispatch(deleteFolderAction(parentFolderId, folderId)),
  updateFolder: (id, updates) => dispatch(updateFolderAction(id, updates))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppFoldersSidebarFolder extends Component {

  initialState = {
    dropdownLeft: null,
    dropdownTop: null,
    folderName: this.props.folder.name,
    isFolderCreateModuleDropdownVisible: false,
    isFolderDropdownVisible: false,
    isFolderDeleteDropdownVisible: false,
    isFolderItemsVisible: false,
    isFolderRenaming: false
  }

  state = this.initialState

  closeDropdowns = () => {
    this.setState(this.initialState)
  }

  handleFolderInfoContextMenu = e => {
    e.preventDefault()
    this.setState({
      dropdownLeft: e.pageX + 'px',
      dropdownTop: e.pageY + 'px',
      isFolderDropdownVisible: true
    })
  }

  handleFolderNameBlur = () => {
    const {
      folder,
      updateFolder
    } = this.props
    const {
      folderName
    } = this.state
    updateFolder(folder.id, { name: folderName })
    this.setState({
      isFolderRenaming: false
    })
  }

  render() {
    const {
      deleteFolder,
      folder,
      folders,
      level,
      modules,
      parentFolderId,
      updateFolder
    } = this.props
    const {
      dropdownLeft,
      dropdownTop,
      folderName,
      isFolderCreateModuleDropdownVisible,
      isFolderDeleteDropdownVisible,
      isFolderDropdownVisible,
      isFolderItemsVisible,
      isFolderRenaming
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
          <FolderName
            focus={isFolderRenaming}
            editable={isFolderRenaming}
            id={folder.id}
            isFolderRenaming={isFolderRenaming}
            onBlur={() => this.handleFolderNameBlur()}
            onChange={(e, value) => this.setState({ folderName: value })}
            value={folderName}/>
        </FolderInfo>
        <AppFoldersSidebarFolderDropdowns 
          closeDropdowns={this.closeDropdowns}
          deleteFolder={() => deleteFolder(parentFolderId, folder.id)}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          folderName={folder.name}
          isFolderDropdownVisible={isFolderDropdownVisible}
          isFolderDeleteDropdownVisible={isFolderDeleteDropdownVisible}
          isFolderCreateModuleDropdownVisible={isFolderCreateModuleDropdownVisible}
          openFolderDeleteDropdown={() => this.setState({ isFolderDropdownVisible: false, isFolderDeleteDropdownVisible: true })}
          toggleFolderIsRenaming={() => this.setState({ isFolderDropdownVisible: false, isFolderRenaming: !isFolderRenaming })}/>
        <FolderItems
          isFolderItemsVisible={isFolderItemsVisible}>
          <FolderSubfolders>
            {folder.folders && folder.folders.map(subFolderId => (
              <AppFoldersSidebarFolder
                key={subFolderId}
                deleteFolder={deleteFolder}
                folder={folders[subFolderId]}
                folders={folders}
                level={level + 1}
                modules={modules}
                parentFolderId={folder.id}
                updateFolder={updateFolder}/>
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
  deleteFolder: func,
  folder: shape({
    name: string,
    folders: array,
    modules: array
  }),
  folders: object,
  level: number,
  modules: object,
  parentFolderId: string,
  updateFolder: func
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

const FolderName = styled(ContentEditable)`
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

export default connect(
  null,
  mapDispatchToProps
)(AppFoldersSidebarFolder)