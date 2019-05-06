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
const DropdownItem = ({ 
  children,
  onClick,
  text
}) => {
  return (
    <Container
      onClick={onClick}>
      { children ? children : text }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
DropdownItem.propTypes = {
  onClick: func,
  text: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  cursor: pointer;
  padding: 0.45rem 1rem;
  border-right: 5px solid ${ colors.DROPDOWN_ITEM_BORDER };
  &:hover {
    background-color: ${ colors.DROPDOWN_ITEM_BACKGROUND_HOVER };
    border-right: 5px solid ${ colors.DROPDOWN_ITEM_BORDER_HOVER };
  }
`

export default DropdownItem