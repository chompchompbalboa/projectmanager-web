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
export default class AppDevelopmentAddStructure extends Component {

  state = {
    defaultSortOrder: "ASC",
    header: "",
    position: "",
    status: "",
    structureTableId: "09a62679-3bcb-4736-9813-3d5a2e0a059b",
    type: "STRING",
    width: ""
  }

  addStructure = async () => {
    this.setState({
      status: "Adding..."
    })
    const {
      defaultSortOrder,
      header,
      position,
      structureTableId,
      type,
      width
    } = this.state
    const input = {
      header: header,
      position: Number(position),
      type: type,
      width: Number(width),
      defaultSortOrder: defaultSortOrder,
      structureTableId: structureTableId
    }
    await API.graphql(
      graphqlOperation(
        mutations.createStructure, { input: input })
    ).then(({ data: { createStructure }} ) => {
      this.setState({
        header: "",
        structureTableId: "",
        status: createStructure.header + " was created with ID " + createStructure.id
      })
    })
  }

  render() {
    const {
      defaultSortOrder,
      header,
      position,
      status,
      structureTableId,
      type,
      width
    } = this.state

    return (
      <AppDevelopmentContainer
        buttonText="Add"
        header="Add Structure"
        onActionButtonClick={this.addStructure}
        status={status}>
        <AppDevelopmentInput 
          placeholder="Type"
          value={type}
          onChange={(nextType) => this.setState({ type: nextType })}/>
        <AppDevelopmentInput 
          placeholder="Header"
          value={header}
          onChange={(nextHeader) => this.setState({ header: nextHeader })}/>
        <AppDevelopmentInput 
          placeholder="Position"
          value={position}
          onChange={(nextPosition) => this.setState({ position: nextPosition })}/>
        <AppDevelopmentInput 
          placeholder="Width"
          value={width}
          onChange={(nextWidth) => this.setState({ width: nextWidth })}/>
        <AppDevelopmentInput 
          placeholder="Default Sort Order"
          value={defaultSortOrder}
          onChange={(nextDefaultSortOrder) => this.setState({ defaultSortOrder: nextDefaultSortOrder })}/>
        <AppDevelopmentInput 
          placeholder="Table Id"
          value={structureTableId}
          onChange={(nextStructureTableId) => this.setState({ structureTableId: nextStructureTableId })}/>
      </AppDevelopmentContainer>
    )
  }
}