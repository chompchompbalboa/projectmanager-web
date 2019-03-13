//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, oneOf } from 'prop-types'
import styled from 'styled-components'

import { colors, enums } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectChooseContent = ({ activeProjectContent, activeProjectContentChoices, changeActiveProjectContent }) => {
  return (
    <Container>
      {activeProjectContentChoices.map((activeProjectContentChoice, index) => {
        const formattedActiveProjectContentChoice = 
          activeProjectContentChoice === 'RFI' 
          ? activeProjectContentChoice 
          : activeProjectContentChoice.charAt(0).toUpperCase() + activeProjectContentChoice.slice(1).toLowerCase()
        return (
          <ContentChoiceContainer
            key={index}
            isActiveProjectContent={activeProjectContent === activeProjectContentChoice}
            onClick={() => changeActiveProjectContent(activeProjectContentChoice)}>
            {formattedActiveProjectContentChoice}
          </ContentChoiceContainer>
        )
      })}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjectChooseContent.propTypes = {
  activeProjectContent: oneOf(enums.PROJECT_CONTENT),
  activeProjectContentChoices: array,
  changeActiveProjectContent: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
`

const ContentChoiceContainer = styled.div`
  cursor: pointer;
  padding: 0.25vh 1.5vw;
  margin-bottom: 2.5vh;
  font-size: 13px;
  color: ${ props => props.isActiveProjectContent ? colors.PRIMARY : colors.TEXT_INACTIVE };
  border-bottom: ${ props => props.isActiveProjectContent ? '2px solid ' + colors.PRIMARY : '1.25px solid ' + colors.TEXT_LIGHT };
  &:hover {
    color: ${ colors.PRIMARY };
    border-bottom: 2px solid ${ colors.PRIMARY };
  }
`

export default AppProjectChooseContent