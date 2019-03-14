//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors } from './config'

import Logo from '../_lib/components/Logo'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const BoilerplateStateless = () => {
  return (
    <Container>
      <LeftColumn>
        <Logo/>
      </LeftColumn>
      <RightColumn>
        Right
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
  background-color: ${ colors.PRIMARY };
  color: white;
`

const RightColumn = styled(Column)`
`

export default BoilerplateStateless