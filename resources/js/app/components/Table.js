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
  createTable as createTableAction,
  deleteColumn as deleteColumnAction,
  deleteRow as deleteRowAction,
  setTable as setTableAction,
  sortRows as sortRowsAction,
  toggleColumnIsEditing as toggleColumnIsEditingAction,
  toggleColumnIsRenaming as toggleColumnIsRenamingAction,
  updateCell as updateCellAction,
  updateColumnWidths as updateColumnWidthsAction,
  updateColumnName as updateColumnNameAction
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
  createTable: () => dispatch(createTableAction()),
  deleteColumn: columnId => dispatch(deleteColumnAction(columnId)),
  deleteRow: rowId => dispatch(deleteRowAction(rowId)),
  setTable: nextTable => dispatch(setTableAction(nextTable)),
  sortRows: (nextSortColumn, nextSortOrder) => dispatch(sortRowsAction(nextSortColumn, nextSortOrder)),
  toggleColumnIsEditing: columnId => dispatch(toggleColumnIsEditingAction(columnId)),
  toggleColumnIsRenaming: columnId => dispatch(toggleColumnIsRenamingAction(columnId)),
  updateCell: (rowId, cellId, type, value) => dispatch(updateCellAction(rowId, cellId, type, value)),
  updateColumnWidths: nextColumnWidths => dispatch(updateColumnWidthsAction(nextColumnWidths)),
  updateColumnName: (columnId, nextName) => dispatch(updateColumnNameAction(columnId, nextName))
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

  closeContextMenu = () => {
    this.setState({
      isContextMenuOpen: false
    })
  }

  getTable = () => {
    const { 
      createTable,
      id,
      setTable
    } = this.props
    const {
      isGettingTable
    } = this.state
    if(!isGettingTable) {
      if (id < 0) {
        createTable(id)
      }
      else {
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
      deleteColumn,
      deleteRow,
      rows,
      sortColumn,
      sortOrder,
      sortRows,
      toggleColumnIsEditing,
      toggleColumnIsRenaming,
      updateCell,
      updateColumnName,
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
                toggleColumnIsRenaming={toggleColumnIsRenaming}
                updateColumnName={updateColumnName}
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
              deleteColumn={deleteColumn}
              deleteRow={deleteRow}
              sortRows={sortRows}
              toggleColumnIsEditing={toggleColumnIsEditing}
              toggleColumnIsRenaming={toggleColumnIsRenaming}
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
  createTable: func,
  deleteColumn: func,
  deleteRow: func,
  rows: array,
  setTable: func,
  sortColumn: object,
  sortOrder: oneOf(['ASC', 'DESC']),
  sortRows: func,
  toggleColumnIsEditing: func,
  toggleColumnIsRenaming: func,
  updateCell: func,
  updateColumnName: func,
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
  top: calc(${ layout.PADDING } / 2);
  height: 100%;
  padding: 0 calc(${ layout.PADDING } / 2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)