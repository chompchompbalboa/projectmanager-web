//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { bool, func, number, object, oneOfType, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout, timing } from '../../_config'

import {
  updateCell as updateCellAction
} from '../redux/table/tableActions'

import TableCellBoolean from './TableCellBoolean'
import TableCellDatetime from './TableCellDatetime'
import TableCellNumber from './TableCellNumber'
import TableCellString from './TableCellString'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  updateCell: (rowId, cellId, type, value) => dispatch(updateCellAction(rowId, cellId, type, value))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableCell extends PureComponent {

  state = {
    value: this.props.value
  }

  tableCellTypeComponents = {
    BOOLEAN: TableCellBoolean,
    DATETIME: TableCellDatetime,
    NUMBER: TableCellNumber,
    STRING: TableCellString,
  }

  saveTimeout = null

  updateValue = (nextValue) => {
    this.setState({
      value: nextValue
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.value !== this.state.value) {
      clearTimeout(this.saveTimeout)
      this.saveTimeout = window.setTimeout(() => this.saveCell(), timing.SAVE_INTERVAL)
    }
  }

  saveCell = () => {
    const {
      cell: {
        id
      },
      rowId,
      type,
      updateCell
    } = this.props
    const {
      value
    } = this.state
    updateCell(rowId, id, type, value === "" ? null : value)
  }

  render() {
    const {
      type
    } = this.props
    const {
      value
    } = this.state
    const TableCellType = this.tableCellTypeComponents[type]
    return (
      <Container>
        <TableCellType
          updateValue={this.updateValue}
          value={value}/>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableCell.propTypes = {
  cell: object,
  rowId: number,
  type: string,
  updateCell: func,
	value: oneOfType([bool, number, string])
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.td`
  height: 100%;
	padding: calc(${ layout.TABLE_PADDING }/2) calc(${ layout.TABLE_PADDING }/4);
  border: 0.25px solid ${ colors.TABLE_BORDER };
  font-weight: ${props => props.fontWeight};
`

export default connect(
  null,
  mapDispatchToProps
)(TableCell)