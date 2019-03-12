//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'

import { API, graphqlOperation } from "aws-amplify"
import * as mutations from '../graphql/mutations'

import AppDevelopmentContainer from './AppDevelopmentContainer'
import AppDevelopmentInput from './AppDevelopmentInput'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppDevelopmentAddTable extends Component {

  state = {
    name: "",
    tableProjectId: "",
    status: ""
  }

  addTable = async () => {
    this.setState({
      status: "Adding..."
    })
    const {
      name,
      tableProjectId
    } = this.state
    const input = {
      name: name,
      tableProjectId: tableProjectId
    }
    await API.graphql(
      graphqlOperation(
        mutations.createTable, { input: input })
    ).then(({ data: { createTable }} ) => {
      this.setState({
        name: "",
        tableProjectId: "",
        status: createTable.name + " was created with ID " + createTable.id
      })
    })
  }

  render() {
    const {
      name,
      tableProjectId,
      status
    } = this.state

    return (
      <AppDevelopmentContainer
        buttonText="Add"
        header="Add Table"
        onActionButtonClick={this.addTable}
        status={status}>
        <AppDevelopmentInput 
          placeholder="Name"
          value={name}
          onChange={(nextName) => this.setState({ name: nextName })}/>
        <AppDevelopmentInput 
          placeholder="Project Id"
          value={tableProjectId}
          onChange={(nextTableProjectId) => this.setState({ tableProjectId: nextTableProjectId })}/>
      </AppDevelopmentContainer>
    )
  }
}