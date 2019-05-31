//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, bool, func, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import { 
  copyFolder as copyFolderAction,
  createFolder as createFolderAction,
  createModule as createModuleAction,
  cutFolder as cutFolderAction,
  deleteFolder as deleteFolderAction,
  pasteIntoFolder as pasteIntoFolderAction,
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
  copyFolder: folder => dispatch(copyFolderAction(folder)),
  createFolder: parentFolderId => dispatch(createFolderAction(parentFolderId)),
  createModule: (folderId, type) => dispatch(createModuleAction(folderId, type)),
  cutFolder: folder => dispatch(cutFolderAction(folder)),
  deleteFolder: (parentFolderId, folderId) => dispatch(deleteFolderAction(parentFolderId, folderId)),
  pasteIntoFolder: pasteFolderId => dispatch(pasteIntoFolderAction(pasteFolderId)),
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
    isFolderRenaming: this.props.folder.isFolderRenaming || false
  }

  state = this.initialState

  closeDropdowns = () => {
    this.setState(this.initialState)
  }
  
  copyFolder = folderId => {
    const {
      copyFolder
    } = this.props
    copyFolder(folderId)
    this.setState({
      isFolderDropdownVisible: false
    })
  }
  
  cutFolder = folderId => {
    const {
      cutFolder
    } = this.props
    cutFolder(folderId)
    this.setState({
      isFolderDropdownVisible: false
    })
  }

  createFolder = parentFolderId => {
    const {
      createFolder
    } = this.props
    createFolder(parentFolderId)
    this.setState({
      isFolderDropdownVisible: false,
      isFolderItemsVisible: true
    })
  }

  createModule = (folderId, type) => {
    const {
      createModule
    } = this.props
    createModule(folderId, type)
    this.setState({
      isFolderCreateModuleDropdownVisible: false,
      isFolderItemsVisible: true
    })
  }

  handleFolderInfoClick = () => {
    const {
      isFolderItemsVisible
    } = this.state
    this.setState({ 
      isFolderItemsVisible: !isFolderItemsVisible 
    })
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
  
  pasteIntoFolder = pasteFolderId => {
    const {
      pasteIntoFolder
    } = this.props
    pasteIntoFolder(pasteFolderId)
    this.setState({
      isFolderDropdownVisible: false
    })
  }

  render() {
    const {
      createFolder,
      createModule,
      deleteFolder,
      folder,
      folderPath,
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
          isDropdownVisible={isFolderCreateModuleDropdownVisible || isFolderDeleteDropdownVisible || isFolderDropdownVisible}
          level={level}
          onClick={() => this.handleFolderInfoClick()}
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
          copyFolder={() => this.copyFolder(folder.id)}
          createFolder={() => this.createFolder(folder.id)}
          createModule={type => this.createModule(folder.id, type)}
          cutFolder={() => this.cutFolder(folder.id)}
          deleteFolder={() => deleteFolder(parentFolderId, folder.id)}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          folderName={folder.name}
          isFolderDropdownVisible={isFolderDropdownVisible}
          isFolderDeleteDropdownVisible={isFolderDeleteDropdownVisible}
          isFolderCreateModuleDropdownVisible={isFolderCreateModuleDropdownVisible}
          openFolderDeleteDropdown={() => this.setState({ isFolderDropdownVisible: false, isFolderDeleteDropdownVisible: true })}
          openFolderCreateModuleDropdown={() => this.setState({ isFolderDropdownVisible: false, isFolderCreateModuleDropdownVisible: true })}
          pasteIntoFolder={() => this.pasteIntoFolder(folder.id)}
          toggleFolderIsRenaming={() => this.setState({ isFolderDropdownVisible: false, isFolderRenaming: !isFolderRenaming })}/>
        <FolderItems
          isFolderItemsVisible={isFolderItemsVisible}>
          <FolderSubfolders>
            {folder.folders && folder.folders.map(subFolderId => (
              <AppFoldersSidebarFolder
                key={subFolderId}
                copyFolder={this.copyFolder}
                cutFolder={this.cutFolder}
                createFolder={createFolder}
                createModule={createModule}
                deleteFolder={deleteFolder}
                folder={folders[subFolderId]}
                folderPath={[...folderPath, subFolderId]}
                folders={folders}
                level={level + 1}
                modules={modules}
                parentFolderId={folder.id}
                pasteIntoFolder={this.pasteIntoFolder}
                updateFolder={updateFolder}/>
            ))}
          </FolderSubfolders>
          <FolderModules>
            {folder.modules && folder.modules.map(moduleId => (
              <AppFoldersSidebarModule 
                key={moduleId}
                folderPath={[...folderPath, moduleId]}
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
  copyFolder: func,
  createFolder: func,
  createModule: func,
  deleteFolder: func,
  folder: shape({
    name: string,
    folders: array,
    modules: array
  }),
  folderPath: array,
  folders: object,
  isFolderRenaming: bool,
  level: number,
  modules: object,
  parentFolderId: string,
  pasteIntoFolder: func,
  updateActiveFolderPath: func,
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
  padding-left: ${ props => (props.level / 3) + 'rem' };
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  color: ${ props => props.isDropdownVisible ? colors.TEXT_BLACK : 'inherit' };
  background-color: ${ props => props.isDropdownVisible ? colors.SIDEBAR_BACKGROUND_ACTIVE : 'transparent' };
  border-left: 5px solid ${ props => props.isDropdownVisible ? colors.SIDEBAR_BORDER_ACTIVE : 'transparent' };
  &:hover {
    color: ${ colors.TEXT_BLACK };
    background-color: ${ colors.SIDEBAR_BACKGROUND_ACTIVE };
    border-left: 5px solid ${ colors.SIDEBAR_BORDER_ACTIVE };
  }
`

const FolderName = styled(ContentEditable)`
  width: 100%;
  overflow-x: hidden;
  user-select: none;
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