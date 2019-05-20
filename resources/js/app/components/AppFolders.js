//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'

import AppContentHeader from './AppContentHeader'
import AppFoldersModule from './AppFoldersModule'
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
      <AppFoldersModule />
    </AppContent>
  )
}

export default AppFolders