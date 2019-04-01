//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { bool, func, number } from 'prop-types'
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
      columnId,
      createColumn
    } = this.props
    return [
      { text: 'Insert Before', action: () => createColumn(columnId, 'BEFORE') },
      { text: 'Insert After', action: () => createColumn(columnId, 'AFTER') },
    ]
  }

  rowActions = () => {
    const {
      deleteRow,
      rowId
    } = this.props
    return [
      { text: 'Delete', action: () => deleteRow(rowId) }
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
    closeContextMenu().then(
      action()
    )
  }
  render() {
    const {
      isHeader,
      top, 
      left
    } = this.props
    const actions = isHeader ? this.columnActions() : this.rowActions()
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
  columnId: number,
  closeContextMenu: func,
  createColumn: func,
  deleteRow: func,
  isHeader: bool,
  rowId: number,
  top: number,
  left: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
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