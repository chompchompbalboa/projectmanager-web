//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, object } from 'prop-types'
import styled from 'styled-components'

import { colors, timing } from '../../_config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectChooseTable = ({ activeTable, changeActiveTable, tables }) => {
  return (
    <Container>
      {tables.map((table, index) => {
        return (
          <ContentChoiceContainer
            key={index}
            isActiveTable={activeTable.id === table.id}
            onClick={() => changeActiveTable(table)}>
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
  activeTable: object,
  changeActiveTable: func,
  tables: array,
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

export default AppProjectChooseTable