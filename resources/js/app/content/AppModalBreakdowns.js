//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { timing } from '../../_config'

import {
  updateBreakdowns as updateBreakdownsAction
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
  updateBreakdowns: (tableId, nextBreakdowns) => dispatch(updateBreakdownsAction(tableId, nextBreakdowns))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppModalBreakdowns extends Component {
  
  state = {
    breakdowns: this.props.breakdowns
  }

  saveTimeout = null
  
  types = [
    { type: 'EQUALS', text: "="},
    { type: 'GREATER_THAN', text: ">"},
    { type: 'LESS_THAN', text: "<"}
  ]  

  createFormula = breakdownId => {
    clearTimeout(this.saveTimeout)
    const {
      columns
    } = this.props
    const {
      breakdowns
    } = this.state
    const nextBreakdowns = breakdowns.map(breakdown => {
      return {
        ...breakdown,
        formulas: breakdown.id !== breakdownId ? breakdown.formulas : [...breakdown.formulas, {
          id: _.random(-100000, -900000),
          name: null,
          type: 'EQUALS',
          columnId: columns[0].id,
          boolean: null,
          datetime: null, 
          number: null,
          string: null
        }]
      }
    })
    this.setState({
      breakdowns: nextBreakdowns
    })
    this.saveTimeout = window.setTimeout(this.saveChanges, timing.SAVE_INTERVAL)
  }

  deleteFormula = (breakdownId, formulaId) => {
    clearTimeout(this.saveTimeout)
    const {
      breakdowns
    } = this.state
    const nextBreakdowns = breakdowns.map(breakdown => {
      return {
        ...breakdown,
        formulas: breakdown.id !== breakdownId ? breakdown.formulas : breakdown.formulas.filter(formula => formula.id !== formulaId)
      }
    })
    this.setState({
      breakdowns: nextBreakdowns
    })
    this.saveTimeout = window.setTimeout(this.saveChanges, timing.SAVE_INTERVAL)
  }

  updateBreakdown = (breakdownId, nextName) => {
    clearTimeout(this.saveTimeout)
    const {
      breakdowns
    } = this.state
    const nextBreakdowns = breakdowns.map(breakdown => {
      return {
        ...breakdown,
        name: breakdown.id === breakdownId ? nextName : breakdown.name
      }
    })
    this.setState({
      breakdowns: nextBreakdowns
    })
    this.saveTimeout = window.setTimeout(this.saveChanges, timing.SAVE_INTERVAL)
  }
  
  updateFormula = (breakdownId, formulaId, columnType, nextColumnId, nextType, nextValue) => {
    clearTimeout(this.saveTimeout)
    const {
      breakdowns
    } = this.state
    const nextBreakdowns = breakdowns.map(breakdown => {
      return {
        ...breakdown,
          formulas: breakdown.id !== breakdownId ? breakdown.formulas : breakdown.formulas.map(formula => {
            return {
              ...formula,
              columnId: formula.id === formulaId ? nextColumnId : formula.columnId,
              type: formula.id === formulaId ? nextType : formula.type,
              boolean: formula.id === formulaId && columnType === 'BOOLEAN' ? nextValue : formula.boolean,
              datetime: formula.id === formulaId && columnType === 'DATETIME' ? nextValue : formula.datetime,
              number: formula.id === formulaId && columnType === 'NUMBER' ? nextValue : formula.number,
              string: formula.id === formulaId && columnType === 'STRING' ? nextValue : formula.string
            }
          })
        }
    })
    this.setState({
      breakdowns: nextBreakdowns
    })
    this.saveTimeout = window.setTimeout(this.saveChanges, timing.SAVE_INTERVAL)
  }
  
  saveChanges = () => {
    const {
      tableId,
      updateBreakdowns
    } = this.props
    const {
      breakdowns
    } = this.state
    updateBreakdowns(tableId, breakdowns)
  }
  
  render() {
    const {
      columns
    } = this.props
    const {
      breakdowns
    } = this.state
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
                     onChange={e => this.updateBreakdown(breakdown.id, e.target.value)}
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
                            onChange={e => this.updateFormula(breakdown.id, formula.id, column.type, Number(e.target.value), formula.type, formula[column.type.toLowerCase()])}
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
                            onChange={e => this.updateFormula(breakdown.id, formula.id, column.type, column.id, e.target.value, formula[column.type.toLowerCase()])}
                            value={formula.type}>
                            {this.types.map(type => {
                              return (
                                <TypeOption
                                  key={type.type}
                                  value={type.type}>
                                  {type.text}
                                </TypeOption>
                              )
                            })}
                            {this.types[formula.type]}
                          </TypeSelect>
                        </TypeContainer>
                        <ValueContainer>
                          <ValueInput
                            onChange={e => this.updateFormula(breakdown.id, formula.id, column.type, column.id, formula.type, e.target.value)}
                            value={formula[column.type.toLowerCase()] !== null ? formula[column.type.toLowerCase()] : ""}/>
                        </ValueContainer>
                        <DeleteContainer
                          onClick={() => this.deleteFormula(breakdown.id, formula.id)}>
                          X
                        </DeleteContainer>
                      </Formula>
                    )
                  })}
                  <AddFormulaContainer
                    onClick={() => this.createFormula(breakdown.id)}>
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
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppModalBreakdowns.propTypes = {
  breakdowns: array,
  columns: array,
  tableId: number,
  updateBreakdowns: func
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