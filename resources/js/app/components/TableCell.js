//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import { selectTableColumns } from '../redux/table/tableSelectors'

import TableCellBoolean from './TableCellBoolean'
import TableCellDatetime from './TableCellDatetime'
import TableCellNumber from './TableCellNumber'
import TableCellString from './TableCellString'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  columns: selectTableColumns(state)
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableCell extends Component {
  
  state = {
    value: this.props.cell.value
  }

  tableCellTypes = {
    BOOLEAN: TableCellBoolean,
    DATETIME: TableCellDatetime,
    NUMBER: TableCellNumber,
    STRING: TableCellString,
  }

  render() {
    const {
      cell,
      columns
    } = this.props
    const {
      value
    } = this.state
    
    const TableCellType = this.tableCellTypes[columns[cell.columnId].type]
    return (
      <Container>
        <TableCellType
          onChange={nextValue => this.setState({ value: nextValue })}
          value={value}/>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableCell.propTypes = {
  cell: shape({
    type: string,
    value: string
  }),
  columns: object
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.td`
  padding: ${ layout.TABLE_CELL_PADDING };
  border-bottom: 1px dashed ${ colors.SETTINGS_STRUCTURE_COLUMN_BORDER };
  border-right: 1px dashed ${ colors.SETTINGS_STRUCTURE_COLUMN_BORDER };
`

export default connect(
  mapStateToProps
)(TableCell)