//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import { 
  updateActiveViewId as updateActiveViewIdAction 
} from '../redux/active/activeActions'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  updateActiveViewId: nextActiveViewId => dispatch(updateActiveViewIdAction(nextActiveViewId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerSidebarCollectionView = ({
  children,
  isActiveSubitem,
  onClick,
}) => {
  return (
    <Container>
      <Subitem
        isActiveSubitem={isActiveSubitem}
        onClick={onClick}>
        {children}
      </Subitem>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerSidebarCollectionView.propTypes = {
  isActiveSubitem: bool,
  onClick: func
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  padding: 0.25vh 0.5vw;
`

const Subitem = styled.div`
  cursor: pointer;
  width: 100%;
  font-size: 0.85rem;
  padding: 0.25vw 0.5vw;
  color: ${ colors.TEXT_WHITE };
  background-color: ${ props => props.isActiveSubitem ? colors.CONTAINER_SIDEBAR_VIEWS_ACTIVE : colors.CONTAINER_SIDEBAR_VIEWS_INACTIVE };
  border-radius: 5px;
  &:hover {
    background-color: ${ colors.CONTAINER_SIDEBAR_VIEWS_ACTIVE };
  }
`

export default connect(
  null,
  mapDispatchToProps
)(AppContainerSidebarCollectionView)