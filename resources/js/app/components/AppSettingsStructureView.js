//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { selectStructureModules } from '../redux/structure/structureSelectors'

import AppSettingsStructureModule, { AddModule } from './AppSettingsStructureModule'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  modules: selectStructureModules(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructureView extends Component {

  state = {
    isModulesVisible: false
  }

  render() {
    const {
      view,
      modules
    } = this.props
    const {
      isModulesVisible
    } = this.state
    return (
      <Container>
        <View
          onClick={() => this.setState({ isModulesVisible: !isModulesVisible})}>
          <Bullet>
            {isModulesVisible ? "-" : "+"}
          </Bullet>
          <Name>
            {view.name}
          </Name>
        </View>
        <Modules
          isModulesVisible={isModulesVisible}>
          {modules && modules !== null && view.modules && view.modules.map(moduleId => (
            <AppSettingsStructureModule
              key={moduleId}
              module={modules[moduleId]}/>
          ))}
          <AddModule/>
        </Modules>
      </Container>
    )
  }
}

export const AddView = () => (
  <View>
    <Bullet/>
    <Name>
      Add...
    </Name>
  </View>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureView.propTypes = {
  view: shape({
    name: string,
    modules: array
  }),
  modules: object
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  margin: 0.35vh 0;
`

const View = styled.div`
  cursor: pointer;
  margin-left: 3vw;
  display: flex;
  align-items: center;
`

const Bullet = styled.h4`
  min-height: 1px;
  width: 1.5vw;
  display: flex;
  align-items: center;
`

const Name = styled.h4`
  &:hover {
    text-decoration: underline;
  }
`

const Modules = styled.div`
  display: ${ props => props.isModulesVisible ? 'block' : 'none'};
`

export default connect(
  mapStateToProps
)(withImmutablePropsToJS(AppSettingsStructureView))