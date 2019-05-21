//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import {
  updateActiveModuleId as updateActiveModuleIdAction
} from '../redux/active/activeActions'
import { selectActiveModuleId } from '../redux/active/activeSelectors'

import Icon from './Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeModuleId: selectActiveModuleId(state)
})

const mapDispatchToProps = dispatch => ({
  updateActiveModuleId: nextActiveModuleId => dispatch(updateActiveModuleIdAction(nextActiveModuleId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppFoldersSidebarModule extends Component {
  render() {
    const {
      activeModuleId,
      level,
      module,
      updateActiveModuleId
    } = this.props
    return (
      <Container
        isActiveModule={activeModuleId === module.id}
        level={level}
        onClick={() => updateActiveModuleId(module.id)}>
        <Icon
          icon={"MODULE_" + module.type}
          size="0.9rem"/>
        <ModuleName>
          {module.name}
        </ModuleName>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppFoldersSidebarModule.propTypes = {
  activeModuleId: string,
  level: number,
  module: shape({
    id: string,
    name: string,
    type: string
  }),
  updateActiveModuleId: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  padding: 0.25rem 0;
  padding-left: ${ props => (props.level / 2) + 'rem' };
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  background-color: ${ props => props.isActiveModule ? colors.SIDEBAR_BACKGROUND_ACTIVE : 'transparent' };
  &:hover {
    background-color: ${ colors.SIDEBAR_BACKGROUND_ACTIVE };
  }
`

const ModuleName = styled.div`
  margin-left: 0.25rem;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppFoldersSidebarModule)