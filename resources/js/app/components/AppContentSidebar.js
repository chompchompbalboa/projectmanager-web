//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import HiddenScrollbarContainer from './HiddenScrollbarContainer'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentSidebar = ({ children, header }) => {
  return (
    <Container>
      <Header>{header}</Header>
      <Items>
        {children}
      </Items>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
AppContentSidebar.propTypes = {
  header: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled(HiddenScrollbarContainer)`
  position: fixed;
  top: 0;
  left: ${ layout.SIDEBAR_WIDTH };
  width: ${ layout.CONTAINER_SIDEBAR_WIDTH };
  height: 100vh;
  background-color: ${ colors.CONTAINER_SIDEBAR_BACKGROUND };
  border-left: 0.5px dashed ${ colors.CONTAINER_SIDEBAR_BORDER };
`

const Header = styled.h3`
  margin: 1vw 0 3vh calc(1vw + 3px);
  color: ${ colors.TEXT_WHITE };
  font-size: 18px;
`

const Items = styled.div`
  width: 100%;
`

export default AppContentSidebar