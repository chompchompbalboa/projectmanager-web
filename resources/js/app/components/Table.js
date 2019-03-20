//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, number } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import { query } from '../../_api'
import { colors, layout } from '../../_config'

import Loading from '../components/Loading'
import TableActions from './TableActions'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Table extends Component {
	state = {
    isLoading: true,
    columns: null,
    name: null,
    row: null,
		sortOrder: null,
		sortColumn: null
  }
  
  componentDidMount = () => {
    this.setState({
      activeId: this.props.id
    })
    this.fetchTable()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.id !== this.props.id) {
      this.setState({
        activeId: this.props.id,
        columns: null,
        rows: null
      })
      this.fetchTable()
    }
  }

  fetchTable = () => {
    const { 
      id 
    } = this.props
    query.getTable(id).then(table => {
      const {
        activeId
      } = this.state
      if(table.id === activeId) {
        this.setState({
          isLoading: false,
          columns: table.columns,
          name: table.name,
          rows: table.rows,
          sortOrder: table.columns[0].default_sort_order,
          sortColumn: table.columns[0]
        })
      }
    })
  }

	sortRows = (sortColumn, sortOrder) => {
    const { rows } = this.state
		const rowValue = row => {
			const sortCell = _.find(row.cells, cell => {
				return cell.column_id === sortColumn.id
      })
			return sortCell[sortColumn.type.toLowerCase()]
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

	onHeaderClick = column => {
		const { sortOrder, sortColumn } = this.state
		let nextSortOrder
		if (column.id === sortColumn.id) {
			nextSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
		} else {
			nextSortOrder = column.default_sort_order
		}
		this.setState({
			sortOrder: nextSortOrder,
			sortColumn: column
		})
	}

	render() {
    const { 
      columns, 
      name,
      rows, 
      sortOrder, 
      sortColumn 
    } = this.state
    if (rows && columns) {
      return (
        <Container>
          <TableData>
            <TableHeader
              columns={columns}
              name={name}
              onHeaderClick={this.onHeaderClick}
              sortColumn={sortColumn}
              sortOrder={sortOrder}/>
            {this.sortRows(sortColumn, sortOrder).map(row => {
              return (
                <TableRow 
                  key={row.id} 
                  columns={columns}
                  row={row} />
              )
            })}
          </TableData>
          <TableActions />
        </Container>
      )
    }
    return <Loading/>
	}
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Table.propTypes = {
  id: number,
	rows: array,
	columns: array
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
	display: flex;
`

const TableData = styled.div`
  width: 100%;
  margin-right: calc(${ layout.PADDING } / 2);
	background-color: ${colors.BACKGROUND_SECONDARY};
	color: ${colors.TEXT_DARK};
	box-shadow: 1px 1px 4px ${colors.BOX_SHADOW};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
