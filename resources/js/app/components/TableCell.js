//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, object, shape, string } from 'prop-types'
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
  
  constructor(props) {
    super(props)
    this.tableCellContainer = React.createRef()
  }
  
  state = {
    isActive: false,
    value: this.props.cell.value
  }

  tableCellTypes = {
    BOOLEAN: TableCellBoolean,
    DATETIME: TableCellDatetime,
    NUMBER: TableCellNumber,
    STRING: TableCellString,
  }

	checkForClickOutside = e => {
    if(!this.tableCellContainer.contains(e.target)) {
		  document.removeEventListener('mousedown', this.checkForClickOutside, false)
      this.setState({ 
        isActive: false 
      })
    }
	}

  handleClick = () => {
    this.setState({
      isActive: true
    })
		document.addEventListener('mousedown', this.checkForClickOutside, false)
  }

  updateTableCell = () => {
    const {
      value
    } = this.state
    const {
      cell,
      updateTableCell,
    } = this.props
    if(this.props.cell.value !== value) {
      updateTableCell(cell.id, { value: value })
    }
  }

  render() {
    const {
      cell,
      columns
    } = this.props
    const {
      isActive,
      value
    } = this.state
    
    const TableCellType = this.tableCellTypes[columns[cell.columnId].type]
    return (
      <Container
        ref={c => (this.tableCellContainer = c)}
        isActive={isActive}
        onDoubleClick={() => this.handleClick()}>
        <TableCellType
          isActive={isActive}
          updateTableCell={this.updateTableCell}
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
  columns: object,
  updateTableCell: func
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.td`
  padding: ${ layout.TABLE_CELL_PADDING };
  border: ${ props => props.isActive ? 'solid ' + colors.TABLE_CELL_ACTIVE_BORDER : 'dashed ' + colors.TABLE_CELL_BORDER };
  border-width: ${ props => props.isActive ? '1px' : '1px'};
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableCell)