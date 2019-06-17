//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, object, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import { 
  updateSheetCell as updateSheetCellAction
} from '../redux/sheet/sheetActions'
import { selectSheetColumns } from '../redux/sheet/sheetSelectors'

import SheetCellBoolean from './SheetCellBoolean'
import SheetCellDatetime from './SheetCellDatetime'
import SheetCellNumber from './SheetCellNumber'
import SheetCellString from './SheetCellString'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  columns: selectSheetColumns(state)
})

const mapDispatchToProps = dispatch => ({
  updateSheetCell: (cellId, updates) => dispatch(updateSheetCellAction(cellId, updates))
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class SheetCell extends Component {
  
  constructor(props) {
    super(props)
    this.sheetCellContainer = React.createRef()
  }
  
  state = {
    isActive: false,
    value: this.props.cell.value
  }

  sheetCellTypes = {
    BOOLEAN: SheetCellBoolean,
    DATETIME: SheetCellDatetime,
    NUMBER: SheetCellNumber,
    STRING: SheetCellString,
  }

	checkForClickOutside = e => {
    if(!this.sheetCellContainer.contains(e.target)) {
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

  updateSheetCell = () => {
    const {
      value
    } = this.state
    const {
      cell,
      updateSheetCell,
    } = this.props
    if(this.props.cell.value !== value) {
      updateSheetCell(cell.id, { value: value })
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
    
    const SheetCellType = this.sheetCellTypes[columns[cell.columnId].type]
    return (
      <Container
        ref={c => (this.sheetCellContainer = c)}
        isActive={isActive}
        onDoubleClick={() => this.handleClick()}>
        <SheetCellType
          isActive={isActive}
          updateSheetCell={this.updateSheetCell}
          updateValue={nextValue => this.setState({ value: nextValue })}
          value={value}/>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SheetCell.propTypes = {
  cell: shape({
    type: string,
    value: string
  }),
  columns: object,
  updateSheetCell: func
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.td`
  padding: ${ layout.SHEET_CELL_PADDING };
  border: ${ props => props.isActive ? 'solid ' + colors.SHEET_CELL_ACTIVE_BORDER : 'dashed ' + colors.SHEET_CELL_BORDER };
  border-width: ${ props => props.isActive ? '1px' : '1px'};
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SheetCell)