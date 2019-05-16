//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../config'

import {
  selectTableColumnIds,
  selectTableColumns
} from '../redux/table/tableSelectors'

import Icon from './Icon'
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
        <TableRowHeader
          isTableHeader={true}/>
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
        <AddTableContainer>
          <AddTable>
            <Icon
              icon="ADD"
              size="1.25rem"/>
          </AddTable>
        </AddTableContainer>
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

const AddTableContainer = styled.td`
  cursor: pointer;
  position: sticky;
  top: calc( ${ layout.TABLE_ACTIONS_HEIGHT } + 1px);
  background-color: ${ colors.TABLE_HEADER_BACKGROUND };
  border-bottom: 1px dashed ${ colors.TABLE_CELL_BORDER };
  border-right: 1px dashed ${ colors.TABLE_CELL_BORDER };
  white-space: nowrap;
  &:hover {
    background-color: rgb(225, 225, 225);
  }
`

const AddTable = styled.div`
  color: black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default connect(
  mapStateToProps
)(TableHeader)