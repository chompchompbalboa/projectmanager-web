//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { colors, layout } from '../config'

import { updateActiveContainerId as updateActiveContainerIdAction } from '../redux/active/activeActions'

import { selectContainerIds, selectContainers } from '../redux/container/containerSelectors'
import { selectActiveContainerId } from '../redux/active/activeSelectors'

import Icon from '../components/Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeContainerId: selectActiveContainerId(state),
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
                size={"calc(" + layout.SIDEBAR_WIDTH + " / 2)"}/>
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
  background-color: ${colors.SIDEBAR_BACKGROUND};
`

const ActiveContainerChoice = styled.div`
	cursor: pointer;
	width: 100%;
	height: ${layout.SIDEBAR_WIDTH};
	background-color: ${props => props.isActive ? colors.SIDEBAR_BACKGROUND_ACTIVE : colors.SIDEBAR_BACKGROUND_INACTIVE};
	color: ${props => (props.isActive ? colors.SIDEBAR_TEXT_ACTIVE : colors.SIDEBAR_TEXT_INACTIVE)};
  display: flex;
  border-left: 3px solid ${props => props.isActive ? colors.SIDEBAR_BORDER_ACTIVE : colors.SIDEBAR_BORDER_INACTIVE};
  &:hover {
    background-color: ${ colors.SIDEBAR_BACKGROUND_ACTIVE };
  }
`

const NameAndIconContainer = styled.div`
	width: calc(100% - 3px);
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(AppSidebar))
