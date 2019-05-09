//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors, layout } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureContent = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 25%;
  height: calc(100vh - ${ layout.CONTAINER_HEADER_HEIGHT });
  overflow-y: scroll;
  border-right: 1px dashed ${ colors.SETTINGS_STRUCTURE_COLUMN_BORDER };
`

export default AppSettingsStructureContent