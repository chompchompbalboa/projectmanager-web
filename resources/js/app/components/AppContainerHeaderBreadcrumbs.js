//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors } from '../config'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerHeaderBreadcrumbs = () => {
  return (
    <Container>
      <Breadcrumb>
        Container
      </Breadcrumb>
      <Separator>
      >
      </Separator>
      <Breadcrumb>
        Collection
      </Breadcrumb>
      <Separator>
      >
      </Separator>
      <Breadcrumb>
        View
      </Breadcrumb>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
`

const Breadcrumb = styled.div`
  cursor: pointer;
  margin-top: 1px;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${ colors.TEXT_WHITE};
  }
`

const Separator = styled.div`
  margin: 0 0.5rem;
`

export default AppContainerHeaderBreadcrumbs