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
  createFile as createFileAction,
  cutFolder as cutFolderAction,
  deleteFolder as deleteFolderAction,
  pasteIntoFolder as pasteIntoFolderAction,
  updateClipboard as updateClipboardAction,
  updateFolder as updateFolderAction 
} from '../redux/folder/folderActions'

import AppFoldersSidebarFolderDropdowns from './AppFoldersSidebarFolderDropdowns'
import AppFoldersSidebarFile from './AppFoldersSidebarFile'
import ContentEditable from './ContentEditable'
import Icon from './Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  copyFolder: folder => dispatch(copyFolderAction(folder)),
  createFolder: parentFolderId => dispatch(createFolderAction(parentFolderId)),
  createFile: (folderId, type) => dispatch(createFileAction(folderId, type)),
  cutFolder: folderId => dispatch(cutFolderAction(folderId)),
  deleteFolder: (parentFolderId, folderId) => dispatch(deleteFolderAction(parentFolderId, folderId)),
  pasteIntoFolder: pasteFolderId => dispatch(pasteIntoFolderAction(pasteFolderId)),
  updateClipboard: (cutOrCopy, itemType, itemId) => dispatch(updateClipboardAction(cutOrCopy, itemType, itemId)),
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
    isFolderBeingCopied: this.props.folder.isFolderBeingCopied || false,
    isFolderCreateFileDropdownVisible: false,
    isFolderDropdownVisible: false,
    isFolderDeleteDropdownVisible: false,
    isFolderItemsVisible: false,
    isFolderRenaming: this.props.folder.isFolderRenaming || false
  }

  state = this.initialState

  closeDropdowns = () => {
    this.setState({
      isFolderCreateFileDropdownVisible: false,
      isFolderDropdownVisible: false,
      isFolderDeleteDropdownVisible: false
    })
  }
  
  copyFolder = folderId => {
    const {
      updateClipboard
    } = this.props
    this.closeDropdowns()
    updateClipboard('COPY', 'FOLDER', folderId)
  }
  
  cutFolder = folderId => {
    const {
      updateClipboard
    } = this.props
    this.closeDropdowns()
    updateClipboard('CUT', 'FOLDER', folderId)
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

  createFile = (folderId, type) => {
    const {
      createFile
    } = this.props
    createFile(folderId, type)
    this.setState({
      isFolderCreateFileDropdownVisible: false,
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
      createFile,
      deleteFolder,
      folder,
      folderPath,
      folders,
      level,
      files,
      parentFolderId,
      updateClipboard,
      updateFolder
    } = this.props
    const {
      dropdownLeft,
      dropdownTop,
      folderName,
      isFolderBeingCopied,
      isFolderCreateFileDropdownVisible,
      isFolderDeleteDropdownVisible,
      isFolderDropdownVisible,
      isFolderItemsVisible,
      isFolderRenaming
    } = this.state
    return (
      <Container>
        <FolderInfo
          isDropdownVisible={isFolderCreateFileDropdownVisible || isFolderDeleteDropdownVisible || isFolderDropdownVisible}
          level={level}
          onClick={!isFolderBeingCopied ? () => this.handleFolderInfoClick() : null}
          onContextMenu={!isFolderBeingCopied ? e => this.handleFolderInfoContextMenu(e) : null}>
          <Icon
            icon={isFolderItemsVisible ? "FOLDER_OPEN" : "FOLDER_CLOSED"}
            size="1.5rem"/>
          <FolderName
            focus={isFolderRenaming}
            editable={isFolderRenaming}
            id={folder.id}
            onBlur={() => this.handleFolderNameBlur()}
            onChange={(e, value) => this.setState({ folderName: value })}
            value={isFolderBeingCopied ? 'Copying...' : folderName}/>
        </FolderInfo>
        <AppFoldersSidebarFolderDropdowns 
          closeDropdowns={this.closeDropdowns}
          copyFolder={() => this.copyFolder(folder.id)}
          createFolder={() => this.createFolder(folder.id)}
          createFile={type => this.createFile(folder.id, type)}
          cutFolder={() => this.cutFolder(folder.id)}
          deleteFolder={() => deleteFolder(parentFolderId, folder.id)}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          folderName={folder.name}
          isFolderDropdownVisible={isFolderDropdownVisible}
          isFolderDeleteDropdownVisible={isFolderDeleteDropdownVisible}
          isFolderCreateFileDropdownVisible={isFolderCreateFileDropdownVisible}
          level={level}
          openFolderDeleteDropdown={() => this.setState({ isFolderDropdownVisible: false, isFolderDeleteDropdownVisible: true })}
          openFolderCreateFileDropdown={() => this.setState({ isFolderDropdownVisible: false, isFolderCreateFileDropdownVisible: true })}
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
                createFile={createFile}
                deleteFolder={deleteFolder}
                folder={folders[subFolderId]}
                folderPath={[...folderPath, subFolderId]}
                folders={folders}
                level={level + 1}
                files={files}
                parentFolderId={folder.id}
                pasteIntoFolder={this.pasteIntoFolder}
                updateClipboard={updateClipboard}
                updateFolder={updateFolder}/>
            ))}
          </FolderSubfolders>
          <FolderFiles>
            {folder.files && folder.files.map(fileId => (
              <AppFoldersSidebarFile 
                key={fileId}
                folderPath={[...folderPath, fileId]}
                level={level + 1}
                file={files[fileId]}/>
            ))}
          </FolderFiles>
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
  createFile: func,
  deleteFolder: func,
  folder: shape({
    name: string,
    folders: array,
    files: array
  }),
  folderPath: array,
  folders: object,
  isFolderRenaming: bool,
  level: number,
  files: object,
  parentFolderId: string,
  pasteIntoFolder: func,
  updateActiveFolderPath: func,
  updateClipboard: func,
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

const FolderFiles = styled.div``

export default connect(
  null,
  mapDispatchToProps
)(AppFoldersSidebarFolder)