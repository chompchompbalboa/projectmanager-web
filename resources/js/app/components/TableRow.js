//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object, shape } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  selectTableCells
} from '../redux/table/tableSelectors'

import TableCell from './TableCell'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  cells: selectTableCells(state)
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableRow = ({
  cells,
  row
}) => {
  return (
    <Container>
      {row.cells && row.cells.map(cellId => {
        const cell = cells[cellId]
        return (
          <TableCell 
            key={cellId}
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