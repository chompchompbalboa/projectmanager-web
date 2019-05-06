//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { setStructure as setStructureAction } from '../redux/structure/structureActions'

import { selectContainerIds } from '../redux/container/containerSelectors'
import { selectStructureContainers } from '../redux/structure/structureSelectors'

import AppSettingsStructureContainer, { AddContainer } from './AppSettingsStructureContainer'

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
      containers,
      setStructure
    } = this.props
    if(!containers || containers === null) {
      setStructure()
    }
  }

  render() {
    const {
      containerIds,
      containers
    } = this.props
    if(containers && containers !== null) {
      return (
        <Container>
          {containerIds.map(containerId => containers[containerId] && (
             <AppSettingsStructureContainer
               key={containerId}
               container={containers[containerId]}/>
           ))}
           <AddContainer />
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
  containerIds: array,
  containers: object,
  setStructure: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(AppSettingsStructure))