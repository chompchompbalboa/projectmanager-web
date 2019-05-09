//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number, object, oneOf } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../config'

import { 
  updateActiveContainerId as updateActiveContainerIdAction,
  updateActiveContent as updateActiveContentAction 
} from '../redux/active/activeActions'

import { selectContainerIds, selectContainers } from '../redux/container/containerSelectors'
import { selectActiveContainerId, selectActiveContent } from '../redux/active/activeSelectors'

import Icon from '../components/Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeContainerId: selectActiveContainerId(state),
  activeContent: selectActiveContent(state),
  containerIds: selectContainerIds(state),
  containers: selectContainers(state)
})

const mapDispatchToProps = dispatch => ({
  updateActiveContainerId: nextActiveContainerId => dispatch(updateActiveContainerIdAction(nextActiveContainerId)),
  updateActiveContent: nextActiveContent => dispatch(updateActiveContentAction(nextActiveContent))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSidebar = ({
  activeContainerId,
  activeContent,
  containerIds,
  containers,
  updateActiveContainerId,
  updateActiveContent
}) => {
	return (
		<Container>
      <TopContainer>
        {containerIds.map(containerId => {
          const container = containers[containerId]
          return (
            <ActiveContainerChoice
              key={container.id}
              isActive={activeContent === 'CONTAINER' && container.id === activeContainerId}
              onClick={() => updateActiveContainerId(container.id)}>
              <IconContainer>
                <Icon 
                  icon={container.icon} 
                  size={"calc(" + layout.SIDEBAR_WIDTH + " / 2)"}/>
              </IconContainer>
            </ActiveContainerChoice>
          )
        })}
      </TopContainer>
      <BottomContainer>
        <ActiveContainerChoice
          isActive={activeContent === 'SETTINGS'}
          onClick={() => updateActiveContent('SETTINGS')}>
          <IconContainer>
            <Icon 
              icon="SETTINGS" 
              size={"calc(" + layout.SIDEBAR_WIDTH + " / 2)"}/>
          </IconContainer>
        </ActiveContainerChoice>
      </BottomContainer>
		</Container>
	)
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSidebar.propTypes = {
  activeContainerId: number,
  activeContent: oneOf([
    'CONTAINER',
    'SETTINGS'
  ]),
  containerIds: array,
  containers: object,
  updateActiveContainerId: func,
  updateActiveContent: func
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TopContainer = styled.div`
  width: 100%;
`

const BottomContainer = styled.div`
  width: 100%;
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

const IconContainer = styled.div`
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
)(AppSidebar)
