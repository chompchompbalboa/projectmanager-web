//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppDevelopmentContainer = ({ buttonText, children, header, onActionButtonClick, status }) => {
  return (
    <Container>
      <Header>
        <HeaderText>{header}</HeaderText>
        <ActionContainer>
          <HeaderActionStatus>
            {status}
          </HeaderActionStatus>
          <HeaderActionButton
            onClick={() => onActionButtonClick()}>
            {buttonText}
          </HeaderActionButton>
        </ActionContainer>
      </Header>
      <Content>{children}</Content>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppDevelopmentContainer.propTypes = {
  buttonText: string,
  header: string,
  onActionButtonClick: func,
  status: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  margin: 2vh 0;
`
const Header = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderText = styled.div``

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`

const HeaderActionStatus = styled.div`
  margin-right: 1vw;
  font-weight: normal;
`

const HeaderActionButton = styled.div`
  cursor: pointer;
  padding: 0.5vh 1vh;
  background-color: ${ colors.PRIMARY };
  color: white;
  border-radius: 5px;
`

const Content = styled.div`
  margin: 1vh 0 0.5vh 0;
  padding: 0.75vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
`

export default AppDevelopmentContainer