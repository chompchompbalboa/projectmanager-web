//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  selectSheetColumnIds,
  selectSheetRowIds,
  selectSheetRows
} from '../redux/sheet/sheetSelectors'

import SheetRow from './SheetRow'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  columnIds: selectSheetColumnIds(state),
  rowIds: selectSheetRowIds(state),
  rows: selectSheetRows(state)
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const SheetRows = ({
  columnIds,
  rowIds,
  rows
}) => {
  return (
    <Container>
      {columnIds && columnIds.length !== 0 && rowIds && rowIds.map(rowId => {
        const row = rows[rowId]
        return (
          <SheetRow
            key={rowId}
            row={row}/> 
        )
      })}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SheetRows.propTypes = {
  columnIds: array,
  rowIds: array,
  rows: object
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.tbody``

export default connect(
  mapStateToProps
)(SheetRows)