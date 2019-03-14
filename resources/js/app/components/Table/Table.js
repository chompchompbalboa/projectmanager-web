//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import { colors } from '../../../config'

import TableHeader from './TableHeader'
import TableRow from './TableRow'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Table extends Component {
	state = {
		sortOrder: this.props.structure[0].defaultSortOrder,
		sortField: this.props.structure[0].id
	}

	sortRows = (sortField, sortOrder) => {
    const { rows } = this.props
		const rowValue = row => {
			const sortCell = _.find(row.cells, cell => {
				return cell.structure.id === sortField
			})
			return sortCell.value
		}
		const compareRowValues = (row1, row2) => {
			const row1Value = rowValue(row1)
			const row2Value = rowValue(row2)
			if (row1Value < row2Value) return sortOrder === 'ASC' ? -1 : 1
			if (row1Value > row2Value) return sortOrder === 'ASC' ? 1 : -1
			return 0
		}

		return rows.sort(compareRowValues)
	}

	onHeaderClick = field => {
		const { structure } = this.props
		const { sortOrder, sortField } = this.state
		let nextSortOrder
		if (field === sortField) {
			nextSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
		} else {
			nextSortOrder = _.find(structure, ['id', field]).defaultSortOrder
		}
		this.setState({
			sortOrder: nextSortOrder,
			sortField: field
		})
	}

	render() {
		const { structure } = this.props
		const { sortOrder, sortField } = this.state

		const sortedRows = this.sortRows(sortField, sortOrder)

		return (
			<Container>
				<TableHeader
					sortOrder={sortOrder}
					sortField={sortField}
					onHeaderClick={this.onHeaderClick}
					structure={structure}
				/>
				{sortedRows.map(row => {
					return <TableRow key={row.id} row={row} />
				})}
			</Container>
		)
	}
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Table.propTypes = {
	rows: array,
	structure: array
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	background-color: ${colors.BACKGROUND_SECONDARY};
	color: ${colors.TEXT_DARK};
	box-shadow: 1px 1px 4px ${colors.BOX_SHADOW};
	display: flex;
	flex-direction: column;
`
