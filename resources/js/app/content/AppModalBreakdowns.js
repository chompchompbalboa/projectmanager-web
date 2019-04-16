//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array } from 'prop-types'
import styled from 'styled-components'

import Modal from '../components/Modal'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppModalBreakdowns = ({ breakdowns }) => {
  return (
    <Modal>
      <BreakdownsContainer>
        {breakdowns.map(breakdown => {
          return (
            <Breakdown
              key={breakdown.id}>
              <Column>
                Name
              </Column>
              <Column>
                Column
              </Column>
              <BreakdownType>
                BreakdownType
              </BreakdownType>
              <Value>
                Value
              </Value>
            </Breakdown>
          )
        })}
      </BreakdownsContainer>
    </Modal>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppModalBreakdowns.propTypes = {
  breakdowns: array
}
AppModalBreakdowns.defaultProps = {
  breakdowns: [
    {id: 1},
    {id: 2},
    {id: 3}
  ]
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const BreakdownsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Breakdown = styled.div`
  padding: 2vh;
  display: flex;
`

const Column = styled.div`
`

const BreakdownType = styled.div`
`

const Value = styled.div`
`

export default AppModalBreakdowns