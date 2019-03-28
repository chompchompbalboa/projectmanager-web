//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, number, oneOfType, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { layout, timing } from '../../_config'

import {
  updateCell as updateCellAction
} from '../redux/project/projectActions'

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
class TableCell extends Component {

  state = {
    value: this.props.value === null ? "" : this.props.value
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
      cellId,
      rowId,
      type,
      updateCell
    } = this.props
    const {
      value
    } = this.state
    updateCell(rowId, cellId, type, value === "" ? null : value)
  }

  render() {
    const {
      autofocus,
      isEditable,
      placeholder,
      type,
      width
    } = this.props
    const {
      value
    } = this.state
    const TableCellType = this.tableCellTypeComponents[type]
    return (
      <Container
        widthPercentage={width}>
        <TableCellType
          autofocus={autofocus}
          isEditable={isEditable}
          placeholder={placeholder}
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
  autofocus: bool,
  cellId: number,
  isEditable: bool,
  placeholder: string,
  rowId: number,
  type: string,
  updateCell: func,
	value: oneOfType([bool, number, string]),
	width: number
}

TableCell.defaultProps = {
  autofocus: false,
	width: 1
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  padding: 0 calc(${ layout.TABLE_PADDING } / 2);
	width: calc(100% * ${props => props.widthPercentage});
	font-weight: ${props => props.fontWeight};
	display: flex;
	justify-content: ${props => props.justifyContent};
  align-items: flex-start;
`

export default connect(
  null,
  mapDispatchToProps
)(TableCell)