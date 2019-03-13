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
export default class AppBusiness extends Component {
  render() {
    const {
      isActive
    } = this.props
    return (
      <AppContentContainer
        isActive={isActive}>
        <UnderConstruction
          from='AppBusiness'/>
      </AppContentContainer>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppBusiness.propTypes = {
  isActive: bool
}