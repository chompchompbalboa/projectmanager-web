//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import {
  updateActiveContainerId as updateActiveContainerIdAction
} from '../redux/view/viewActions'

import { selectContainerIds, selectContainers } from '../redux/container/containerSelectors'

import Icon from '../components/Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeContainerId: state.view.activeContainerId,
  containerIds: selectContainerIds(state),
  containers: selectContainers(state)
})

const mapDispatchToProps = dispatch => ({
  updateActiveContainerId: nextActiveContainerId => dispatch(updateActiveContainerIdAction(nextActiveContainerId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSidebar = ({
  activeContainerId,
  containerIds,
  containers,
  updateActiveContainerId
}) => {
  
	return (
		<Container>
			{containerIds.map(containerId => {
        const container = containers[containerId]
				return (
					<ActiveContainerChoice
						key={container.id}
						isActive={container.id === activeContainerId}
						onClick={() => updateActiveContainerId(container.id)}>
						<NameAndIconContainer>
              <Icon 
                icon={container.icon} 
                size={"calc(" + layout.SIDEBAR_WIDTH + " / 2.25)"}/>
							<ActiveContainerChoiceName>
								{container.name}
							</ActiveContainerChoiceName>
						</NameAndIconContainer>
					</ActiveContainerChoice>
				)
			})}
		</Container>
	)
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSidebar.propTypes = {
  activeContainerId: number,
  containerIds: array,
  containers: object,
  updateActiveContainerId: func
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

const ActiveContainerChoice = styled.div`
	cursor: pointer;
	width: 100%;
	height: 100%;
	height: ${layout.SIDEBAR_WIDTH};
	background-color: ${props => props.isActive ? colors.BACKGROUND_SECONDARY : 'transparent'};
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

const ActiveContainerChoiceName = styled.div`
	color: 
	margin-top: 0.5vh;
	font-size: 10px;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar)
