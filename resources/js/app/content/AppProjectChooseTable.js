//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, timing } from '../../_config'

import {
  setTableId as setTableIdAction
} from '../redux/table/tableActions'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  tableId: state.table.id,
  tables: state.project.activeProject.tables
})

const mapDispatchToProps = dispatch => ({
  setTableId: nextTableId => dispatch(setTableIdAction(nextTableId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectChooseTable = ({ tables, tableId, setTableId }) => {
  return (
    <Container>
      {tables.map(table => {
        return (
          <ContentChoiceContainer
            key={table.id}
            isActiveTable={tableId === table.id}
            onClick={() => setTableId(table.id)}>
            {table.name}
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
  tables: array,
  tableId: number,
  setTableId: func
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