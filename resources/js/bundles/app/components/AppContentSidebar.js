//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import HiddenScrollbarContainer from './HiddenScrollbarContainer'
import Logo from 'components/Logo'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentSidebar = ({ children }) => {
  return (
    <Container>
      <Header>
        <Logo
          alignItems="flex-start"
          fontSize="1.5rem"/>
      </Header>
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
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: ${ layout.SIDEBAR_WIDTH };
  height: 100vh;
  background-color: ${ colors.SIDEBAR_BACKGROUND };
  color: ${ colors.TEXT_WHITE };
  overflow-x: hidden;
  overflow-y: scroll;
  text-overflow: ellipsis;
`

const Header = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  padding: 1rem;
  background-color: ${ colors.SIDEBAR_BACKGROUND };
`

const Items = styled.div`
  position: relative;
  width: 100%;
  min-height: 25%;
  display: flex;
  flex-direction: column;
`

export default AppContentSidebar