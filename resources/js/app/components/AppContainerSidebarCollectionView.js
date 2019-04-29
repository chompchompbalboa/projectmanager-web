//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerSidebarCollectionView = ({
  view: {
    name
  }
}) => {
  return (
    <Container>
      {name}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerSidebarCollectionView.propTypes = {
  view: shape({
    name: string
  })
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  padding: 0.25vh 1vw;
  color: ${ colors.TEXT_WHITE };
`

export default AppContainerSidebarCollectionView