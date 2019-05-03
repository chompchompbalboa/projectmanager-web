//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { setStructure as setStructureAction } from '../redux/structure/structureActions'

import { selectStructureContainers } from '../redux/structure/structureSelectors'

import AppSettingsStructureContainer, { AddContainer } from './AppSettingsStructureContainer'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
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
      containers
    } = this.props
    if(containers && containers !== null) {
      return (
        <Container>
          {Object.keys(containers).map(containerId => (
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