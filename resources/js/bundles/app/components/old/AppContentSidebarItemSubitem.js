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
const AppContentSidebarItemSubitem = ({
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
AppContentSidebarItemSubitem.propTypes = {
  isActiveSubitem: bool,
  onClick: func
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const Subitem = styled.div`
  cursor: pointer;
  width: 100%;
  font-size: 0.85rem;
  padding: 0.375vw 0.5vw 0.375vw 1.5vw;
  color: ${ colors.TEXT_WHITE };
  background-color: ${ props => props.isActiveSubitem ? colors.CONTAINER_SIDEBAR_VIEWS_ACTIVE : colors.CONTAINER_SIDEBAR_VIEWS_INACTIVE };
  &:hover {
    background-color: ${ colors.CONTAINER_SIDEBAR_VIEWS_ACTIVE };
  }
`

export default connect(
  null,
  mapDispatchToProps
)(AppContentSidebarItemSubitem)