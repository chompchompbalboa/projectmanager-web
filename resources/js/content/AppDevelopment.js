//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'

import AppContentContainer from './AppContentContainer'
import AppDevelopmentAddOrganization from './AppDevelopmentAddOrganization'
import AppDevelopmentAddProject from './AppDevelopmentAddProject'
import AppDevelopmentAddRow from './AppDevelopmentAddRow'
import AppDevelopmentAddStructure from './AppDevelopmentAddStructure'
import AppDevelopmentAddTable from './AppDevelopmentAddTable'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppDevelopment extends Component {
  render() {
    const {
      isActive,
      cognitoSub
    } = this.props
    return (
      <AppContentContainer
        isActive={isActive}>
        <Content>
          <InfoColumns>
            <InfoColumn>
              <Info>Cognito Client Id: 6s6ges1aree0roep2sf4kookl3</Info>
              <Info>Cognito Sub: {cognitoSub}</Info>
              <Info>Dillon Works: fa87cc58-d9c8-439f-ac01-ef3f07f0a399</Info>
              <Info>Ft. McDowell: 05f5d73c-79ca-44fa-b7e7-7ce5c95b1833</Info>
              <Info>Elements Table: 09a62679-3bcb-4736-9813-3d5a2e0a059b</Info>
            </InfoColumn>
            <InfoColumn>
              <Info>Job Code: 539d8010-18f2-4c16-a338-05ae7fe997c1</Info>
              <Info>Name: 2a7ee358-9862-4fec-addc-5b501a910bf1</Info>
              <Info>Description: b9e62b18-bef4-4c63-bb9f-8598226966c4</Info>
              <Info>Department: cfc03ecf-4526-4358-983a-1d155909db5f</Info>
              <Info>Status: e02a1c17-3632-4514-9125-a2027dc929b1</Info>
              <Info>Due Date: 47fd66f2-8934-4420-8f71-1b46d4afd44e</Info>
            </InfoColumn>
          </InfoColumns>
          <AppDevelopmentAddOrganization />
          <AppDevelopmentAddProject />
          <AppDevelopmentAddTable />
          <AppDevelopmentAddStructure />
          <AppDevelopmentAddRow />
        </Content>
      </AppContentContainer>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppDevelopment.propTypes = {
  isActive: bool,
  cognitoSub: string
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
const Content = styled.div`
  width: 100%;
  padding: 2vw;
`

const InfoColumns = styled.div`
  display: flex;
  justify-content: space-between;
`

const InfoColumn = styled.div``

const Info = styled.div`
  margin: 0.5vh 0;
  font-weight: bold;
`