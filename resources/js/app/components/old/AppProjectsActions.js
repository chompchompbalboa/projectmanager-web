//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import Icon from '../components/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectsActions = () => {
  return (
    <Container>
      <ActionContainer>
        <Icon 
          icon="ACTION_ADD"
          size="1.25em"/>
      </ActionContainer>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  padding-right: ${ layout.PADDING };
`

const ActionContainer = styled.div`
  cursor: pointer;
  color: ${ colors.PRIMARY };
  margin-left: 0.5vw;
  padding: 0.25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${ colors.PRIMARY };
  border-radius: 5px;
`

const ActionText = styled.div`
  font-size: 0.75em;
  font-weight: bold;
`

export default AppProjectsActions