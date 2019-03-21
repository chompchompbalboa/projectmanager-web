//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../_config'

import Icon from '../components/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableAction = ({ icon, onClick }) => {
  return (
    <Container
      onClick={() => onClick()}>
      <Icon 
        icon={icon}
        size="1.25em"/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableAction.propTypes = {
  icon: string,
  onClick: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  cursor: pointer;
  background-color: ${ colors.PRIMARY };
  color: white;
  padding: 0.25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${ colors.PRIMARY };
  border-radius: 5px;
`

export default TableAction