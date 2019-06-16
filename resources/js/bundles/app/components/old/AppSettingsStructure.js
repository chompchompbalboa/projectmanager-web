//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { setStructure as setStructureAction } from '../redux/structure/structureActions'

import AppSettingsStructureContainers from './AppSettingsStructureContainers'
import AppSettingsStructureCollections from './AppSettingsStructureCollections'
import AppSettingsStructureModules from './AppSettingsStructureModules'
import AppSettingsStructureViews from './AppSettingsStructureViews'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  setStructure: () => dispatch(setStructureAction())
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructure extends Component {
  
  componentDidMount = () => {
    const {
      setStructure
    } = this.props
    setStructure()
  }

  render() {
    return (
      <Container>
        <AppSettingsStructureContainers />
        <AppSettingsStructureCollections />
        <AppSettingsStructureViews />
        <AppSettingsStructureModules />
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructure.propTypes = {
  setStructure: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  display: flex;
`

export default connect(
  null,
  mapDispatchToProps
)(AppSettingsStructure)