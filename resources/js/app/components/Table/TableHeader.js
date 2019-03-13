//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, func, number, oneOf, shape, string } from 'prop-types'

import { colors } from '../../config'

import TableCell from './TableCell'
import TableRowContainer from './TableRowContainer'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableHeader = ({ onHeaderClick, sortOrder, sortField, structure }) => {
	return (
		<TableRowContainer backgroundColor={colors.ACCENT} isHeader>
			{structure.map((field, index) => {
				const header = () => {
					if (field.id === sortField) {
						let arrowDirection =
							sortOrder === field.defaultSortOrder ? 'DOWN' : 'UP'
						return arrowDirection === 'UP' ? (
							<span>{field.header}&nbsp;&nbsp;&#9650;</span>
						) : (
							<span>{field.header}&nbsp;&nbsp;&#9660;</span>
						)
					}
					return field.header
				}
				return (
					<TableCell
						key={index}
						onClick={() => onHeaderClick(field.id)}
						value={header()}
						valueCursor={'pointer'}
						width={field.width}
					/>
				)
			})}
		</TableRowContainer>
	)
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableHeader.propTypes = {
	onHeaderClick: func,
	sortField: number,
	sortOrder: oneOf(['ASC', 'DESC']),
	structure: arrayOf(
		shape({
			header: string
		})
	)
}

export default TableHeader
