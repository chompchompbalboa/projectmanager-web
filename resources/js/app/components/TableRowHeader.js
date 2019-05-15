//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import TableRowHeaderDropdown from './TableRowHeaderDropdown'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class TableRowHeader extends Component {

  state = {
    isDropdownVisible: false
  }

  render() {
    const {
      isTableHeader,
      rowId
    } = this.props
    const {
      isDropdownVisible
    } = this.state
    return (
      <Container
        isDropdownVisible={isDropdownVisible}
        isTableHeader={isTableHeader}
        onClick={() => this.setState({ isDropdownVisible: !isDropdownVisible })}>
        <RowHeader />
        <TableRowHeaderDropdown
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
TableRowHeader.propTypes = {
  isTableHeader: bool,
  rowId: string
}

TableRowHeader.defaultProps = {
  isTableHeader: false
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.td`
  cursor: pointer;
  height: 100%;
  position: sticky;
  left: 0;
  top: ${ props => props.isTableHeader ? 'calc( ' + layout.TABLE_ACTIONS_HEIGHT + ' + 1px)' : 'auto' };
  z-index: ${ props => props.isTableHeader || props.isDropdownVisible ? '500' : '250' };
  background-color: white;
  border-right: 1px dashed ${ colors.TABLE_ROW_HEADER_BORDER };
  border-bottom: 1px dashed ${ colors.TABLE_ROW_HEADER_BORDER };
  &:hover {
    background-color: ${ colors.TABLE_ROW_HEADER_BACKGROUND_HOVER };;
  }
`

const RowHeader = styled.div`
  width: 2rem;
  height: 100%;
`