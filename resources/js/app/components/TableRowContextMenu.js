//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { func, number } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableRowContextMenu extends PureComponent {

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

  render() {
    const {
      deleteRow,
      rowId,
      top, 
      left
    } = this.props
    return (
      <Container
        ref={this.contextMenuContainer}
        contextMenuTop={top}
        contextMenuLeft={left}>
        <Action
          onClick={() => deleteRow(rowId)}>
          Delete
        </Action>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableRowContextMenu.propTypes = {
  closeContextMenu: func,
  deleteRow: func,
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
`

export default TableRowContextMenu