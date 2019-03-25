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
const Container = styled.div``

export default TableCellBoolean