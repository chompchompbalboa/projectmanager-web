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
        <Breakdown>
          <Name>Name</Name>
          <FormulasContainer>
            <Formula>
              <Column>Column</Column>
              <Type>Type</Type>
              <Value>Value</Value>
            </Formula>
          </FormulasContainer>
        </Breakdown>
        {breakdowns.map(breakdown => {
          return (
            <Breakdown
              key={breakdown.id}>
              <Name>
                {breakdown.name}
              </Name>
              <FormulasContainer>
                {breakdown.formulas.map(formula => {
                  return (
                    <Formula
                       key={formula.id}>
                      <Column>
                        {formula.column}
                      </Column>
                      <Type>
                        {formula.type}
                      </Type>
                      <Value>
                        {formula.value}
                      </Value>
                    </Formula>
                  )
                })}
              </FormulasContainer>
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
    {id: 1, name: "Not Started", formulas: [
      {id: 1, column: "Status", type: "=", value: "Not Started"}
    ]},
    {id: 2, name: "WIP", formulas: [
      {id: 2, column: "Status", type: "=", value: "WIP"},
      {id: 3, column: "Status", type: "=", value: "On Hold"}
    ]},
    {id: 3, name: "Completed", formulas: [
      {id: 4, column: "Status", type: "=", value: "Completed"}
    ]}
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
  width: 30vw;
  padding: 2vh;
  display: flex;
`

const Name = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
`

const FormulasContainer = styled.div`
  width: 70%;
`

const Formula = styled.div`
  width: 100%;
  display: flex;
`

const Column = styled.div`
  width: 33%;
`

const Type = styled.div`
  width: 33%;
`

const Value = styled.div`
  width: 33%;
`

export default AppModalBreakdowns