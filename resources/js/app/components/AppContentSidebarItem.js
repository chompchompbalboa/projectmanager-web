//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentSidebarItem = ({ 
  children,
  isActiveItem,
  name,
  onClick
}) => {
  return (
    <Container>
      <Item
        isActiveItem={isActiveItem}
        onClick={onClick}>
        {name}
      </Item>
      <SubItems>
        {children}
      </SubItems>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContentSidebarItem.propTypes = {
  isActiveItem: bool,
  name: string,
  onClick: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
`

const Item = styled.div`
  cursor: pointer;
  padding: 0.9vh 1vw;
  width: 100%;
  text-overflow: ellipsis;
  color: ${ props => props.isActiveItem ? colors.TEXT_WHITE : colors.TEXT_WHITE_INACTIVE };
  background-color: ${ props => props.isActiveItem ? colors.CONTAINER_SIDEBAR_BACKGROUND_ACTIVE : colors.CONTAINER_SIDEBAR_BACKGROUND_INACTIVE };
  border-left: 3px solid ${ props => props.isActiveItem ? colors.CONTAINER_SIDEBAR_BORDER_ACTIVE : colors.CONTAINER_SIDEBAR_BORDER_INACTIVE };
  &:hover {
    background-color: ${ colors.CONTAINER_SIDEBAR_BACKGROUND_ACTIVE};
  }
`

const SubItems = styled.div`
  width: 100%;
  background-color: ${ colors.CONTAINER_SIDEBAR_VIEWS_BACKGROUND};
  border-left: 3px solid ${ colors.CONTAINER_SIDEBAR_BORDER_ACTIVE };
`

export default AppContentSidebarItem