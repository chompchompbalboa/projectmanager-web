//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { setStructure as setStructureAction } from '../redux/structure/structureActions'

import { selectContainerIds } from '../redux/container/containerSelectors'
import { selectStructureContainers } from '../redux/structure/structureSelectors'

import AppSettingsStructureContainers from './AppSettingsStructureContainers'
import AppSettingsStructureCollections from './AppSettingsStructureCollections'
import AppSettingsStructureModules from './AppSettingsStructureModules'
import AppSettingsStructureViews from './AppSettingsStructureViews'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  containerIds: selectContainerIds(state),
  containers: selectStructureContainers(state)
})

const mapDispatchToProps = dispatch => ({
  setStructure: () => dispatch(setStructureAction())
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructure extends Component {

  state = {
    isLoading: true
  }

  componentDidMount = () => {
    const {
      setStructure
    } = this.props
    setStructure()
  }

  render() {
    const {
      containers
    } = this.props
    if(containers && containers !== null) {
      return (
        <Container>
          <AppSettingsStructureContainers />
          <AppSettingsStructureCollections />
          <AppSettingsStructureViews />
          <AppSettingsStructureModules />
        </Container>
      )
    }
    return null
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructure.propTypes = {
  containers: object,
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
  mapStateToProps,
  mapDispatchToProps
)(AppSettingsStructure)