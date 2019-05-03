//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { number, shape, string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureModule = ({
  module
}) => {
  return (
    <Container>
      {module.type} - {module.typeId}
    </Container>
  )
}

export const AddModule = () => (
  <Container>
    Add...
  </Container>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureModule.propTypes = {
  module: shape({
    type: string,
    typeId: number
  })
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.h5`
  margin-left: 6vw;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export default AppSettingsStructureModule