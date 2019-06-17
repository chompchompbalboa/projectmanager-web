//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../config'

import {
  createSheetColumn as createSheetColumnAction
} from '../redux/sheet/sheetActions'
import {
  selectSheetColumnIds,
  selectSheetColumns
} from '../redux/sheet/sheetSelectors'

import Icon from './Icon'
import SheetHeaderCell from './SheetHeaderCell'
import SheetRowHeader from './SheetRowHeader'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  columnIds: selectSheetColumnIds(state),
  columns: selectSheetColumns(state)
})

const mapDispatchToProps = dispatch => ({
  createSheetColumn: () => dispatch(createSheetColumnAction())
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const SheetHeader = ({
  columnIds,
  columns,
  createSheetColumn
}) => {
  return (
    <Container>
      <SheetRow>
        <SheetRowHeader
          isSheetHeader={true}/>
        {columnIds && columnIds.map((columnId, index) => {
          const column = columns[columnId]
          return (
            <SheetHeaderCell
              key={columnId}
              columnId={columnId}
              isLastColumn={index === (columnIds.length - 1)}
              name={column.name}
              width={column.width}
              zIndex={100 - index}/>
          )
        })}
        <AddSheetContainer
          onClick={() => createSheetColumn()}>
          <AddSheet>
            <Icon
              icon="ADD"
              size="1.25rem"/>
          </AddSheet>
        </AddSheetContainer>
      </SheetRow>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SheetHeader.propTypes = {
  columnIds: array,
  columns: object,
  createSheetColumn: func
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.thead`
  position: relative;
  height: ${ layout.SHEET_HEADER_HEIGHT };
`

const SheetRow = styled.tr`
  width: 100%;
  height: 100%;
`

const AddSheetContainer = styled.td`
  cursor: pointer;
  position: sticky;
  top: calc( ${ layout.SHEET_ACTIONS_HEIGHT } + 1px);
  background-color: ${ colors.SHEET_HEADER_BACKGROUND };
  border-bottom: 1px dashed ${ colors.SHEET_CELL_BORDER };
  border-right: 1px dashed ${ colors.SHEET_CELL_BORDER };
  white-space: nowrap;
  &:hover {
    background-color: rgb(225, 225, 225);
  }
`

const AddSheet = styled.div`
  color: black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SheetHeader)