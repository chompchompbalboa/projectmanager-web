//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'

import TableCell from './TableCell'
import TableRowContainer from './TableRowContainer'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableAddRow = ({ structure }) => {

  return (
    <TableRowContainer>
      {
        Object.keys(structure).map((category, index) => {
          const categoryStructure = structure[category]
          return (
            <TableCell 
              key={index}
              value={
                <StyledTextarea 
                  rows="1"
                  placeholder={"Add +"}/>
              }
              valueWidth100Percent
              width={categoryStructure.width}/>
          )
        })
      }
    </TableRowContainer>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledTextarea = styled.textarea`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border: none;
  border: 1px solid red;
  outline: none;
  resize: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableAddRow.propTypes = {
  structure: object
}

export default TableAddRow