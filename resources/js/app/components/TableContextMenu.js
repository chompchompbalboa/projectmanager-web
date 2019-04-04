//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { bool, func, number, oneOf } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../_config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableContextMenu extends PureComponent {

  constructor(props) {
    super(props)
    this.contextMenuContainer = React.createRef()
  }
  
  columnActions = () => {
    const {
      createColumn,
      deleteColumn,
      id,
      toggleColumnIsEditable
    } = this.props
    return [
      { text: 'Insert Before', action: () => createColumn(id, 'BEFORE') },
      { text: 'Insert After', action: () => createColumn(id, 'AFTER') },
      { text: 'Edit Column', action: () => toggleColumnIsEditable(id) },
      { text: 'Delete Column', action: () => deleteColumn(id) },
    ]
  }

  rowActions = () => {
    const {
      deleteRow,
      id
    } = this.props
    return [
      { text: 'Delete', action: () => deleteRow(id) }
    ]
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
      columnOrRow,
      top, 
      left
    } = this.props
    const actions = columnOrRow === 'COLUMN' ? this.columnActions() : this.rowActions()
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
TableContextMenu.propTypes = {
  columnOrRow: oneOf(['COLUMN', 'ROW']),
  closeContextMenu: func,
  createColumn: func,
  deleteColumn: func,
  deleteRow: func,
  id: number,
  isHeader: bool,
  rowId: number,
  toggleColumnIsEditable: func,
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

export default TableContextMenu