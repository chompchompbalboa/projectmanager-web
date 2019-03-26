//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, bool, func, number, oneOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import Icon from '../components/Icon'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableHeader = ({ columns, sortOrder, sortColumn, sortRows }) => {

  const getSortDirection = (column) => {
    if (column.id === sortColumn.id) {
      return sortOrder === column.defaultSortOrder ? 'DOWN' : 'UP'
    }
    return "BOTH"
  }

	return (
    <Container 
      backgroundColor={colors.ACCENT}>
      {columns.map((column, index) => {
        const sortDirection = getSortDirection(column)
        return (
          <TableHeaderCell
            key={index}
            onClick={() => sortRows(column)}
            sortDirection={sortDirection}
            widthPercentage={column.width}>
            <TableHeaderCellValue>
              {column.header}
            </TableHeaderCellValue>
            <IconContainer>
              <Icon 
                icon={"SORT_" + sortDirection}
                size="1.2em"/>
            </IconContainer>
          </TableHeaderCell>
        )
      })}
		</Container>
	)
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
  isLoading: bool,
	sortColumn: shape({
    id: number
  }),
  sortOrder: oneOf(['ASC', 'DESC']),
  sortRows: func,
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: sticky;
  top: calc(-1*${ layout.PADDING });
	padding: calc(${ layout.TABLE_PADDING }/2) 0;
  width: 100%;
  background-color: ${colors.ACCENT};
  display: flex;
  justify-content: space-around;
  border-right: 3px solid transparent;
  border-bottom: 1px solid ${colors.TEXT_LIGHT};
`

const TableHeaderCell = styled.div`
  cursor: pointer;
	padding: 0 ${ layout.TABLE_PADDING };
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
	cursor: pointer;
  display: flex;
	justify-content: center;
	align-items: center;
`

const IconContainer = styled.div`
`

export default TableHeader
