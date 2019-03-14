//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, oneOf } from 'prop-types'
import styled from 'styled-components'

import { colors, enums, layout } from '../../config'

import Icon from '../components/Icon/Icon'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSidebar = ({
	activeContent,
	activeContentChoices,
	changeActiveContent
}) => {
	return (
		<Container>
			{activeContentChoices.map((activeContentChoice, index) => {
				// Convert the name from uppercase to first letter uppercase
				const activeContentChoiceName =
					activeContentChoice.slice(0, 1) +
					activeContentChoice.slice(1, activeContentChoice.length).toLowerCase()
				return (
					<ActiveContentChoice
						key={index}
						isActive={activeContentChoice === activeContent}
						onClick={() => changeActiveContent(activeContentChoice)}>
						<NameAndIconContainer>
							<Icon icon={activeContentChoice} />
							<ActiveContentChoiceName>
								{activeContentChoiceName}
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
	background-color: ${colors.PRIMARY};
`

const ActiveContentChoice = styled.div`
	cursor: pointer;
	width: 100%;
	height: 100%;
	height: ${layout.SIDEBAR_WIDTH};
	background-color: ${props =>
		props.isActive ? colors.BACKGROUND_SECONDARY : 'transparent'};
	color: ${props => (props.isActive ? colors.TEXT_DARK : colors.TEXT_INACTIVE)};
	display: flex;
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
