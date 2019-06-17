//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import SheetRowHeaderDropdown from './SheetRowHeaderDropdown'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class SheetRowHeader extends Component {

  state = {
    isDropdownVisible: false
  }

  render() {
    const {
      isSheetHeader,
      rowId
    } = this.props
    const {
      isDropdownVisible
    } = this.state
    return (
      <Container
        isDropdownVisible={isDropdownVisible}
        isSheetHeader={isSheetHeader}
        onClick={() => this.setState({ isDropdownVisible: !isDropdownVisible })}>
        <RowHeader />
        <SheetRowHeaderDropdown
          rowId={rowId}
          closeDropdown={() => this.setState({ isDropdownVisible: false })}
          isDropdownVisible={isDropdownVisible}/>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SheetRowHeader.propTypes = {
  isSheetHeader: bool,
  rowId: string
}

SheetRowHeader.defaultProps = {
  isSheetHeader: false
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.td`
  cursor: pointer;
  height: 100%;
  position: sticky;
  left: 0;
  top: ${ props => props.isSheetHeader ? 'calc( ' + layout.SHEET_ACTIONS_HEIGHT + ' + 1px)' : 'auto' };
  z-index: ${ props => props.isSheetHeader || props.isDropdownVisible ? '500' : '250' };
  background-color: white;
  border-right: 1px dashed ${ colors.SHEET_ROW_HEADER_BORDER };
  border-bottom: 1px dashed ${ colors.SHEET_ROW_HEADER_BORDER };
  &:hover {
    background-color: ${ colors.SHEET_ROW_HEADER_BACKGROUND_HOVER };;
  }
`

const RowHeader = styled.div`
  width: 2rem;
  height: 100%;
`