//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, number } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import { query } from '../../_api'
import { colors, layout } from '../../_config'

import Loading from '../components/Loading'
import TableAction from './TableAction'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Table extends Component {

  constructor(props) {
    super(props)
  }

	state = {
    isLoading: true,
    columns: null,
    name: null,
    rows: null,
		sortOrder: null,
		sortColumn: null,
    tableId: null
  }

  actions = [
    { icon: "ACTION_ADD_ROW", onClick: () => this.createRow() }
  ]
  
  componentDidMount = () => {
    this.setState({
      tableId: this.props.id
    })
    this.fetchTable()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.id !== this.props.id) {
      this.setState({
        isAddingRow: false,
        tableId: this.props.id,
        columns: null,
        rows: null
      })
      this.fetchTable()
    }
  }

  createRow = () => {
    const {
      tableId,
      columns,
      rows
    } = this.state
    const newRowCells = columns.map((column, index) => {
      return {
        id: -1 * index,
        table_id: tableId,
        column_id: column.id,
        row_id: null,
        string: null,
        number: null,
        boolean: null,
        datetime: null
      }
    })
    const newRow = {
      id: _.random(-5000, -1),
      table_id: tableId,
      cells: newRowCells,
      isEditable: true
    }
    this.setState({
      rows: [newRow, ...rows]
    })
  }

  fetchTable = () => {
    const { 
      id 
    } = this.props
    query.getTable(id).then(table => {
      const {
        tableId
      } = this.state
      if(table.id === tableId) {
        const sortOrder = table.columns[0].default_sort_order
        const sortColumn = table.columns[0]
        this.setState({
          isLoading: false,
          columns: table.columns,
          name: table.name,
          rows: this.sortRows(table.rows, sortColumn, sortOrder),
          sortOrder: sortOrder,
          sortColumn: sortColumn
        })
      }
    })
  }

	sortRows = (rows, sortColumn, sortOrder) => {
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

	onHeaderClick = nextSortColumn => {
		const { 
      rows, 
      sortOrder, 
      sortColumn 
    } = this.state
		let nextSortOrder
		if (nextSortColumn.id === sortColumn.id) {
			nextSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
		} else {
			nextSortOrder = nextSortColumn.default_sort_order
    }
    const nextRows = this.sortRows(rows, nextSortColumn, nextSortOrder)
		this.setState({
      rows: nextRows,
			sortOrder: nextSortOrder,
			sortColumn: nextSortColumn
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
            {rows.map(row => {
              return (
                <TableRow 
                  key={row.id} 
                  columns={columns}
                  isEditable={row.isEditable}
                  row={row} />
            )})}
          </TableData>
          <TableActions>
            {this.actions.map(action => {
              return (
                <TableAction
                  key={action.icon}
                  icon={action.icon}
                  onClick={action.onClick}/>
            )})}
          </TableActions>
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
	columns: array,
  rows: array,
  setStatusMessage: func
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

const TableActions = styled.div`
  position: sticky;
  top: calc(-1 * (${ layout.PADDING } / 2));
  height: 100%;
  padding-left: calc(${ layout.PADDING } / 2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
