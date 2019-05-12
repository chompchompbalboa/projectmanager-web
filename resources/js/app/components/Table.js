//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { array, arrayOf, func, number, object, oneOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { query } from '../../_api'
import { colors } from '../config'

import { 
  createColumn as createColumnAction,
  createRow as createRowAction,
  createTable as createTableAction,
  deleteColumn as deleteColumnAction,
  deleteRow as deleteRowAction,
  setTable as setTableAction,
  setTableId as setTableIdAction,
  sortRows as sortRowsAction,
  toggleColumnIsRenaming as toggleColumnIsRenamingAction,
  updateCell as updateCellAction,
  updateColumnWidths as updateColumnWidthsAction,
  updateColumnName as updateColumnNameAction,
  updateColumnType as updateColumnTypeAction
} from '../redux/table/tableActions'

import Loading from '../components/Loading'
import TableActions from './TableActions'
import TableContextMenu from './TableContextMenu'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  id: state.table.id,
  columns: state.table.columns,
  sortColumn: state.table.sortColumn,
  sortOrder: state.table.sortOrder,
  visibleRows: state.table.visibleRows
})

const mapDispatchToProps = dispatch => ({
  createColumn: (columnId, beforeOrAfter) => dispatch(createColumnAction(columnId, beforeOrAfter)),
  createRow: () => dispatch(createRowAction()),
  createTable: () => dispatch(createTableAction()),
  deleteColumn: columnId => dispatch(deleteColumnAction(columnId)),
  deleteRow: rowId => dispatch(deleteRowAction(rowId)),
  setTable: nextTable => dispatch(setTableAction(nextTable)),
  setTableId: nextTableId => dispatch(setTableIdAction(nextTableId)),
  sortRows: (nextSortColumn, nextSortOrder) => dispatch(sortRowsAction(nextSortColumn, nextSortOrder)),
  toggleColumnIsRenaming: columnId => dispatch(toggleColumnIsRenamingAction(columnId)),
  updateCell: (rowId, cellId, type, value) => dispatch(updateCellAction(rowId, cellId, type, value)),
  updateColumnWidths: nextColumnWidths => dispatch(updateColumnWidthsAction(nextColumnWidths)),
  updateColumnName: (columnId, nextName) => dispatch(updateColumnNameAction(columnId, nextName)),
  updateColumnType: (columnId, nextType) => dispatch(updateColumnTypeAction(columnId, nextType))
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
  
  componentDidMount = () => {
    this.getTable()
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
      moduleTypeId,
      setTable,
      setTableId,
    } = this.props
    const {
      isGettingTable
    } = this.state
    if(!isGettingTable) {
      if(id === null || id !== moduleTypeId) {
        setTableId(moduleTypeId)
      }
      else if (id < 0) {
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
      sortColumn,
      sortOrder,
      sortRows,
      toggleColumnIsRenaming,
      updateCell,
      updateColumnName,
      updateColumnType,
      updateColumnWidths,
      visibleRows
    } = this.props
    const {
      contextMenuId,
      contextMenuColumnOrRow,
      contextMenuTop,
      contextMenuLeft,
      isContextMenuOpen,
      isGettingTable
    } = this.state
    if (!isGettingTable && visibleRows !== null && columns !== null) {
      return (
        <Container>
          <TableActions/>
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
              {visibleRows.map(row => {
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
          {isContextMenuOpen && 
            <TableContextMenu
              id={contextMenuId}
              closeContextMenu={this.closeContextMenu}
              columnOrRow={contextMenuColumnOrRow}
              createColumn={createColumn}
              deleteColumn={deleteColumn}
              deleteRow={deleteRow}
              sortRows={sortRows}
              toggleColumnIsRenaming={toggleColumnIsRenaming}
              top={contextMenuTop}
              updateColumnType={updateColumnType}
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
  columns: arrayOf(shape({
    defaultSortOrder: oneOf(['ASC', 'DESC'])
  })),
  createColumn: func,
  createRow: func,
  createTable: func,
  deleteColumn: func,
  deleteRow: func,
  moduleTypeId: number,
  rows: array,
  setTable: func,
  setTableId: func,
  sortColumn: object,
  sortOrder: oneOf(['ASC', 'DESC']),
  sortRows: func,
  toggleColumnIsEditing: func,
  toggleColumnIsRenaming: func,
  updateCell: func,
  updateColumnName: func,
  updateColumnType: func,
  updateColumnWidths: func,
  visibleRows: array,
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const TableData = styled.table`
  table-layout: fixed;
  width: 100%;
  height: 100%;
	background-color: ${ colors.TABLE_BACKGROUND };
	color: ${ colors.TEXT_BLACK };
  border-spacing: 0;
`

const TableBody = styled.tbody`
  width: 100%;
  height: 100%;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)