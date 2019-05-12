//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config'

import Icon from '../components/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableAction extends Component {

  state = {
    isDescriptionVisible: false
  }
  
  render() {
    const { 
      description,
      icon, 
      onClick 
    } = this.props
    const {
      isDescriptionVisible
    } = this.state
    return (
      <Container
        onClick={() => onClick()}
        onMouseEnter={() => this.setState({ isDescriptionVisible: true })}
        onMouseLeave={() => this.setState({ isDescriptionVisible: false })}>
        <Icon 
          icon={icon}
          size="1.25em"/>
        <Description
          isDescriptionVisible={isDescriptionVisible}>
          {description}
        </Description>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableAction.propTypes = {
  description: string,
  icon: string,
  onClick: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;
  cursor: pointer;
  background-color: ${ colors.TABLE_ACTION_BACKGROUND };
  color: ${ colors.TEXT_BLACK };
  padding: 0.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${ colors.TABLE_ACTION_BORDER };
`

const Description = styled.div`
  display: ${ props => props.isDescriptionVisible ? 'block' : 'none' };
  position: absolute;
  z-index: 10000;
  padding: 0.5vw;
  left: 0;
  top: 100%;
  background-color: ${ colors.TABLE_ACTION_DESCRIPTION_BACKGROUND };
  color: white;
  white-space: nowrap;
  border-top-left-radius: 5px;
  border-right: 5px solid ${ colors.TABLE_ACTION_DESCRIPTION_BORDER };
`

export default TableAction