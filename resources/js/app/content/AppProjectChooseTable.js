//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { array, func, number, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout, timing } from '../../_config'

import {
  createTable as createTableAction,
  toggleTableIsRenaming as toggleTableIsRenamingAction,
  updateTableName as updateTableNameAction
} from '../redux/project/projectActions'
import {
  setBreakdown as setBreakdownAction,
  setTableId as setTableIdAction
} from '../redux/table/tableActions'

import AppProjectChooseTableContextMenu from './AppProjectChooseTableContextMenu'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeBreakdown: state.table.breakdown,
  tableId: state.table.id,
  tables: state.project.activeProject.tables
})

const mapDispatchToProps = dispatch => ({
  createTable: () => dispatch(createTableAction()),
  setBreakdown: (nextTableId, nextBreakdown) => dispatch(setBreakdownAction(nextTableId, nextBreakdown)),
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
      activeBreakdown,
      createTable,
      setBreakdown,
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
            <TableLinksContainer
              key={table.id}>
              <TableLinkContainer
                onClick={!table.isRenaming ? () => setTableId(table.id) : null}>
                <TableLink
                  ref={input => input && input.focus()}
                  disabled={!table.isRenaming}
                  isActive={activeBreakdown === null ? tableId === table.id : false}
                  onBlur={() => toggleTableIsRenaming(table.id)}
                  onChange={e => updateTableName(table.id, e.target.value)}
                  onContextMenu={e => this.openContextMenu(e, table.id)}
                  placeholder="Name..."
                  value={table.name === null ? "" : table.name}/>
              </TableLinkContainer>
              {table.breakdowns.map(breakdown => {
                return (
                  <BreakdownLinkContainer
                    key={breakdown.id}
                    onClick={() => setBreakdown(table.id, breakdown)}>
                    <BreakdownLink
                      disabled
                      isActive={activeBreakdown !== null ? activeBreakdown.id === breakdown.id : false}
                      onChange={() => null}
                      onContextMenu={e => this.openContextMenu(e, table.id)}
                      placeholder="Breakdown..."
                      value={breakdown.name !== null ? breakdown.name : ""}/>
                  </BreakdownLinkContainer>
                )
              })}
            </TableLinksContainer>
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
  activeBreakdown: object,
  createTable: func,
  tables: array,
  tableId: number,
  setBreakdown: func,
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

const TableLinksContainer = styled.div`
  width: 100%;
  margin: 1vh 0;
`

const TableLinkContainer = styled.div`
`

const TableLink = styled.input`
  cursor: pointer;
  width: 100%;
  padding: 0.25vh 0.5vw 0.25vh 0.125vw;
  font-size: 13px;
  color: ${ props => props.isActive ? colors.PRIMARY : colors.TEXT_INACTIVE };
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: ${ props => props.isActive ? '2px solid ' + colors.PRIMARY : '2px solid transparent' };
  transition: all ${ timing.TRANSITION_DURATION };
  text-overflow: ellipsis;
  &:hover {
    color: ${ colors.PRIMARY };
    border-bottom: 2px solid ${ colors.PRIMARY };
  }
  &::placeholder {
    color: ${ props => props.isActive ? colors.PRIMARY : colors.TEXT_INACTIVE };
  }
`

const BreakdownLinkContainer = styled.div``

const BreakdownLink = styled(TableLink)`
  margin-left: 1vw;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppProjectChooseTable)