//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class TableRowHeader extends Component {
  render() {
    return (
      <Container>
        <RowHeader>
        </RowHeader>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.td`
  height: 100%;
  background-color: white;
`

const RowHeader = styled.div`
  width: 3vw;
  height: 100%;
`