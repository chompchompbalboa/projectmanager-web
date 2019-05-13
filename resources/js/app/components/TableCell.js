//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import TableCellBoolean from './TableCellBoolean'
import TableCellDatetime from './TableCellDatetime'
import TableCellNumber from './TableCellNumber'
import TableCellString from './TableCellString'

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
      cell: {
        type
      }
    } = this.props
    const {
      value
    } = this.state
    
    const TableCellType = this.tableCellTypes[type]
    console.log(TableCellType)
    return (
      <TableCellType
        onChange={nextValue => this.setState({ value: nextValue })}
        value={value}/>
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