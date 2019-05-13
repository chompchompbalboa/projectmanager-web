//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { arrayOf, bool, func, number, oneOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import ContentEditable from './ContentEditable'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableHeader extends PureComponent {
  
  constructor(props) {
    super(props)
    this.tableHeaderContainer = React.createRef()
  }
  
  state = {
    columnNames: this.props.columns.map(column => ({ id: column.id, name: column.name })),
    mouseDownAdjacentColumnId: null,
    mouseDownAdjacentColumnWidth: null,
    mouseDownColumnId: null,
    mouseDownColumnWidth: null,
    mouseDownColumnPageX: null,
    mouseDownResizePageX: null,
  }

  componentWillUnmount = () => {
    window.removeEventListener('mousemove', this.handleResizeMouseMove)
    window.removeEventListener('mouseup', this.handleResizeMouseUp)
  }

  handleColumnNameBlur = columnId => {
    const {
      toggleColumnIsRenaming,
      updateColumnName
    } = this.props
    const {
      columnNames
    } = this.state
    const nextColumnName = columnNames.find(columnName => columnName.id === columnId)
    updateColumnName(nextColumnName.id, nextColumnName.name)
    toggleColumnIsRenaming(columnId)
  }

  handleColumnNameChange = (columnId, nextColumnName) => {
    const {
      columnNames
    } = this.state
    const nextColumnNames = columnNames.map(columnName => {
      if(columnName.id === columnId) {
        return { ...columnName, name: nextColumnName}
      }
      return columnName
    })
    this.setState({
      columnNames: nextColumnNames
    })
  }
  
  handleResizeMouseDown = (e, columnId, columnWidth, adjacentColumnId, adjacentColumnWidth) => {
    e.preventDefault()
    window.addEventListener('mousemove', this.handleResizeMouseMove)
    window.addEventListener('mouseup', this.handleResizeMouseUp)
    this.setState({
      mouseDownAdjacentColumnId: adjacentColumnId,
      mouseDownAdjacentColumnWidth: adjacentColumnWidth,
      mouseDownColumnId: columnId,
      mouseDownColumnWidth: columnWidth,
      mouseDownColumnPageX: e.pageX
    })
  }
  
  handleResizeMouseMove = e => {
    document.body.style.cursor = 'col-resize'
    e.preventDefault()
    const {
      mouseDownColumnId,
      mouseDownColumnPageX
    } = this.state
    if(mouseDownColumnId !== null) {
      const nextMouseDownResizePageX = Number(e.pageX - mouseDownColumnPageX)
      this.setState({
        mouseDownResizePageX: nextMouseDownResizePageX
      })
    }
  }
  
  handleResizeMouseUp = e => {
    document.body.style.cursor = null
    const {
      updateColumnWidths
    } = this.props
    const {
      mouseDownAdjacentColumnId,
      mouseDownAdjacentColumnWidth,
      mouseDownColumnId,
      mouseDownColumnWidth,
      mouseDownColumnPageX
    } = this.state
    window.removeEventListener('mousemove', this.handleResizeMouseMove)
    window.removeEventListener('mouseup', this.handleResizeMouseUp)
    if(mouseDownColumnId !== null) {
      const percentChange = Number(((e.pageX - mouseDownColumnPageX) / this.tableHeaderContainer.current.offsetWidth).toFixed(5))
      updateColumnWidths([
        {id: mouseDownColumnId, nextWidth: mouseDownColumnWidth + percentChange},
        {id: mouseDownAdjacentColumnId, nextWidth: mouseDownAdjacentColumnWidth - percentChange},
      ])
    }
    this.setState({
      mouseDownAdjacentColumnId: null,
      mouseDownColumnId: null,
      mouseDownColumnPageX: null,
      mouseDownResizePageX: null
    })
  }
  
  render() {
    const { 
      columns,
      openContextMenu
    } = this.props
    const {
      mouseDownAdjacentColumnId,
      mouseDownResizePageX
    } = this.state
    return (
      <>
        <Container 
          backgroundColor={colors.ACCENT}
          ref={this.tableHeaderContainer}>
          {columns.map((column, index) => {
            return (
              <TableHeaderCell
                key={column.id}
                onContextMenu={e => openContextMenu(e, 'COLUMN', column.id)}
                widthPercentage={column.width}>
                <ResizeContainer
                  cursor={index !== 0 ? 'col-resize' : 'pointer'}
                  isVisible={index !== 0}
                  isResizing={mouseDownAdjacentColumnId === column.id}
                  left={mouseDownResizePageX === null ? 0 : mouseDownResizePageX}
                  onMouseDown={index!== 0 ? e => this.handleResizeMouseDown(e, columns[index - 1].id, columns[index - 1].width, column.id, column.width) : null}/>
                <ContentContainer>
                  <TableHeaderCellValue
                    editable={column.isRenaming ? true : false}
                    focus={column.isRenaming ? true : false}
                    id={column.id}
                    onBlur={() => this.handleColumnNameBlur(column.id)}
                    onChange={(e, nextColumnName) => this.handleColumnNameChange(column.id, nextColumnName)}
                    tagName="h4"
                    value={column.name === null ? "" : column.name}/>
                </ContentContainer>
              </TableHeaderCell>
            )
          })}
        </Container>
      </>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableHeader.propTypes = {
	columns: arrayOf(
		shape({
			name: string
		})
  ),
  createColumn: func,
  isLoading: bool,
  openContextMenu: func,
	sortColumn: shape({
    id: number
  }),
  sortOrder: oneOf(['ASC', 'DESC']),
  sortRows: func,
  toggleColumnIsRenaming: func,
  updateColumnName: func,
  updateColumnWidths: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.tr`
  width: 100%;
  height: 100%;
  background-color: ${ colors.TABLE_HEADER_BACKGROUND };
`

const TableHeaderCell = styled.th`
  z-index: 1000;
  position: sticky;
  top: -1px;
  width: ${ props => props.widthPercentage * 100}%;
  height: 100%;
  background-color: ${ colors.TABLE_HEADER_BACKGROUND };
  border-bottom: 1px dashed ${ colors.TABLE_CELL_BORDER };
  border-right: 5px solid ${ colors.TABLE_HEADER_BORDER };
`

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
`

const TableHeaderCellValue = styled(ContentEditable)`
  cursor: inherit;
  width: 100%;
  outline: none;
  border: none;
  color: black;
  padding: 1vh 0;
  user-select: none;
  text-overflow: ellipsis;
`

const ResizeContainer = styled.div`
  position: absolute;
  top: 0;
  left: ${ props => props.left }px;
  cursor: ${ props => props.cursor };
  width: ${ props => props.isVisible ? props.isResizing ? '2px' : layout.TABLE_CELL_PADDING : '0'};
  height: ${ props => props.isResizing ? '100vh' : '100%'};
  background-color: ${ props => props.isResizing ? colors.TABLE_HEADER_RESIZE_CONTAINER : 'transparent'};
`

export default TableHeader
