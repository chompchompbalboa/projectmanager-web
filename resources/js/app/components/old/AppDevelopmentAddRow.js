//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import { API, graphqlOperation } from "aws-amplify"
import * as mutations from '../graphql/mutations'

import AppDevelopmentContainer from './AppDevelopmentContainer'
import AppDevelopmentInput from './AppDevelopmentInput'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppDevelopmentAddRow extends Component {

  state = {
    jobCode: "",
    jobCodeStructure: "539d8010-18f2-4c16-a338-05ae7fe997c1",
    name: "",
    nameStructure: "2a7ee358-9862-4fec-addc-5b501a910bf1",
    description: "",
    descriptionStructure: "b9e62b18-bef4-4c63-bb9f-8598226966c4",
    department: "",
    departmentStructure: "cfc03ecf-4526-4358-983a-1d155909db5f",
    saveStatus: "",
    saveStatusCounter: 6,
    status: "",
    statusStructure: "e02a1c17-3632-4514-9125-a2027dc929b1",
    table: "09a62679-3bcb-4736-9813-3d5a2e0a059b",
    dueDate: "",
    dueDateStructure: "47fd66f2-8934-4420-8f71-1b46d4afd44e"
  }

  addRow = async () => {
    this.setState({
      saveStatus: "Adding Row..."
    })
    const {
      jobCode,
      jobCodeStructure,
      name,
      nameStructure,
      description,
      descriptionStructure,
      department,
      departmentStructure,
      status,
      statusStructure,
      table,
      dueDate,
      dueDateStructure
    } = this.state
    const jobCodeInput = {
      cellStructureId: jobCodeStructure,
      data: {
        string: jobCode
      }
    }
    const nameInput = {
      cellStructureId: nameStructure,
      data: {
        string: name
      }
    }
    const descriptionInput = {
      cellStructureId: descriptionStructure,
      data: {
        string: description
      }
    }
    const departmentInput = {
      cellStructureId: departmentStructure,
      data: {
        string: department
      }
    }
    const statusInput = {
      cellStructureId: statusStructure,
      data: {
        string: status
      }
    }
    const dueDateInput = {
      cellStructureId: dueDateStructure,
      data: {
        string: dueDate
      }
    }
    await API.graphql(
      graphqlOperation(
        mutations.createRow, { input: { rowTableId: table } })
    ).then(({ data: { createRow }} ) => {
      this.setState({
        saveStatus: "Adding Cells..."
      })
      API.graphql(graphqlOperation(mutations.createCell, {
        input: { ...jobCodeInput, cellRowId: createRow.id }})).then(({ data: { createCell }}) => {
          const nextSaveStatusCounter = this.state.saveStatusCounter - 1
          createCell && this.setState({
            saveStatusCounter: nextSaveStatusCounter,
            saveStatus: this.state.saveStatusCounter === 1 ? "Completed" : this.state.saveStatus
          })
        })
      API.graphql(graphqlOperation(mutations.createCell, {
        input: { ...nameInput, cellRowId: createRow.id }})).then(({ data: { createCell }}) => {
          const nextSaveStatusCounter = this.state.saveStatusCounter - 1
          createCell && this.setState({
            saveStatusCounter: nextSaveStatusCounter,
            saveStatus: this.state.saveStatusCounter === 1 ? "Completed" : this.state.saveStatus
          })
        })     
      API.graphql(graphqlOperation(mutations.createCell, {
        input: { ...descriptionInput, cellRowId: createRow.id }})).then(({ data: { createCell }}) => {
          const nextSaveStatusCounter = this.state.saveStatusCounter - 1
          createCell && this.setState({
            saveStatusCounter: nextSaveStatusCounter,
            saveStatus: this.state.saveStatusCounter === 1 ? "Completed" : this.state.saveStatus
          })
        })
      API.graphql(graphqlOperation(mutations.createCell, {
        input: { ...departmentInput, cellRowId: createRow.id }})).then(({ data: { createCell }}) => {
          const nextSaveStatusCounter = this.state.saveStatusCounter - 1
          createCell && this.setState({
            saveStatusCounter: nextSaveStatusCounter,
            saveStatus: this.state.saveStatusCounter === 1 ? "Completed" : this.state.saveStatus
          })
        })
      API.graphql(graphqlOperation(mutations.createCell, {
        input: { ...statusInput, cellRowId: createRow.id }})).then(({ data: { createCell }}) => {
          const nextSaveStatusCounter = this.state.saveStatusCounter - 1
          createCell && this.setState({
            saveStatusCounter: nextSaveStatusCounter,
            saveStatus: this.state.saveStatusCounter === 1 ? "Completed" : this.state.saveStatus
          })
        })
      API.graphql(graphqlOperation(mutations.createCell, {
        input: { ...dueDateInput, cellRowId: createRow.id }})).then(({ data: { createCell }}) => {
          const nextSaveStatusCounter = this.state.saveStatusCounter - 1
          createCell && this.setState({
            saveStatusCounter: nextSaveStatusCounter,
            saveStatus: this.state.saveStatusCounter === 1 ? "Completed" : this.state.saveStatus
          })
        })
    })
  }

  addCell = async () => {

  }

  render() {
    const {
      jobCode,
      jobCodeStructure,
      name,
      nameStructure,
      description,
      descriptionStructure,
      department,
      departmentStructure,
      saveStatus,
      status,
      statusStructure,
      table,
      dueDate,
      dueDateStructure
    } = this.state

    return (
      <AppDevelopmentContainer
        buttonText="Add"
        header="Add Row"
        onActionButtonClick={this.addRow}
        status={saveStatus}>
        <Container>
          <AppDevelopmentInput 
            placeholder="Table Id"
            value={table}
            onChange={(nextTable) => this.setState({ table: nextTable })}/>
          <Row>
            <AppDevelopmentInput 
              placeholder="Job Code"
              value={jobCode}
              onChange={(nextJobCode) => this.setState({ jobCode: nextJobCode })}/>
            <AppDevelopmentInput 
              placeholder="Job Code Structure"
              value={jobCodeStructure}
              onChange={(nextJobCodeStructure) => this.setState({ jobCodeStructure: nextJobCodeStructure })}/>
          </Row>
          <Row>
            <AppDevelopmentInput 
              placeholder="Name"
              value={name}
              onChange={(nextName) => this.setState({ name: nextName })}/>
            <AppDevelopmentInput 
              placeholder="Name Structure"
              value={nameStructure}
              onChange={(nextNameStructure) => this.setState({ nameStructure: nextNameStructure })}/>
          </Row>
          <Row>
            <AppDevelopmentInput 
              placeholder="Description"
              value={description}
              onChange={(nextDescription) => this.setState({ description: nextDescription })}/>
            <AppDevelopmentInput 
              placeholder="Description Structure"
              value={descriptionStructure}
              onChange={(nextDescriptionStructure) => this.setState({ descriptionStructure: nextDescriptionStructure })}/>
          </Row>
          <Row>
            <AppDevelopmentInput 
              placeholder="Department"
              value={department}
              onChange={(nextDepartment) => this.setState({ department: nextDepartment })}/>
            <AppDevelopmentInput 
              placeholder="Department Structure"
              value={departmentStructure}
              onChange={(nextDepartmentStructure) => this.setState({ departmentStructure: nextDepartmentStructure })}/>
          </Row>
          <Row>
            <AppDevelopmentInput 
              placeholder="Status"
              value={status}
              onChange={(nextStatus) => this.setState({ status: nextStatus })}/>
            <AppDevelopmentInput 
              placeholder="Status Structure"
              value={statusStructure}
              onChange={(nextStatusStructure) => this.setState({ statusStructure: nextStatusStructure })}/>
          </Row>
          <Row>
            <AppDevelopmentInput 
              placeholder="Due Date"
              value={dueDate}
              onChange={(nextDueDate) => this.setState({ dueDate: nextDueDate })}/>
            <AppDevelopmentInput 
              placeholder="Due Date Structure"
              value={dueDateStructure}
              onChange={(nextDueDateStructure) => this.setState({ dueDateStructure: nextDueDateStructure })}/>
          </Row>
        </Container>
      </AppDevelopmentContainer>
    )
  }
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%
`

const Row = styled.div`
  display: flex;
  align-items: center;
`