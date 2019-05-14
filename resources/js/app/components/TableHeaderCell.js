//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { connect } from 'react-redux'
import { func, number, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import {
  updateTableColumn as updateTableColumnAction
} from '../redux/table/tableActions'

import ResizeContainer from './ResizeContainer'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  updateTableColumn: (id, updates) => dispatch(updateTableColumnAction(id, updates))
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableHeaderCell = ({
  columnId,
  name,
  updateTableColumn,
  width,
  zIndex
}) => {
  return (
    <TableHead
      tableHeadZIndex={zIndex}>
      <Container
        cellWidth={width}>
        <Name>
          {name}
        </Name>
        <ResizeContainer
          backgroundColor={colors.TABLE_HEADER_BORDER}
          onResize={widthChange => updateTableColumn(columnId, { width: width + widthChange })}
          width="5px"/>
      </Container>
    </TableHead>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableHeaderCell.propTypes = {
  columnId: string,
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