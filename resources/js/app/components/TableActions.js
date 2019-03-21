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
const TableActions = () => {
  return (
    <Container>
      <ActionContainer>
        <Icon 
          icon="ACTION_ADD"
          size="1.25em"/>
      </ActionContainer>
      <ActionContainer>
        <Icon 
          icon="ACTION_ADD"
          size="1.25em"/>
      </ActionContainer>
      <ActionContainer>
        <Icon 
          icon="ACTION_ADD"
          size="1.25em"/>
      </ActionContainer>
      <ActionContainer>
        <Icon 
          icon="ACTION_ADD"
          size="1.25em"/>
      </ActionContainer>
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
  position: fixed;
  top: calc(${ layout.HEADER_HEIGHT} + (${ layout.PADDING } / 2));
  padding-left: calc(${ layout.PADDING } / 2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const ActionContainer = styled.div`
  cursor: pointer;
  background-color: ${ colors.PRIMARY };
  color: white;
  padding: 0.25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${ colors.PRIMARY };
  border-radius: 5px;
`

export default TableActions