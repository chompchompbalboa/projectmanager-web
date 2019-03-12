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
export default class AppDevelopmentOrganization extends Component {

  state = {
    name: "",
    status: ""
  }

  addOrganization = async () => {
    this.setState({
      status: "Adding..."
    })
    const {
      name
    } = this.state
    const input = {
      name: name
    }
    await API.graphql(
      graphqlOperation(
        mutations.createOrganization, { input: input })
    ).then(({ data: { createOrganization }} ) => {
      this.setState({
        name: "",
        status: createOrganization.name + " was created with ID " + createOrganization.id
      })
    })
  }

  render() {
    const {
      name,
      status
    } = this.state

    return (
      <AppDevelopmentContainer
        buttonText="Add"
        header="Add Organization"
        onActionButtonClick={this.addOrganization}
        status={status}>
        <AppDevelopmentInput 
          placeholder="Name"
          value={name}
          onChange={(nextName) => this.setState({ name: nextName })}/>
      </AppDevelopmentContainer>
    )
  }
}