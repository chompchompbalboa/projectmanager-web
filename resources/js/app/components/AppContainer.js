//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'

import AppContentHeader from './AppContentHeader'
import AppContainerSidebar from './AppContainerSidebar'
import AppContainerView from './AppContainerView'
import AppContent from './AppContent'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainer = () => {
  return (
    <AppContent>
      <AppContainerSidebar />
      <AppContentHeader />
      <AppContainerView />
    </AppContent>
  )
}

export default AppContainer