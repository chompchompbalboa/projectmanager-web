//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { oneOf } from 'prop-types'

import AppModalBreakdowns from './AppModalBreakdowns'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppModal = ({ activeModal }) => {
  
  const modals = {
    BREAKDOWNS: AppModalBreakdowns
  }

  const ActiveModal = modals[activeModal]

  return (
    <ActiveModal />
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppModal.propTypes = {
  activeModal: oneOf([
    'BREAKDOWNS'
  ])
}
AppModal.defaultProps = {
  activeModal: 'BREAKDOWNS'
}

export default AppModal