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
const TableRow = ({ columns, row: { cells } }) => {
	return (
		<TableRowContainer>
			{cells.map(cell => {
        const column = _.find(columns, ['id', cell.column_id])
				return (
					<TableCell
            key={cell.id}
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
