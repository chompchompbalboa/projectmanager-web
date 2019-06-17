//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bool, func, number, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import {
  deleteSheetColumn as deleteSheetColumnAction,
  updateSheetColumn as updateSheetColumnAction
} from '../redux/sheet/sheetActions'

import DeleteDropdown from './DeleteDropdown'
import ResizeContainer from './ResizeContainer'
import SheetColumnDropdown from './SheetColumnDropdown'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  deleteSheetColumn: columnId => dispatch(deleteSheetColumnAction(columnId)),
  updateSheetColumn: (columnId, updates) => dispatch(updateSheetColumnAction(columnId, updates))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class SheetHeaderCell extends Component {

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
      deleteSheetColumn,
      isLastColumn,
      name,
      updateSheetColumn,
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
      <SheetHead
        sheetHeadZIndex={(isDropdownVisible || isDeleteDropdownVisible) ? '1000' : zIndex}>
        <Container
          cellWidth={width}
          onContextMenu={e => this.handleContextMenu(e)}>
          <Name>
            {name}
          </Name>
          <ResizeContainer
            backgroundColor={colors.SHEET_HEADER_BORDER}
            onResize={widthChange => updateSheetColumn(columnId, { width: width + widthChange })}
            width="5px"/>
          {isDropdownVisible && 
            <SheetColumnDropdown
              closeDropdown={() => this.setState({ dropdownLeft: null, dropdownTop: null, isDropdownVisible: false })}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              isDropdownVisible={isDropdownVisible}
              openDeleteDropdown={() => this.setState({ isDropdownVisible: false, isDeleteDropdownVisible: true })}/>
          }
          {isDeleteDropdownVisible && 
            <DeleteDropdown
              onDelete={() => deleteSheetColumn(columnId)}
              closeDropdown={() => this.setState({ isDeleteDropdownVisible: false })}
              dropdownLeft={dropdownLeft}
              dropdownTop={dropdownTop}
              isDropdownVisible={isDeleteDropdownVisible}
              isRightAligned={isLastColumn}
              textToMatch={name}
              type="column"/>
          }
        </Container>
      </SheetHead>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SheetHeaderCell.propTypes = {
  columnId: string,
  deleteSheetColumn: func,
  isLastColumn: bool,
  name: string,
  updateSheetColumn: func,
  width: number,
  zIndex: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const SheetHead = styled.th`
  z-index: ${ props => props.sheetHeadZIndex };
  position: sticky;
  top: calc( ${ layout.SHEET_ACTIONS_HEIGHT } + 1px);
  text-align: left;
  padding-left: ${ layout.SHEET_CELL_PADDING };
  background-color: ${ colors.SHEET_HEADER_BACKGROUND };
  border-bottom: 1px dashed ${ colors.SHEET_CELL_BORDER };
`

const Container = styled.div`
  width: ${ props => props.cellWidth + 'px' };
  height: ${ layout.SHEET_HEADER_HEIGHT };
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
)(SheetHeaderCell)