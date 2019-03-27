//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { array, bool, func, number, shape } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import { colors, layout } from '../../_config'

import TableCell from './TableCell'
import TableContextMenu from './TableContextMenu'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableRow extends PureComponent {

  state = {
    contextMenuOpen: false,
    contextMenuTop: null,
    contextMenuLeft: null
  }

  closeContextMenu = () => {
    this.setState({
      contextMenuOpen: false
    })
  }

  onRightClick = e => {
    e.preventDefault()
    this.setState({
      contextMenuOpen: true,
      contextMenuTop: e.clientY,
      contextMenuLeft: e.clientX
    })
  }

  render() {
    const { 
      columns, 
      deleteRow,
      isEditable, 
      row,
      updateCell
    } = this.props
    const {
      contextMenuOpen,
      contextMenuTop,
      contextMenuLeft
    } = this.state
    return (
      <Container
        onContextMenu={e => this.onRightClick(e)}>
        {row.cells.map((cell, index) => {
          const column = _.find(columns, ['id', cell.columnId])
          return (
            <TableCell
              key={cell.id}
              autofocus={index === 0}
              cellId={cell.id}
              isEditable={isEditable}
              placeholder={column.header + '...'}
              rowId={row.id}
              type={column.type}
              updateCell={updateCell}
              value={cell[column.type.toLowerCase()]}
              width={column.width}
            />
          )
        })}
        {contextMenuOpen && 
          <TableContextMenu
            closeContextMenu={this.closeContextMenu}
            deleteRow={deleteRow}
            rowId={row.id}
            top={contextMenuTop}
            left={contextMenuLeft}/>
        }
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableRow.propTypes = {
  columns: array,
  deleteRow: func,
  isEditable: bool,
	row: shape({
    id: number,
		cells: array
  }),
  updateCell: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	width: 100%;
	padding: calc(${ layout.TABLE_PADDING }/2);
	background-color: ${colors.BACKGROUND_SECONDARY};
	font-size: 13px;
	display: flex;
  justify-content: flex-start;
  align-items: center;
	border-right: 3px solid ${colors.BACKGROUND_SECONDARY};
	border-bottom: 1px solid ${colors.TEXT_LIGHT};
	&:hover {
		border-right: 3px solid ${colors.PRIMARY};
		background-color: ${colors.ACCENT};
	}
`

export default TableRow
