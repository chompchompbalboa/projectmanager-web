//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { array, func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, timing } from '../../_config'

import {
  setTableId as setTableIdAction
} from '../redux/table/tableActions'

import AppProjectChooseTableContextMenu from './AppProjectChooseTableContextMenu'
import AppProjectChooseTableDropdown from './AppProjectChooseTableDropdown'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  tableId: state.table.id,
  tables: state.project.activeProject.tables
})

const mapDispatchToProps = dispatch => ({
  setTableId: nextTableId => dispatch(setTableIdAction(nextTableId))
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
      tables, 
      tableId, 
      setTableId 
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
              key={table.id}>
              <TableLink
                isActiveTable={tableId === table.id}
                onClick={() => setTableId(table.id)}
                onContextMenu={e => this.openContextMenu(e, table.id)}>
                {table.name}
              </TableLink>
              <AppProjectChooseTableDropdown
                isDropdownVisible={table.isEditing}
                table={table}/>
            </TableLinkContainer>
          )
        })}
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
  tables: array,
  tableId: number,
  setTableId: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  margin-top: 1vh;
  width: 100%;
`

const TableLinkContainer = styled.div`
  width: 100%;
`

const TableLink = styled.div`
  user-select: none;
  cursor: pointer;
  padding: 0.5vh 0;
  margin-bottom: 2vh;
  font-size: 13px;
  color: ${ props => props.isActiveTable ? colors.PRIMARY : colors.TEXT_INACTIVE };
  border-bottom: ${ props => props.isActiveTable ? '2px solid ' + colors.PRIMARY : '2px solid transparent' };
  transition: all ${ timing.TRANSITION_DURATION };
  &:hover {
    color: ${ colors.PRIMARY };
    border-bottom: 2px solid ${ colors.PRIMARY };
  }
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppProjectChooseTable)