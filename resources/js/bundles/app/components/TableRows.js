//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  selectTableColumnIds,
  selectTableRowIds,
  selectTableRows
} from '../redux/table/tableSelectors'

import TableRow from './TableRow'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  columnIds: selectTableColumnIds(state),
  rowIds: selectTableRowIds(state),
  rows: selectTableRows(state)
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableRows = ({
  columnIds,
  rowIds,
  rows
}) => {
  return (
    <Container>
      {columnIds && columnIds.length !== 0 && rowIds && rowIds.map(rowId => {
        const row = rows[rowId]
        return (
          <TableRow
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
TableRows.propTypes = {
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
)(TableRows)