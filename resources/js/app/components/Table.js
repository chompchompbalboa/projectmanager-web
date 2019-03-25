//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { array, arrayOf, func, number, oneOf, shape } from 'prop-types'
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
export default class Table extends PureComponent {
  
  state = {
    isGettingTable: false,
    sortColumn: this.props.table ? this.props.table.columns[0] : null,
    sortOrder: this.props.table ? this.props.table.columns[0].defaultSortOrder : null
  }
  
  componentDidMount = () => {
    const {
      table
    } = this.props
    table === null && this.getTable()
  }

  componentDidUpdate = () => {
    const {
      table
    } = this.props
    if(table === null) {
      this.getTable()
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

  getTable = () => {
    const { 
      id,
      setTable
    } = this.props
    const {
      isGettingTable
    } = this.state
    if(!isGettingTable) {
      this.setState({
        isGettingTable: true
      })
      id !== null && query.getTable(id).then(nextTable => {
        this.setState({
          sortColumn: nextTable.columns[0],
          sortOrder: nextTable.columns[0].defaultSortOrder
        })
        setTable(nextTable)
        this.setState({
          isGettingTable: false
        })
      })
    }
  }

	sortRows = (rows, sortColumn, sortOrder) => {
		const rowValue = row => {
			const sortCell = _.find(row.cells, cell => {
				return cell.columnId === sortColumn.id
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
    let sortableRows = []
    let nonSortableRows = []
    rows.map(row => {
      if (row.isSortable === false) {
        nonSortableRows.push(row)
      } else {
        sortableRows.push(row)
      }
    })

		return nonSortableRows.concat(sortableRows.sort(compareRowValues))
	}

	onHeaderClick = nextSortColumn => {
		const { 
      sortOrder, 
      sortColumn 
    } = this.state
    let nextSortOrder
    
		if (nextSortColumn.id === sortColumn.id) {
			nextSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
		} else {
			nextSortOrder = nextSortColumn.defaultSortOrder
    }
		this.setState({
			sortOrder: nextSortOrder,
			sortColumn: nextSortColumn
		})
  }

	render() {
    const {
      actions,
      table
    } = this.props
    const {
      sortColumn,
      sortOrder
    } = this.state
    if (table !== null) {
      const {
        rows,
        columns
      } = table
      const sortedRows = this.sortRows(rows, sortColumn, sortOrder)
      return (
        <Container>
          <TableData>
            <TableHeader
              columns={columns}
              name={name}
              onHeaderClick={this.onHeaderClick}
              sortColumn={sortColumn}
              sortOrder={sortOrder}/>
            {sortedRows.map(row => {
              return (
                <TableRow 
                  key={row.id} 
                  columns={columns}
                  isEditable={row.isEditable}
                  row={row}/>
            )})}
          </TableData>
          <TableActions>
            {actions.map(action => {
              return (
                <TableAction
                  key={action.icon}
                  icon={action.icon}
                  onClick={() => action.onClick()}/>
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
  actions: array,
  setTable: func,
  table: shape({
    rows: array,
    columns: arrayOf(shape({
      defaultSortOrder: oneOf(['ASC', 'DESC'])
    })),
  })
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
