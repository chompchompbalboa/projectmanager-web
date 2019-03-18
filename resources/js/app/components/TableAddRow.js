//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import timing from '../../_config/timing'

import TableCell from './TableCell'
import TableRowContainer from './TableRowContainer'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableAddRow = ({ columns }) => {

  return (
    <TableRowContainer>
      {columns.map(column => {
        return (
          <TableCell 
            key={column.id}
            value={
              <StyledTextarea 
                rows="1"
                placeholder={column.header + '...'}/>
            }
            width={column.width}/>
        )
        })
      }
    </TableRowContainer>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableAddRow.propTypes = {
  columns: arrayOf(shape({
    id: number,
    header: string,
    width: number
  }))
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledTextarea = styled.textarea`
  cursor: pointer;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: inherit;
  border: none;
  outline: none;
  resize: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  transition: all ${ timing.TRANSITION_DURATION };
  &:hover {
    &::placeholder {
      color: black;
    }
  }
`

export default TableAddRow