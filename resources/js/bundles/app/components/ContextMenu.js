//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { arrayOf, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config'

import Icon from '../components/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class ContextMenu extends PureComponent {

  constructor(props) {
    super(props)
    this.contextMenuContainer = React.createRef()
  }

  state = {
    activeSubmenuIndex: null
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
    const {
      activeSubmenuIndex
    } = this.state
    return (
      <Container
        ref={this.contextMenuContainer}
        contextMenuTop={top}
        contextMenuLeft={left}>
        {actions.map((action, actionIndex) => {
          return (
            <ActionContainer
              key={actionIndex}>
              <Action
                hasSubmenu={typeof action.submenu !== 'undefined'}
                onClick={() => this.handleClick(action.action)}
                onMouseEnter={() => this.setState({ activeSubmenuIndex: actionIndex })}>
                <ActionText>
                  {action.text}
                </ActionText>
                <ActionIcon>
                  {action.submenu && <Icon icon="CHEVRON_RIGHT"/>}
                </ActionIcon>
              </Action>
              {action.submenu &&
                <>
                  <Submenu
                    isVisible={activeSubmenuIndex === actionIndex}>
                    {action.submenu && action.submenu.map((menuItem, menuItemIndex) => {
                      return (
                        <Action
                          key={menuItemIndex}
                          onClick={() => this.handleClick(menuItem.action)}>
                          {menuItem.text}
                        </Action>
                      )
                    })}
                  </Submenu>
                </>
              }
            </ActionContainer>
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
  z-index: 100000;
  position: fixed;
  top: ${ props => props.contextMenuTop + 'px' };
  left: ${ props => (props.contextMenuLeft + 2) + 'px' };
  width: 10vw;
  background-color: white;
	box-shadow: 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.16);
`

const ActionContainer = styled.div`
  position: relative;
  width: 100%;
`

const Submenu = styled.div`
  display: ${ props => props.isVisible ? 'block' : 'none' };
  position: absolute;
  left: 100%;
  top: 0;
  width: 10vw;
  background-color: white;
	box-shadow: 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.16);
`

const Action = styled.div`
  cursor: pointer;
  padding: 0.5vw;
  padding-right: ${props => props.hasSubmenu ? '0' : '0.5vw'}
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-right: ${props => props.hasSubmenu ? 'none' : '3px solid transparent'};
  &:hover {
    color: ${ colors.PRIMARY };
    border-right: ${props => props.hasSubmenu ? 'none' : '3px solid ' + colors.PRIMARY};
  }
`

const ActionText = styled.div`
`

const ActionIcon = styled.div`
`

export default ContextMenu