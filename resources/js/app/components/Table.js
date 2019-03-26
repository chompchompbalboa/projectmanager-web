//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { array, arrayOf, func, number, object, oneOf, shape } from 'prop-types'
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
    isGettingTable: false
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

	render() {
    const {
      actions,
      deleteRow,
      table,
      sortColumn,
      sortOrder,
      sortRows,
      updateCell,
      updateColumnWidths
    } = this.props
    if (table !== null) {
      const {
        rows,
        columns
      } = table
      return (
        <Container>
          <TableData>
            <TableHeader
              columns={columns}
              name={name}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
              sortRows={sortRows}
              updateColumnWidths={updateColumnWidths}/>
            {rows.map(row => {
              return (
                <TableRow 
                  key={row.id} 
                  columns={columns}
                  deleteRow={deleteRow}
                  isEditable={row.isEditable}
                  row={row}
                  updateCell={updateCell}/>
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
  deleteRow: func,
  setTable: func,
  sortColumn: object,
  sortOrder: oneOf(['ASC', 'DESC']),
  sortRows: func,
  table: shape({
    rows: array,
    columns: arrayOf(shape({
      defaultSortOrder: oneOf(['ASC', 'DESC'])
    })),
  }),
  updateCell: func,
  updateColumnWidths: func
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
