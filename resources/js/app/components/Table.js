//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { array, arrayOf, func, number, object, oneOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { query } from '../../_api'
import { colors, layout } from '../../_config'

import { 
  createColumn as createColumnAction,
  createRow as createRowAction,
  deleteRow as deleteRowAction,
  setTable as setTableAction,
  sortRows as sortRowsAction,
  toggleColumnIsEditable as toggleColumnIsEditableAction,
  updateCell as updateCellAction,
  updateColumnWidths as updateColumnWidthsAction
} from '../redux/table/tableActions'

import Loading from '../components/Loading'
import TableAction from './TableAction'
import TableContextMenu from './TableContextMenu'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  id: state.table.id,
  columns: state.table.columns,
  rows: state.table.rows,
  sortColumn: state.table.sortColumn,
  sortOrder: state.table.sortOrder
})

const mapDispatchToProps = dispatch => ({
  createColumn: (columnId, beforeOrAfter) => dispatch(createColumnAction(columnId, beforeOrAfter)),
  createRow: () => dispatch(createRowAction()),
  deleteRow: rowId => dispatch(deleteRowAction(rowId)),
  setTable: nextTable => dispatch(setTableAction(nextTable)),
  sortRows: nextSortColumn => dispatch(sortRowsAction(nextSortColumn)),
  toggleColumnIsEditable: columnId => dispatch(toggleColumnIsEditableAction(columnId)),
  updateCell: (rowId, cellId, type, value) => dispatch(updateCellAction(rowId, cellId, type, value)),
  updateColumnWidths: nextColumnWidths => dispatch(updateColumnWidthsAction(nextColumnWidths))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class Table extends PureComponent {
  
  state = {
    contextMenuColumnOrRow: null,
    contextMenuId: null,
    contextMenuTop: null,
    contextMenuLeft: null,
    isContextMenuOpen: false,
    isGettingTable: false
  }

  actions = [
    { icon: "ACTION_CREATE_ROW", onClick: this.props.createRow }
  ]
  
  componentDidMount = () => {
    const {
      columns,
      rows
    } = this.props
    if(rows === null || columns === null) {
      this.getTable()
    }
  }

  componentDidUpdate = () => {
    const {
      columns,
      rows
    } = this.props
    if(rows === null || columns === null) {
      this.getTable()
    }
  }

  closeContextMenu = async () => {
    this.setState({
      isContextMenuOpen: false
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
        setTable(nextTable)
        this.setState({
          isGettingTable: false
        })
      })
    }
  }

  openContextMenu = (e, columnOrRow, id) => {
    e.preventDefault()
    this.setState({
      contextMenuId: id,
      isContextMenuOpen: true,
      contextMenuColumnOrRow: columnOrRow,
      contextMenuTop: e.clientY,
      contextMenuLeft: e.clientX
    })
  }

	render() {
    const {
      columns,
      createColumn,
      deleteRow,
      rows,
      sortColumn,
      sortOrder,
      sortRows,
      toggleColumnIsEditable,
      updateCell,
      updateColumnWidths
    } = this.props
    const {
      contextMenuId,
      contextMenuColumnOrRow,
      contextMenuTop,
      contextMenuLeft,
      isContextMenuOpen
    } = this.state
    if (rows !== null && columns !== null) {
      return (
        <Container>
          <TableData>
            <TableBody>
              <TableHeader
                columns={columns}
                name={name}
                openContextMenu={this.openContextMenu}
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
                    openContextMenu={this.openContextMenu}
                    row={row}
                    updateCell={updateCell}/>
              )})}
            </TableBody>
          </TableData>
          <TableActions>
            {this.actions.map(action => {
              return (
                <TableAction
                  key={action.icon}
                  icon={action.icon}
                  onClick={() => action.onClick()}/>
            )})}
          </TableActions>
          {isContextMenuOpen && 
            <TableContextMenu
              id={contextMenuId}
              closeContextMenu={this.closeContextMenu}
              columnOrRow={contextMenuColumnOrRow}
              createColumn={createColumn}
              deleteRow={deleteRow}
              toggleColumnIsEditable={toggleColumnIsEditable}
              top={contextMenuTop}
              left={contextMenuLeft}/>
          }
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
  columns: arrayOf(shape({
    defaultSortOrder: oneOf(['ASC', 'DESC'])
  })),
  createColumn: func,
  createRow: func,
  deleteRow: func,
  rows: array,
  setTable: func,
  sortColumn: object,
  sortOrder: oneOf(['ASC', 'DESC']),
  sortRows: func,
  toggleColumnIsEditable: func,
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

const TableData = styled.table`
  table-layout: fixed;
  width: 100%;
  height: 100%;
  margin-right: calc(${ layout.PADDING } / 2);
	background-color: ${colors.BACKGROUND_SECONDARY};
	color: ${colors.TEXT_DARK};
  border-spacing: 0;
	box-shadow: 1px 1px 4px ${colors.BOX_SHADOW};
`

const TableBody = styled.tbody`
  width: 100%;
  height: 100%;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)