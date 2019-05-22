//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  createFolder as createFolderAction
} from '../redux/folder/folderActions'
import { selectFolderIds, selectFolders, selectModules } from '../redux/folder/folderSelectors'

import AppContentSidebar from './AppContentSidebar'
import AppFoldersSidebarFolder from './AppFoldersSidebarFolder'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  folderIds: selectFolderIds(state),
  folders: selectFolders(state),
  modules: selectModules(state)
})

const mapDispatchToProps = dispatch => ({
  createFolder: () => dispatch(createFolderAction(null))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppFoldersSidebar extends Component {

  state = {
    dropdownLeft: null,
    dropdownTop: null,
    isDropdownVisible: false
  }

  handleContextMenu = e => {
    e.preventDefault()
    this.setState({
      dropdownLeft: e.pageX + 'px',
      dropdownTop: e.pageY + 'px',
      isDropdownVisible: true
    })
  }

  handleCreateFolder = () => {
    const {
      createFolder
    } = this.props
    this.setState({
      isDropdownVisible: false
    })
    createFolder()
  }

  render() {
    const { 
      folderIds,
      folders,
      modules
    } = this.props
    const {
      dropdownLeft,
      dropdownTop,
      isDropdownVisible
    } = this.state
    return (
      <AppContentSidebar>
          {folderIds !== null && folderIds.map(folderId => (
            <AppFoldersSidebarFolder
              key={folderId}
              folder={folders[folderId]}
              folders={folders}
              level={1}
              modules={modules}/>
          ))}
          {isDropdownVisible && 
            <Dropdown
              closeDropdown={() => this.setState({ isDropdownVisible: false })}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              isDropdownVisible={isDropdownVisible}>
              <DropdownItem
                onClick={() => this.handleCreateFolder()}
                text="New Folder"/>
            </Dropdown>
          }
          <Container 
            onContextMenu={e => this.handleContextMenu(e)}/>
      </AppContentSidebar>
    )
  }
}

const Container = styled.div`
  width: 100%;
  flex-grow: 1;
`

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppFoldersSidebar.propTypes = {
  createFolder: func,
  folderIds: array,
  folders: object,
  modules: object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppFoldersSidebar)