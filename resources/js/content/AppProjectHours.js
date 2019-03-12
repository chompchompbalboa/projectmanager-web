//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import hours from '../data/hours'

import Table from '../components/Table/Table'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppProjectHours extends Component {
  
  render() {
    return (
      <Container>
        <Table
          data={hours.data}
          structure={hours.structure}/>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`