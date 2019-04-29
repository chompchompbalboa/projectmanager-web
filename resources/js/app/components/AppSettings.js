//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool } from 'prop-types'

import AppContentContainer from './AppContentContainer'
import UnderConstruction from './UnderConstruction'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppSettings extends Component {
  render() {
    return (
      <AppContentContainer>
        <UnderConstruction
          from='AppSettings'/>
      </AppContentContainer>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettings.propTypes = {
  isActive: bool
}