//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { arrayOf, bool, func, number, oneOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import Icon from '../components/Icon'
import TableContextMenu from './TableContextMenu'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableHeader extends PureComponent {
  
  constructor(props) {
    super(props)
    this.tableHeaderContainer = React.createRef()
  }
  
  state = {
    mouseDownAdjacentColumnId: null,
    mouseDownAdjacentColumnWidth: null,
    mouseDownColumnId: null,
    mouseDownColumnWidth: null,
    mouseDownColumnPageX: null
  }

  closeContextMenu = () => {
    this.setState({
      contextMenuOpen: false
    })
  }
  
  getSortDirection = column => {
    const {
      sortColumn,
      sortOrder
    } = this.props
    if (column.id === sortColumn.id) {
      return sortOrder === column.defaultSortOrder ? 'DOWN' : 'UP'
    }
    return "BOTH"
  }
  
  handleResizeMouseDown = (e, columnId, columnWidth, adjacentColumnId, adjacentColumnWidth) => {
    e.preventDefault()
    window.addEventListener('mousemove', e => this.handleResizeMouseMove(e))
    window.addEventListener('mouseup', () => this.handleResizeMouseUp())
    this.setState({
      mouseDownAdjacentColumnId: adjacentColumnId,
      mouseDownAdjacentColumnWidth: adjacentColumnWidth,
      mouseDownColumnId: columnId,
      mouseDownColumnWidth: columnWidth,
      mouseDownColumnPageX: e.pageX
    })
  }
  
  handleResizeMouseMove = e => {
    e.preventDefault()
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
    if(mouseDownColumnId !== null) {
      const percentChange = Number(((e.pageX - mouseDownColumnPageX) / this.tableHeaderContainer.current.offsetWidth).toFixed(5))
      updateColumnWidths([
        {id: mouseDownColumnId, nextWidth: mouseDownColumnWidth + percentChange},
        {id: mouseDownAdjacentColumnId, nextWidth: mouseDownAdjacentColumnWidth - percentChange},
      ])
    }
  }
  
  handleResizeMouseUp = () => {
    window.removeEventListener('mousemove', () => this.handleResizeMouseMove())
    window.removeEventListener('mouseup', () => this.handleResizeMouseUp())
    this.setState({
      mouseDownAdjacentColumnId: null,
      mouseDownColumnId: null,
      mouseDownColumnPageX: null
    })
  }

  onRightClick = e => {
    e.preventDefault()
    this.setState({
      contextMenuOpen: true,
      contextMenuTop: e.clientY,
      contextMenuLeft: e.clientX
    })
  }
  
  render() {
    const { 
      columns,
      insertColumn,
      sortRows 
    } = this.props
    const {
      contextMenuLeft,
      contextMenuOpen,
      contextMenuTop,
      mouseDownColumnId
    } = this.state
    return (
      <Container 
        backgroundColor={colors.ACCENT}
        onContextMenu={e => this.onRightClick(e)}
        ref={this.tableHeaderContainer}>
        {columns.map((column, index) => {
          const sortDirection = this.getSortDirection(column)
          return (
            <React.Fragment key={column.id}>
              <TableHeaderCell
                key={column.id}
                isColumnResizing={mouseDownColumnId !== null}
                onClick={() => sortRows(column)}
                sortDirection={sortDirection}
                widthPercentage={column.width}>
                <TableHeaderCellValue
                  isColumnResizing={mouseDownColumnId !== null}>
                  {column.header}
                </TableHeaderCellValue>
                <SortArrowContainer>
                  <Icon 
                    icon={"SORT_" + sortDirection}
                    size="1.2em"/>
                </SortArrowContainer>
              </TableHeaderCell>
              <ResizeContainer 
                onMouseDown={e => this.handleResizeMouseDown(e, column.id, column.width, columns[index + 1].id, columns[index + 1].width)}/>
            </React.Fragment>
          )
        })}
        {contextMenuOpen && 
          <TableContextMenu
            closeContextMenu={this.closeContextMenu}
            insertColumn={insertColumn}
            isHeader={true}
            top={contextMenuTop}
            left={contextMenuLeft}/>
        }
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableHeader.propTypes = {
	columns: arrayOf(
		shape({
			header: string
		})
  ),
  name: string,
  insertColumn: func,
  isLoading: bool,
	sortColumn: shape({
    id: number
  }),
  sortOrder: oneOf(['ASC', 'DESC']),
  sortRows: func,
  updateColumnWidths: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 10000;
  position: sticky;
  top: calc(-1*${ layout.PADDING });
	padding: calc(${ layout.TABLE_PADDING }/2);
  width: 100%;
  background-color: ${colors.ACCENT};
  display: flex;
  justify-content: space-around;
  border-right: 3px solid transparent;
  border-bottom: 1px solid ${colors.TEXT_LIGHT};
`

const TableHeaderCell = styled.div`
  cursor: ${ props => props.isColumnResizing ? 'col-resize' : 'pointer' };
	padding: 0 calc(${ layout.TABLE_PADDING } / 2);
	width: calc(100% * ${props => props.widthPercentage});
  opacity: ${ props => props.sortDirection === "BOTH" ? '0.65' : '1'};
  font-weight: bold;
  font-size: 14px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
`

const TableHeaderCellValue = styled.div`
  cursor: ${ props => props.isColumnResizing ? 'col-resize' : 'pointer' };
  user-select: none;
  display: flex;
	justify-content: center;
	align-items: center;
`

const SortArrowContainer = styled.div`
`

const ResizeContainer = styled.div`
  cursor: col-resize;
  width: 10px;
  height: calc(100% + ${ layout.TABLE_PADDING });
  margin-top: calc(-1 * (${ layout.TABLE_PADDING } / 2));
`

export default TableHeader
