//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bool, func, number, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import {
  deleteTableColumn as deleteTableColumnAction,
  updateTableColumn as updateTableColumnAction
} from '../redux/table/tableActions'

import DeleteDropdown from './DeleteDropdown'
import ResizeContainer from './ResizeContainer'
import TableColumnDropdown from './TableColumnDropdown'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  deleteTableColumn: columnId => dispatch(deleteTableColumnAction(columnId)),
  updateTableColumn: (columnId, updates) => dispatch(updateTableColumnAction(columnId, updates))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableHeaderCell extends Component {

  state = {
    dropdownLeft: null,
    dropdownTop: null,
    isDeleteDropdownVisible: false,
    isDropdownVisible: false
  }

  handleContextMenu = e => {
    e.preventDefault()
    this.setState({
      dropdownLeft: e.pageX + 'px',
      dropdownTop: e.pageY + 'px',
      isDropdownVisible: true
    })
  }

  render() {
    const {
      columnId,
      deleteTableColumn,
      isLastColumn,
      name,
      updateTableColumn,
      width,
      zIndex
    } = this.props
    const {
      dropdownLeft,
      dropdownTop,
      isDeleteDropdownVisible,
      isDropdownVisible
    } = this.state
    return (
      <TableHead
        tableHeadZIndex={(isDropdownVisible || isDeleteDropdownVisible) ? '1000' : zIndex}>
        <Container
          cellWidth={width}
          onContextMenu={e => this.handleContextMenu(e)}>
          <Name>
            {name}
          </Name>
          <ResizeContainer
            backgroundColor={colors.TABLE_HEADER_BORDER}
            onResize={widthChange => updateTableColumn(columnId, { width: width + widthChange })}
            width="5px"/>
          {isDropdownVisible && 
            <TableColumnDropdown
              closeDropdown={() => this.setState({ dropdownLeft: null, dropdownTop: null, isDropdownVisible: false })}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              isDropdownVisible={isDropdownVisible}
              openDeleteDropdown={() => this.setState({ isDropdownVisible: false, isDeleteDropdownVisible: true })}/>
          }
          {isDeleteDropdownVisible && 
            <DeleteDropdown
              onDelete={() => deleteTableColumn(columnId)}
              closeDropdown={() => this.setState({ isDeleteDropdownVisible: false })}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              isDropdownVisible={isDeleteDropdownVisible}
              isRightAligned={isLastColumn}
              textToMatch={name}
              type="column"/>
          }
        </Container>
      </TableHead>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableHeaderCell.propTypes = {
  columnId: string,
  deleteTableColumn: func,
  isLastColumn: bool,
  name: string,
  updateTableColumn: func,
  width: number,
  zIndex: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const TableHead = styled.th`
  z-index: ${ props => props.tableHeadZIndex };
  position: sticky;
  top: calc( ${ layout.TABLE_ACTIONS_HEIGHT } + 1px);
  text-align: left;
  padding-left: ${ layout.TABLE_CELL_PADDING };
  background-color: ${ colors.TABLE_HEADER_BACKGROUND };
  border-bottom: 1px dashed ${ colors.TABLE_CELL_BORDER };
`

const Container = styled.div`
  width: ${ props => props.cellWidth + 'px' };
  height: ${ layout.TABLE_HEADER_HEIGHT };
  display: flex;
  align-items: center;
`

const Name = styled.h4`
  letter-spacing: 0.5px;
  width: 100%;
`

export default connect(
  null,
  mapDispatchToProps
)(TableHeaderCell)