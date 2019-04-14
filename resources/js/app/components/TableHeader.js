//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { PureComponent } from 'react'
import { arrayOf, bool, func, number, oneOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import TableHeaderDropdown from './TableHeaderDropdown'

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
    mouseDownColumnPageX: null,
    mouseDownResizePageX: null,
  }

  componentWillUnmount = () => {
    window.removeEventListener('mousemove', this.handleResizeMouseMove)
    window.removeEventListener('mouseup', this.handleResizeMouseUp)
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
      openContextMenu,
      toggleColumnIsRenaming,
      updateColumnName
    } = this.props
    const {
      mouseDownAdjacentColumnId,
      mouseDownResizePageX
    } = this.state
    const isFirstColumnInNewTable = columns.length === 1 && (columns[0].name === "" || columns[0].name === null)
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
                    ref={input => !isFirstColumnInNewTable && input && input.focus()}
                    disabled={!column.isRenaming}
                    onBlur={() => toggleColumnIsRenaming(column.id)}
                    onChange={e => updateColumnName(column.id, e.target.value)}
                    placeholder="Column..."
                    value={column.name === null ? "" : column.name}/>
                </ContentContainer>
                  <TableHeaderDropdown
                    column={column}
                    isDropdownVisible={column.isEditing}>
                  </TableHeaderDropdown>
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
  background-color: ${colors.ACCENT};
`

const TableHeaderCell = styled.th`
  z-index: 1000;
  position: sticky;
  top: 0;
  width: ${ props => props.widthPercentage * 100}%;
  height: 100%;
  background-color: ${colors.ACCENT};
  border-bottom: 1px solid ${colors.TEXT_LIGHT};
`

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TableHeaderCellValue = styled.input`
  cursor: inherit;
  width: 100%;
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: black;
  padding: calc(${ layout.TABLE_PADDING }/2) calc(${ layout.TABLE_PADDING }/4);
  user-select: none;
  text-overflow: ellipsis;
`

const ResizeContainer = styled.div`
  position: absolute;
  top: 0;
  left: ${ props => props.left }px;
  cursor: ${ props => props.cursor };
  width: ${ props => props.isVisible ? props.isResizing ? '2px' : 'calc(' +  layout.TABLE_PADDING + '/3)' : '0'};
  height: ${ props => props.isResizing ? '100vh' : '100%'};
  background-color: ${ props => props.isResizing ? colors.PRIMARY : 'transparent'};
`

export default TableHeader
