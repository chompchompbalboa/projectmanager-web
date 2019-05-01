//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'

import AppContainerHeader from './AppContainerHeader'
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
      <AppContainerHeader />
      <AppContainerView />
    </AppContent>
  )
}

export default AppContainer