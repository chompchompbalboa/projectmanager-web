//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, oneOf } from 'prop-types'
import styled from 'styled-components'

import { colors, enums, layout } from '../../_config'

import Icon from '../components/Icon'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSidebar = ({
	activeContent,
	activeContentChoices,
	changeActiveContent
}) => {
  
  const contentChoiceNames = {
    ME: "Me",
    ORGANIZATION: "Org",
    PROJECTS: "Projects",
    SETTINGS: "Settings"
  }
	return (
		<Container>
			{activeContentChoices.map((activeContentChoice, index) => {
				return (
					<ActiveContentChoice
						key={index}
						isActive={activeContentChoice === activeContent}
						onClick={() => changeActiveContent(activeContentChoice)}>
						<NameAndIconContainer>
              <Icon 
                icon={activeContentChoice} 
                size={"calc(" + layout.SIDEBAR_WIDTH + " / 2.25)"}/>
							<ActiveContentChoiceName>
								{contentChoiceNames[activeContentChoice]}
							</ActiveContentChoiceName>
						</NameAndIconContainer>
					</ActiveContentChoice>
				)
			})}
		</Container>
	)
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSidebar.propTypes = {
	activeContent: oneOf(enums.CONTENT),
	activeContentChoices: array,
	changeActiveContent: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: ${layout.SIDEBAR_WIDTH};
	height: 100vh;
  background-color: ${colors.BACKGROUND_SECONDARY};
  box-shadow: 0px 0px 2px ${ colors.BOX_SHADOW }
`

const ActiveContentChoice = styled.div`
	cursor: pointer;
	width: 100%;
	height: 100%;
	height: ${layout.SIDEBAR_WIDTH};
	background-color: ${props =>
		props.isActive ? colors.BACKGROUND_SECONDARY : 'transparent'};
	color: ${props => (props.isActive ? colors.PRIMARY : colors.TEXT_INACTIVE)};
  display: flex;
  border-right: 3px solid ${props => props.isActive ? colors.PRIMARY : 'transparent'};
`

const NameAndIconContainer = styled.div`
	width: calc(100% - 3px);
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const ActiveContentChoiceName = styled.div`
	color: 
	margin-top: 0.5vh;
	font-size: 10px;
`

export default AppSidebar
