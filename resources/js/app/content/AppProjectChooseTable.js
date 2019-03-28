//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, timing } from '../../_config'

import {
  setActiveTableId as setActiveTableIdAction
} from '../redux/project/projectActions'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeTableId: state.project.activeTableId,
  activeTables: state.project.activeProject.tables
})

const mapDispatchToProps = dispatch => ({
  setActiveTableId: nextActiveTableId => dispatch(setActiveTableIdAction(nextActiveTableId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectChooseTable = ({ activeTables, activeTableId, setActiveTableId }) => {
  return (
    <Container>
      {activeTables.map(activeTable => {
        return (
          <ContentChoiceContainer
            key={activeTable.id}
            isActiveTable={activeTableId === activeTable.id}
            onClick={() => setActiveTableId(activeTable.id)}>
            {activeTable.name}
          </ContentChoiceContainer>
        )
      })}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjectChooseTable.propTypes = {
  activeTables: array,
  activeTableId: number,
  setActiveTableId: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  margin-top: 1vh;
  width: 100%;
`

const ContentChoiceContainer = styled.div`
  cursor: pointer;
  padding: 0.5vh 0;
  margin-bottom: 2vh;
  font-size: 13px;
  color: ${ props => props.isActiveTable ? colors.PRIMARY : colors.TEXT_INACTIVE };
  border-bottom: ${ props => props.isActiveTable ? '2px solid ' + colors.PRIMARY : '2px solid transparent' };
  transition: all ${ timing.TRANSITION_DURATION };
  &:hover {
    color: ${ colors.PRIMARY };
    border-bottom: 2px solid ${ colors.PRIMARY };
  }
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppProjectChooseTable)