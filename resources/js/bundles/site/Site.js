//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors } from './config'

import Button from 'components/Button'
import Logo from 'components/Logo'
import Spacer from 'components/Spacer'
import Tagline from 'components/Tagline'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Site = () => {
  return (
    <Container>
      <LeftColumn>
        <Logo/>
      </LeftColumn>
      <RightColumn>
        <Spacer
          height="12vh"/>
        <Tagline/>
        <Spacer/>
        <Button 
          backgroundColor={colors.BACKGROUND}
          onClick={() => window.location = './app'}
          text="Give it a try&nbsp;&nbsp;&rarr;"/>
      </RightColumn>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

const Column = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftColumn = styled(Column)`
  background-color: ${ colors.BACKGROUND };
  color: white;
`

const RightColumn = styled(Column)`
  display: flex;
  flex-direction: column;
`

export default Site