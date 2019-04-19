//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  createBreakdownFormula as createBreakdownFormulaAction,
  deleteBreakdownFormula as deleteBreakdownFormulaAction,
  updateBreakdownFormulaColumnId as updateBreakdownFormulaColumnIdAction,
  updateBreakdownFormulaType as updateBreakdownFormulaTypeAction,
  updateBreakdownFormulaValue as updateBreakdownFormulaValueAction,
  updateBreakdownName as updateBreakdownNameAction
} from '../redux/project/projectActions'

import Modal from '../components/Modal'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  breakdowns: state.project.activeProject.tables.find(table => table.id === state.modal.activeModalTableId).breakdowns,
  columns: state.project.activeProject.tables.find(table => table.id === state.modal.activeModalTableId).columns,
  tableId: state.modal.activeModalTableId
})

const mapDispatchToProps = dispatch => ({
  createBreakdownFormula: (tableId, breakdownId, defaultColumnId) => dispatch(createBreakdownFormulaAction(tableId, breakdownId, defaultColumnId)),
  deleteBreakdownFormula: (tableId, breakdownId, formulaId) => dispatch(deleteBreakdownFormulaAction(tableId, breakdownId, formulaId)),
  updateBreakdownFormulaColumnId: (tableId, breakdownId, formulaId, nextBreakdownFormulaColumnId) => dispatch(updateBreakdownFormulaColumnIdAction(tableId, breakdownId, formulaId, nextBreakdownFormulaColumnId)),
  updateBreakdownFormulaType: (tableId, breakdownId, formulaId, nextBreakdownFormulaType) => dispatch(updateBreakdownFormulaTypeAction(tableId, breakdownId, formulaId, nextBreakdownFormulaType)),
  updateBreakdownFormulaValue: (tableId, breakdownId, formulaId, columnType, nextBreakdownFormulaValue) => dispatch(updateBreakdownFormulaValueAction(tableId, breakdownId, formulaId, columnType, nextBreakdownFormulaValue)),
  updateBreakdownName: (tableId, breakdownId, nextBreakdownName) => dispatch(updateBreakdownNameAction(tableId, breakdownId, nextBreakdownName))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppModalBreakdowns  = ({
  breakdowns,
  columns,
  createBreakdownFormula,
  deleteBreakdownFormula,
  tableId,
  updateBreakdownFormulaColumnId,
  updateBreakdownFormulaType,
  updateBreakdownFormulaValue,
  updateBreakdownName
}) => {
  
  const types = [
    { type: 'EQUALS', text: "="},
    { type: 'GREATER_THAN', text: ">"},
    { type: 'LESS_THAN', text: "<"}
  ]

  return (
    <Modal>
      <BreakdownsContainer>
        <Breakdown>
          <NameContainer>Name</NameContainer>
          <FormulasContainer>
            <Formula>
              <ColumnContainer>Column</ColumnContainer>
              <TypeContainer>Type</TypeContainer>
              <ValueContainer>Value</ValueContainer>
              <DeleteContainer/>
            </Formula>
          </FormulasContainer>
        </Breakdown>
        {breakdowns.map(breakdown => {
          return (
            <Breakdown
              key={breakdown.id}>
              <NameContainer>
                <NameInput
                    onChange={e => updateBreakdownName(tableId, breakdown.id, e.target.value)}
                    value={breakdown.name !== null ? breakdown.name : ""}/>
              </NameContainer>
              <FormulasContainer>
                {breakdown.formulas.map(formula => {
                  const column = columns.find(column => column.id === formula.columnId)
                  return (
                    <Formula
                        key={formula.id}>
                      <ColumnContainer>
                        <ColumnSelect
                          onChange={e => updateBreakdownFormulaColumnId(tableId, breakdown.id, formula.id, e.target.value)}
                          value={formula.columnId}>
                          {columns.map(column => {
                            return (
                              <ColumnOption
                                key={column.id}
                                value={column.id}>
                                {column.name}
                              </ColumnOption>
                            )
                          })}
                          {column.name}
                        </ColumnSelect>
                      </ColumnContainer>
                      <TypeContainer>
                        <TypeSelect
                          onChange={e => updateBreakdownFormulaType(tableId, breakdown.id, formula.id, e.target.value)}
                          value={formula.type}>
                          {types.map(type => {
                            return (
                              <TypeOption
                                key={type.type}
                                value={type.type}>
                                {type.text}
                              </TypeOption>
                            )
                          })}
                          {types[formula.type]}
                        </TypeSelect>
                      </TypeContainer>
                      <ValueContainer>
                        <ValueInput
                          onChange={e => updateBreakdownFormulaValue(tableId, breakdown.id, formula.id, column.type, e.target.value)}
                          value={formula[column.type.toLowerCase()] !== null ? formula[column.type.toLowerCase()] : ""}/>
                      </ValueContainer>
                      <DeleteContainer
                        onClick={() => deleteBreakdownFormula(tableId, breakdown.id, formula.id)}>
                        X
                      </DeleteContainer>
                    </Formula>
                  )
                })}
                <AddFormulaContainer
                  onClick={() => createBreakdownFormula(tableId, breakdown.id, columns[0].id)}>
                  +
                </AddFormulaContainer>
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
  breakdowns: array,
  columns: array,
  createBreakdownFormula: func,
  deleteBreakdownFormula: func,
  tableId: number,
  updateBreakdownFormulaColumnId: func,
  updateBreakdownFormulaType: func,
  updateBreakdownFormulaValue: func,
  updateBreakdownName: func,
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

const NameContainer = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  background-color: transparent;
  text-align: center;
`

const NameInput = styled(StyledInput)``

const FormulasContainer = styled.div`
  width: 70%;
`

const Formula = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const ColumnContainer = styled.div`
  width: 30%;
  text-align: center;
`

const ColumnSelect = styled.select`
`

const ColumnOption = styled.option``

const TypeContainer = styled.div`
  width: 30%;
  text-align: center;
`

const TypeSelect = styled.select``

const TypeOption = styled.option``

const ValueContainer = styled.div`
  width: 30%;
  text-align: center;
`

const ValueInput = styled(StyledInput)``

const DeleteContainer = styled.div`
  cursor: pointer;
  width: 10%;
  text-align: right;
  color: red;
`

const AddFormulaContainer = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppModalBreakdowns)