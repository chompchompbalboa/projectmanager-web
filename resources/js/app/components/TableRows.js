//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  selectTableRowIds,
  selectTableRows
} from '../redux/table/tableSelectors'

import TableRow from './TableRow'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  rowIds: selectTableRowIds(state),
  rows: selectTableRows(state)
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableRows = ({
  rowIds,
  rows
}) => {
  return (
    <Container>
      {rowIds && rowIds.map(rowId => {
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