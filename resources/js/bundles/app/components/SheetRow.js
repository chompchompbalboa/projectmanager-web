//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object, shape } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  selectSheetCells,
  selectSheetColumnIds
} from '../redux/sheet/sheetSelectors'

import SheetCell from './SheetCell'
import SheetRowHeader from './SheetRowHeader'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  cells: selectSheetCells(state),
  columnIds: selectSheetColumnIds(state)
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const SheetRow = ({
  cells,
  columnIds,
  row
}) => {
  return (
    <Container>
      <SheetRowHeader
        rowId={row.id}/>
      {row.cells && columnIds && columnIds.map(columnId => {
        const cell = cells[row.cells.find(cellId => cells[cellId].columnId === columnId)]
        return (
          <SheetCell 
            key={cell.id}
            cell={cell}/>
        )
      })}
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SheetRow.propTypes = {
  cells: object,
  columnIds: array,
  row: shape({
    cells: array
  })
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.tr``

export default connect(
  mapStateToProps
)(SheetRow)