//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, bool, func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import {
  updateActiveFolderPath as updateActiveFolderPathAction,
  updateActiveFileId as updateActiveFileIdAction
} from '../redux/active/activeActions'
import {
  deleteFile as deleteFileAction,
  updateClipboard as updateClipboardAction,
  updateFile as updateFileAction
} from '../redux/folder/folderActions'
import { selectActiveFileId } from '../redux/active/activeSelectors'

import AppSidebarFileDropdowns from './AppSidebarFileDropdowns'
import ContentEditable from './ContentEditable'
import Icon from './Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeFileId: selectActiveFileId(state)
})

const mapDispatchToProps = dispatch => ({
  deleteFile: (fileId) => dispatch(deleteFileAction(fileId)),
  updateActiveFolderPath: nextActiveFolderPath => dispatch(updateActiveFolderPathAction(nextActiveFolderPath)),
  updateActiveFileId: nextActiveFileId => dispatch(updateActiveFileIdAction(nextActiveFileId)),
  updateClipboard: (cutOrCopy, itemType, itemId) => dispatch(updateClipboardAction(cutOrCopy, itemType, itemId)),
  updateFile: (fileId, updates) => dispatch(updateFileAction(fileId, updates))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSidebarFile extends Component {
  
  state = {
    dropdownLeft: null,
    dropdownTop: null,
    isDeleteDropdownVisible: false,
    isDropdownVisible: false,
    isFileRenaming: this.props.file.isFileRenaming || false,
    fileName: this.props.file.name
  }

  closeDropdowns = () => {
    this.setState({
      isDeleteDropdownVisible: false,
      isDropdownVisible: false
    })
  }
  
  copyFile = fileId => {
    const {
      updateClipboard
    } = this.props
    this.closeDropdowns()
    updateClipboard('COPY', 'FILE', fileId)
  }
  
  cutFile = fileId => {
    const {
      updateClipboard
    } = this.props
    this.closeDropdowns()
    updateClipboard('CUT', 'FILE', fileId)
  }

  handleFileNameBlur = () => {
    const {
      file,
      updateFile
    } = this.props
    const {
      fileName
    } = this.state
    updateFile(file.id, { name: fileName })
    this.setState({ isFileRenaming: false })
  }

  handleFileInfoClick = () => {
    const {
      folderPath,
      file,
      updateActiveFolderPath,
      updateActiveFileId
    } = this.props
    updateActiveFolderPath(folderPath)
    updateActiveFileId(file.id)
  }

  handleFileInfoContextMenu = e => {
    e.preventDefault()
    this.setState({
      dropdownLeft: e.pageX + 'px',
      dropdownTop: e.pageY + 'px',
      isDropdownVisible: true
    })
  }

  render() {
    const {
      activeFileId,
      deleteFile,
      level,
      file
    } = this.props
    const {
      dropdownLeft,
      dropdownTop,
      isDeleteDropdownVisible,
      isDropdownVisible,
      isFileRenaming,
      fileName
    } = this.state
    return (
      <Container>
        <FileInfo
          level={level}
          isActiveFile={activeFileId === file.id}
          onClick={() => this.handleFileInfoClick()}
          onContextMenu={e => this.handleFileInfoContextMenu(e)}>
          <Icon
            icon={"FILE_" + file.type}
            size="0.9rem"/>
          <FileName
              focus={isFileRenaming}
              editable={isFileRenaming}
              id={file.id}
              isFileRenaming={isFileRenaming}
              onBlur={() => this.handleFileNameBlur()}
              onChange={(e, value) => this.setState({ fileName: value })}
              value={fileName}/>
        </FileInfo>
        <AppSidebarFileDropdowns 
          closeDropdowns={this.closeDropdowns}
          copyFile={() => this.copyFile(file.id)}
          cutFile={() => this.cutFile(file.id)}
          deleteFile={() => deleteFile(file.id)}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          fileName={file.name}
          isDeleteDropdownVisible={isDeleteDropdownVisible}
          isDropdownVisible={isDropdownVisible}
          openDeleteDropdown={() => this.setState({ isDropdownVisible: false, isDeleteDropdownVisible: true })}
          toggleFileIsRenaming={() => this.setState({ isDropdownVisible: false, isFileRenaming: !isFileRenaming })}/>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSidebarFile.propTypes = {
  activeFileId: string,
  deleteFile: func,
  folderPath: array,
  level: number,
  file: shape({
    id: string,
    name: string,
    type: string,
    isFileRenaming: bool
  }),
  updateActiveFolderPath: func,
  updateActiveFileId: func,
  updateClipboard: func,
  updateFile: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;
`

const FileInfo = styled.div`
  padding: 0.25rem;
  padding-left: ${ props => (props.level / 2) + 'rem' };
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  color: ${ props => props.isActiveFile ? colors.TEXT_BLACK : 'inherit' };
  background-color: ${ props => props.isActiveFile ? colors.SIDEBAR_BACKGROUND_ACTIVE : 'transparent' };
  border-left: 5px solid ${ props => props.isActiveFile ? colors.SIDEBAR_BORDER_ACTIVE : 'transparent' };
  &:hover {
    color: ${ colors.TEXT_BLACK };
    background-color: ${ colors.SIDEBAR_BACKGROUND_ACTIVE };
    border-left: 5px solid ${ colors.SIDEBAR_BORDER_ACTIVE };
  }
`

const FileName = styled(ContentEditable)`
  margin-left: 0.25rem;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebarFile)