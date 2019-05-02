//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { setStructure as setStructureAction } from '../redux/structure/structureActions'

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
      containerIds,
      containers
    } = this.props
    return (
      <Container>
        AppSettingsStructure
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructure.propTypes = {
  containerIds: array,
  containers: object,
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default connect(
  null,
  mapDispatchToProps
)(withImmutablePropsToJS(AppSettingsStructure))