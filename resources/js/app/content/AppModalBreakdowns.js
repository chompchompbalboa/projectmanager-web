//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, timing } from '../../_config'

import {
  createBreakdown as createBreakdownAction,
  createBreakdownFormula as createBreakdownFormulaAction,
  deleteBreakdown as deleteBreakdownAction,
  deleteBreakdownFormula as deleteBreakdownFormulaAction,
  updateBreakdownFormulaColumnId as updateBreakdownFormulaColumnIdAction,
  updateBreakdownFormulaType as updateBreakdownFormulaTypeAction,
  updateBreakdownFormulaValue as updateBreakdownFormulaValueAction,
  updateBreakdownName as updateBreakdownNameAction
} from '../redux/table/tableActions'

import Icon from '../components/Icon'
import Modal from '../components/Modal'
import TableCellBoolean from '../components/TableCellBoolean'
import TableCellDatetime from '../components/TableCellDatetime'
import TableCellNumber from '../components/TableCellNumber'
import TableCellString from '../components/TableCellString'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  breakdowns: state.table.tables.find(table => table.id === state.modal.activeModalTableId).breakdowns,
  columns: state.table.tables.find(table => table.id === state.modal.activeModalTableId).columns,
  tableId: state.modal.activeModalTableId
})

const mapDispatchToProps = dispatch => ({
  createBreakdown: tableId => dispatch(createBreakdownAction(tableId)),
  createBreakdownFormula: (tableId, breakdownId, defaultColumnId) => dispatch(createBreakdownFormulaAction(tableId, breakdownId, defaultColumnId)),
  deleteBreakdown: (tableId, breakdownId) => dispatch(deleteBreakdownAction(tableId, breakdownId)),
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
  createBreakdown,
  createBreakdownFormula,
  deleteBreakdown,
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

  const tableCellTypeComponents = {
    BOOLEAN: TableCellBoolean,
    DATETIME: TableCellDatetime,
    NUMBER: TableCellNumber,
    STRING: TableCellString,
  }

  return (
    <Modal>
      <BreakdownsContainer>
        {breakdowns.map(breakdown => {
          return (
            <Breakdown
              key={breakdown.id}>
              <Header>
                <NameInput
                  onChange={e => updateBreakdownName(tableId, breakdown.id, e.target.value)}
                  value={breakdown.name !== null ? breakdown.name : ""}/>
                <DeleteBreakdown
                  onClick={() => deleteBreakdown(tableId, breakdown.id)}>
                  <Icon
                    icon="DELETE"
                    size="1em"/>
                </DeleteBreakdown>
              </Header>
              <FormulasContainer>
                {breakdown.formulas.map(formula => {
                  const column = columns.find(column => column.id === formula.columnId)
                  const ValueInput = tableCellTypeComponents[column.type]
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
                          updateValue={nextValue => updateBreakdownFormulaValue(tableId, breakdown.id, formula.id, column.type, nextValue)}
                          value={formula[column.type.toLowerCase()]}/>
                      </ValueContainer>
                      <DeleteContainer
                        onClick={() => deleteBreakdownFormula(tableId, breakdown.id, formula.id)}>
                        <Icon
                          icon="TRASH"
                          size="1em"/>
                      </DeleteContainer>
                    </Formula>
                  )
                })}
                <BottomContainer>
                  <AddFormula
                  onClick={() => createBreakdownFormula(tableId, breakdown.id, columns[0].id)}>
                    Add +
                  </AddFormula>
                </BottomContainer>
              </FormulasContainer>
            </Breakdown>
          )
        })}
        <AddBreakdownContainer>
          <AddBreakdown
            onClick={() => createBreakdown(tableId)}>
            Add breakdown +
          </AddBreakdown>
        </AddBreakdownContainer>
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
  createBreakdown: func,
  createBreakdownFormula: func,
  deleteBreakdown: func,
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
  width: 30vw;
`

const Breakdown = styled.div`
  margin-bottom: 2vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 0.25px solid ${ colors.TABLE_BORDER };
  background-color: ${colors.ACCENT};
	box-shadow: 0.5px 0.5px 2px ${colors.BOX_SHADOW};
`

const DeleteBreakdown = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color ${ timing.TRANSITION_DURATION };
  &:hover {
    color: rgb(200, 0, 0);
  }
`

const Header = styled.div`
  padding: 0.5vh 1vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-content: center;
`

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  text-align: center;
`

const NameInput = styled(StyledInput)`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
`

const FormulasContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Formula = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const FormulaColumn = styled.div`
  font-size: 13px;
  padding: 0.625vh 1.25vh;
  text-align: center;
  border: 0.25px solid ${ colors.TABLE_BORDER };
`

const ColumnContainer = styled(FormulaColumn)`
  width: 30%;
`

const ColumnSelect = styled.select`
`

const ColumnOption = styled.option``

const TypeContainer = styled(FormulaColumn)`
  width: 30%;
`

const TypeSelect = styled.select``

const TypeOption = styled.option``

const ValueContainer = styled(FormulaColumn)`
  width: 30%;
`

const DeleteContainer = styled(FormulaColumn)`
  cursor: pointer;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  transition: color ${timing.TRANSITION_DURATION};
  &:hover {
    color: rgb(200, 0, 0);
  }
`

const BottomContainer = styled.div`
  padding: 0.5vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border: 0.25px solid ${ colors.TABLE_BORDER };
`

const AddFormula = styled.div`
  padding: 0.62vh 1.25vh;
  font-size: 13px;
  cursor: pointer;
  text-align: right;
  border: 1px solid ${ colors.PRIMARY };
  background-color: white;
  color: ${ colors.PRIMARY };
  border-radius: 2px;
  transition: all ${ timing.TRANSITION_DURATION };
  &:hover {
    background-color: ${ colors.PRIMARY };
    color: white;
  }
`

const AddBreakdownContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: -2vh;
`

const AddBreakdown = styled.div`
  padding: 0.62vh 1.25vh;
  font-size: 13px;
  cursor: pointer;
  text-align: right;
  border: 1px solid ${ colors.PRIMARY };
  background-color: white;
  color: ${ colors.PRIMARY };
  border-radius: 2px;
  transition: all ${ timing.TRANSITION_DURATION };
  &:hover {
    background-color: ${ colors.PRIMARY };
    color: white;
  }
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppModalBreakdowns)