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
export default class AppDevelopmentAddProject extends Component {

  state = {
    name: "",
    unique_id: "",
    projectOrganizationId: "",
    status: ""
  }

  addProject = async () => {
    this.setState({
      status: "Adding..."
    })
    const {
      name,
      unique_id,
      projectOrganizationId
    } = this.state
    const input = {
      name: name,
      unique_id: unique_id,
      projectOrganizationId: projectOrganizationId
    }
    await API.graphql(
      graphqlOperation(
        mutations.createProject, { input: input })
    ).then(({ data: { createProject }} ) => {
      this.setState({
        name: "",
        unique_id: "",
        projectOrganizationId: "",
        status: createProject.name + " was created with ID " + createProject.id
      })
    })
  }

  render() {
    const {
      name,
      unique_id,
      projectOrganizationId,
      status
    } = this.state

    return (
      <AppDevelopmentContainer
        buttonText="Add"
        header="Add Project"
        onActionButtonClick={this.addProject}
        status={status}>
        <AppDevelopmentInput 
          placeholder="Name"
          value={name}
          onChange={(nextName) => this.setState({ name: nextName })}/>
        <AppDevelopmentInput 
          placeholder="Job Code"
          value={unique_id}
          onChange={(nextUniqueId) => this.setState({ unique_id: nextUniqueId })}/>
        <AppDevelopmentInput 
          placeholder="Org. Id"
          value={projectOrganizationId}
          onChange={(nextProjectOrganizationId) => this.setState({ projectOrganizationId: nextProjectOrganizationId })}/>
      </AppDevelopmentContainer>
    )
  }
}