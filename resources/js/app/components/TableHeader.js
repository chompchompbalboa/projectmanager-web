//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { arrayOf, bool, func, number, oneOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout, timing } from '../../_config'

import Icon from '../components/Icon'

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

  componentWillUnmount = () => {
    window.removeEventListener('mousemove', this.handleResizeMouseMove)
    window.removeEventListener('mouseup', this.handleResizeMouseUp)
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
    window.removeEventListener('mousemove', this.handleResizeMouseMove)
    window.removeEventListener('mouseup', this.handleResizeMouseUp)
    this.setState({
      mouseDownAdjacentColumnId: null,
      mouseDownColumnId: null,
      mouseDownColumnPageX: null
    })
  }
  
  render() {
    const { 
      columns,
      createColumn,
      openContextMenu,
      sortRows 
    } = this.props
    const {
      contextMenuColumnId,
      contextMenuLeft,
      contextMenuOpen,
      contextMenuTop,
      mouseDownColumnId
    } = this.state
    return (
      <>
        <Container 
          backgroundColor={colors.ACCENT}
          ref={this.tableHeaderContainer}>
          {columns.map((column, index) => {
            const sortDirection = this.getSortDirection(column)
            return (
              <TableHeaderCell
                key={column.id}
                isColumnResizing={mouseDownColumnId !== null}
                onContextMenu={e => openContextMenu(e, column.id)}
                sortDirection={sortDirection}
                widthPercentage={column.width}>
                <ContentContainer>
                  <ResizeContainer 
                    onMouseDown={e => this.handleResizeMouseDown(e, columns[index - 1].id, columns[index - 1].width, column.id, column.width)}/>
                  <TableHeaderCellValue
                    isColumnResizing={mouseDownColumnId !== null}
                    onClick={() => sortRows(column)}>
                    {column.header}&nbsp;&nbsp;
                    <Icon 
                      icon={"SORT_" + sortDirection}
                      size="1.2em"/>
                  </TableHeaderCellValue>
                  <ResizeContainer 
                    onMouseDown={e => this.handleResizeMouseDown(e, column.id, column.width, columns[index + 1].id, columns[index + 1].width)}/>
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
			header: string
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
  updateColumnWidths: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.tr`
  width: 100%;
  height: 100%;
  background-color: ${colors.ACCENT};
`

const TableHeaderCell = styled.th`
  z-index: 1000;
  position: sticky;
  top: calc(-1*${ layout.PADDING });
  width: ${ props => props.widthPercentage * 100}%;
  height: 100%;
  background-color: ${colors.ACCENT};
  color: ${ props => props.sortDirection === "BOTH" ? colors.TEXT_LIGHT : colors.TEXT_DARK };
  border-bottom: 1px solid ${colors.TEXT_LIGHT};
  font-weight: bold;
  font-size: 14px;
`

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TableHeaderCellValue = styled.div`
  cursor: ${ props => props.isColumnResizing ? 'col-resize' : 'pointer' };
	padding: calc(${ layout.TABLE_PADDING }/2) 0;
  margin-right: auto;
  user-select: none;
`

const ResizeContainer = styled.div`
  cursor: col-resize;
  width: calc(${ layout.TABLE_PADDING }/4);
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export default TableHeader
