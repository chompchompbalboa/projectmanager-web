//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureView = ({
  view
}) => {
  return (
    <Container>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{view.name}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default AppSettingsStructureView