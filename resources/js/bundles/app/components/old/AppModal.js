//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'

import AppModalBreakdowns from './AppModalBreakdowns'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeModal: state.view.activeModal
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppModal = ({ activeModal }) => {
  if (activeModal !== null) {
    const modals = {
      BREAKDOWNS: AppModalBreakdowns
    }
    const ActiveModal = modals[activeModal]
    
    return <ActiveModal />
  }
  return null
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppModal.propTypes = {
  activeModal: string
}

export default connect(
  mapStateToProps
)(AppModal)