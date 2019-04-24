//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import AppHeader from './AppHeader'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  organizationName: state.organization.name
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppOrganizationHeader = ({ organizationName }) => {
  return (
    <AppHeader>
      <Name>{organizationName}</Name>
    </AppHeader>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppOrganizationHeader.propTypes = {
  organizationName: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Name = styled.div`
  font-weight: bold;
  font-size: 22px;
`

export default connect(
  mapStateToProps
)(AppOrganizationHeader)