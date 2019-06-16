//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object, shape } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  selectTableCells,
  selectTableColumnIds
} from '../redux/table/tableSelectors'

import TableCell from './TableCell'
import TableRowHeader from './TableRowHeader'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  cells: selectTableCells(state),
  columnIds: selectTableColumnIds(state)
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableRow = ({
  cells,
  columnIds,
  row
}) => {
  return (
    <Container>
      <TableRowHeader
        rowId={row.id}/>
      {row.cells && columnIds && columnIds.map(columnId => {
        const cell = cells[row.cells.find(cellId => cells[cellId].columnId === columnId)]
        return (
          <TableCell 
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
TableRow.propTypes = {
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
)(TableRow)