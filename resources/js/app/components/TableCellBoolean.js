//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCellBoolean = ({ isEditable, updateValue, value }) => {
  return (
    <Container>
      <input 
         type="checkbox"
         checked={value}
         onChange={(e) => updateValue(e.target.checked)}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default TableCellBoolean