//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { layout } from '../config'

import {
  selectTableColumnIds,
  selectTableColumns
} from '../redux/table/tableSelectors'

import TableHeaderCell from './TableHeaderCell'
import TableRowHeader from './TableRowHeader'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  columnIds: selectTableColumnIds(state),
  columns: selectTableColumns(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableHeader = ({
  columnIds,
  columns
}) => {
  return (
    <Container>
      <TableRow>
        <TableRowHeader />
        {columnIds && columnIds.map((columnId, index) => {
          const column = columns[columnId]
          return (
            <TableHeaderCell
              key={columnId}
              columnId={columnId}
              name={column.name}
              width={column.width}
              zIndex={100 - index}/>
          )
        })}
      </TableRow>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableHeader.propTypes = {
  columnIds: array,
  columns: object
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.thead`
  position: relative;
  height: ${ layout.TABLE_HEADER_HEIGHT };
`

const TableRow = styled.tr`
  width: 100%;
  height: 100%;
`

export default connect(
  mapStateToProps
)(TableHeader)