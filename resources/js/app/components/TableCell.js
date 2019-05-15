//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import { 
  updateTableCell as updateTableCellAction
} from '../redux/table/tableActions'
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

const mapDispatchToProps = dispatch => ({
  updateTableCell: (cellId, updates) => dispatch(updateTableCellAction(cellId, updates))
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

  handleBlur = () => {
    const {
      value
    } = this.state
    const {
      cell,
      updateTableCell,
    } = this.props
    if(value && this.props.cell.value !== value) {
      updateTableCell(cell.id, { value: value })
    }
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
          onBlur={() => this.handleBlur()}
          updateValue={nextValue => this.setState({ value: nextValue })}
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
  mapStateToProps,
  mapDispatchToProps
)(TableCell)