//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, shape } from 'prop-types'

import TableRowContainer from './TableRowContainer'
import TableCell from './TableCell'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableRow = ({ row: { cells } }) => {
	return (
		<TableRowContainer>
			{cells.map(cell => {
				return (
					<TableCell
						key={cell.id}
						value={cell.value}
						width={cell.structure.width}
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
	row: shape({
		cells: array
	})
}

export default TableRow
