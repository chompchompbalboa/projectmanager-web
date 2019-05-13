//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCell = ({
  cell
}) => {
  return (
    <Container>
      {cell.string}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableCell.propTypes = {
  cell: shape({
    string: string
  })
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.td`
  padding: ${ layout.TABLE_CELL_PADDING };
  border-bottom: 1px dashed ${ colors.SETTINGS_STRUCTURE_COLUMN_BORDER };
  border-right: 1px dashed ${ colors.SETTINGS_STRUCTURE_COLUMN_BORDER };
`

export default TableCell