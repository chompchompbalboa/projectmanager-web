//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'

import AppContentHeader from './AppContentHeader'
import AppSettingsSidebar from './AppSettingsSidebar'
import AppSettingsContent from './AppSettingsContent'
import AppContent from './AppContent'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettings = () => {
  return (
    <AppContent>
      <AppSettingsSidebar />
      <AppContentHeader />
      <AppSettingsContent />
    </AppContent>
  )
}

export default AppSettings