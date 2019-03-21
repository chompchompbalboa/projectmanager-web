//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

import { query } from '../../_api'
import { colors, layout } from '../../_config'

import { setStatusMessage as setStatusMessageAction } from '../actions/statusActions'

import Loading from '../components/Loading'
import TableAction from './TableAction'
import TableAddRow from './TableAddRow'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
@connect(
  null,
  dispatch => ({
    setStatusMessage: (nextStatusMessage) => dispatch(setStatusMessageAction(nextStatusMessage))
  })
)

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Table extends Component {
	state = {
    isAddingRow: false,
    isLoading: true,
    columns: null,
    name: null,
    row: null,
		sortOrder: null,
		sortColumn: null
  }

  actions = [
    { icon: "ACTION_ADD", onClick: () => this.addRow() }
  ]
  
  componentDidMount = () => {
    this.setState({
      activeId: this.props.id
    })
    this.fetchTable()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.id !== this.props.id) {
      this.setState({
        isAddingRow: false,
        activeId: this.props.id,
        columns: null,
        rows: null
      })
      this.fetchTable()
    }
  }

  addRow = () => {
    const {
      setStatusMessage
    } = this.props
    this.setState({
      isAddingRow: true
    })
    setStatusMessage('ADDING_ROW')
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
      isAddingRow, 
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
            {isAddingRow && 
              <TableAddRow 
                columns={columns}/>}
            {this.sortRows(sortColumn, sortOrder).map(row => {
              return (
                <TableRow 
                  key={row.id} 
                  columns={columns}
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
