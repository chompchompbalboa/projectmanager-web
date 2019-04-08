//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { arrayOf, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../_config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class ContextMenu extends PureComponent {

  constructor(props) {
    super(props)
    this.contextMenuContainer = React.createRef()
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.checkForClickOutside, false)
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.checkForClickOutside, false)

  }

  checkForClickOutside = e => {
    if(!this.contextMenuContainer.current.contains(e.target)) {
      const {
        closeContextMenu
      } = this.props
      closeContextMenu()
    }
  }

  handleClick = action => {
    const {
      closeContextMenu
    } = this.props
    closeContextMenu()
    action()
  }
  
  render() {
    const {
      actions,
      top, 
      left
    } = this.props
    return (
      <Container
        ref={this.contextMenuContainer}
        contextMenuTop={top}
        contextMenuLeft={left}>
        {actions.map((action, index) => {
          return (
            <Action
              key={index}
              onClick={() => this.handleClick(action.action)}>
              {action.text}
            </Action>
          )
        })}
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ContextMenu.propTypes = {
  actions: arrayOf(shape({
    action: func,
    text: string
  })),
  closeContextMenu: func,
  top: number,
  left: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 10000;
  position: fixed;
  top: ${ props => props.contextMenuTop + 'px' };
  left: ${ props => (props.contextMenuLeft + 2) + 'px' };
  width: 10vw;
  background-color: white;
	box-shadow: 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.16);
`

const Action = styled.div`
  cursor: pointer;
  padding: 0.5vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-right: 3px solid transparent;
  &:hover {
    color: ${ colors.PRIMARY };
    border-right: 3px solid ${ colors.PRIMARY };
  }
`

export default ContextMenu