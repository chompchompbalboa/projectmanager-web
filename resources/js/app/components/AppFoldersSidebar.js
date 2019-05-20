//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'

import { selectFolderIds, selectFolders, selectModules } from '../redux/folder/folderSelectors'

import AppContentSidebar from './AppContentSidebar'
import AppFoldersSidebarFolder from './AppFoldersSidebarFolder'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  folderIds: selectFolderIds(state),
  folders: selectFolders(state),
  modules: selectModules(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppFoldersSidebar = ({ 
  folderIds,
  folders,
  modules
}) => {
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
    </AppContentSidebar>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppFoldersSidebar.propTypes = {
  folderIds: array,
  folders: object,
  modules: object
}

export default connect(
  mapStateToProps
)(AppFoldersSidebar)