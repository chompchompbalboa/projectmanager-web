//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, shape } from 'prop-types'
import _ from 'lodash'

import TableRowContainer from './TableRowContainer'
import TableCell from './TableCell'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableRow = ({ columns, row }) => {
	return (
		<TableRowContainer>
			{row.cells.map((cell, index) => {
        const column = _.find(columns, ['id', cell.column_id])
				return (
					<TableCell
            key={cell.id}
            autofocus={index === 0}
            isEditable={row.isEditable}
            placeholder={column.header + '...'}
            type={cell.type}
						value={cell[column.type.toLowerCase()]}
						width={column.width}
					/>
				)
			})}
		</TableRowContainer>
	)
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableRow.propTypes = {
  columns: array,
	row: shape({
		cells: array
	})
}

export default TableRow
