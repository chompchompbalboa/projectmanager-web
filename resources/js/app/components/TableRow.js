//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { array, bool, func, number, shape } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import { colors } from '../../_config'

import TableCell from './TableCell'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableRow extends PureComponent {

  render() {
    const { 
      columns, 
      openContextMenu,
      row,
      updateCell
    } = this.props
    return (
      <Container
        onContextMenu={e => openContextMenu(e, 'ROW', row.id)}>
        {columns.map((column) => {
          const cell = _.find(row.cells, ['columnId', column.id])
          return (
            <TableCell
              key={cell.id}
              cell={cell}
              rowId={row.id}
              type={column.type}
              updateCell={updateCell}
              value={cell[column.type.toLowerCase()]}
            />
          )
        })}
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
  openContextMenu: func,
	row: shape({
    id: number,
		cells: array
  }),
  updateCell: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.tr`
	width: 100%;
	background-color: ${colors.BACKGROUND_SECONDARY};
	font-size: 13px;
	&:hover {
		background-color: ${colors.ACCENT};
	}
`

export default TableRow
