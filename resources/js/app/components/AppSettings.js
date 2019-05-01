//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'

import AppContentHeader from './AppContentHeader'
import AppSettingsSidebar from './AppSettingsSidebar'
import AppContainerView from './AppContainerView'
import AppContent from './AppContent'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettings = () => {
  return (
    <AppContent>
      <AppSettingsSidebar />
      <AppContentHeader />
      <AppContainerView />
    </AppContent>
  )
}

export default AppSettings