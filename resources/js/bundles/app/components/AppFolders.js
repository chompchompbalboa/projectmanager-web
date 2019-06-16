//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'

import AppContentHeader from './AppContentHeader'
import AppFoldersFile from './AppFoldersFile'
import AppFoldersSidebar from './AppFoldersSidebar'
import AppContent from './AppContent'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppFolders = () => {
  return (
    <AppContent>
      <AppFoldersSidebar />
      <AppContentHeader />
      <AppFoldersFile />
    </AppContent>
  )
}

export default AppFolders