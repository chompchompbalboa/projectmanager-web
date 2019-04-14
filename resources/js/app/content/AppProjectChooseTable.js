//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { array, func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout, timing } from '../../_config'

import {
  createTable as createTableAction,
  toggleTableIsRenaming as toggleTableIsRenamingAction,
  updateTableName as updateTableNameAction
} from '../redux/project/projectActions'
import {
  setTableId as setTableIdAction
} from '../redux/table/tableActions'

import AppProjectChooseTableContextMenu from './AppProjectChooseTableContextMenu'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  tableId: state.table.id,
  tables: state.project.activeProject.tables
})

const mapDispatchToProps = dispatch => ({
  createTable: () => dispatch(createTableAction()),
  setTableId: nextTableId => dispatch(setTableIdAction(nextTableId)),
  toggleTableIsRenaming: id => dispatch(toggleTableIsRenamingAction(id)),
  updateTableName: (columnId, nextName) => dispatch(updateTableNameAction(columnId, nextName)),
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppProjectChooseTable extends PureComponent {

  state = {
    contextMenuId: null,
    isContextMenuOpen: false,
    contextMenuTop: null,
    contextMenuLeft: null
  }

  closeContextMenu = () => {
    this.setState({
      isContextMenuOpen: false
    })
  }

  openContextMenu = (e, id) => {
    e.preventDefault()
    this.setState({
      contextMenuId: id,
      isContextMenuOpen: true,
      contextMenuTop: e.clientY,
      contextMenuLeft: e.clientX
    })
  }

  render() {
    const { 
      createTable,
      setTableId,
      tables, 
      tableId, 
      toggleTableIsRenaming,
      updateTableName
    } = this.props

    const {
      contextMenuId,
      isContextMenuOpen,
      contextMenuTop,
      contextMenuLeft
    } = this.state

    return (
      <Container>
        {tables.map(table => {
          return (
            <TableLinkContainer
              key={table.id}
              onClick={!table.isRenaming ? () => setTableId(table.id) : null}>
              <TableLink
                ref={input => input && input.focus()}
                disabled={!table.isRenaming}
                isActiveTable={tableId === table.id}
                onBlur={() => toggleTableIsRenaming(table.id)}
                onChange={e => updateTableName(table.id, e.target.value)}
                onContextMenu={e => this.openContextMenu(e, table.id)}
                placeholder="Name..."
                value={table.name === null ? "" : table.name}/>
            </TableLinkContainer>
          )
        })}
        <TableLinkContainer
           onClick={() => createTable()}>
          <TableLink
            readOnly
            disabled
            value="Add +"/>
        </TableLinkContainer>
        {isContextMenuOpen && 
          <AppProjectChooseTableContextMenu
            id={contextMenuId}
            closeContextMenu={this.closeContextMenu}
            top={contextMenuTop}
            left={contextMenuLeft}/>
        }
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjectChooseTable.propTypes = {
  createTable: func,
  tables: array,
  tableId: number,
  setTableId: func,
  toggleTableIsRenaming: func,
  updateTableName: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  padding: 0 calc(${ layout.TABLE_PADDING }/4);
  padding-bottom: 5vh;
`

const TableLinkContainer = styled.div`
  width: 100%;
  margin: 1vh 0;
`

const TableLink = styled.input`
  cursor: pointer;
  width: 100%;
  padding: 0.25vh;
  font-size: 13px;
  color: ${ props => props.isActiveTable ? colors.PRIMARY : colors.TEXT_INACTIVE };
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: ${ props => props.isActiveTable ? '2px solid ' + colors.PRIMARY : '2px solid transparent' };
  transition: all ${ timing.TRANSITION_DURATION };
  text-overflow: ellipsis;
  &:hover {
    color: ${ colors.PRIMARY };
    border-bottom: 2px solid ${ colors.PRIMARY };
  }
  &::placeholder {
    color: ${ props => props.isActiveTable ? colors.PRIMARY : colors.TEXT_INACTIVE };
  }
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppProjectChooseTable)