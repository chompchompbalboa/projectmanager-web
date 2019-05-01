//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { number, shape, string } from 'prop-types'
import styled from 'styled-components'

import Structure from './Structure'
//import Table from './Table'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Module = ({
  module: {
    type,
    typeId
  }
}) => {
  const modules = {
    STRUCTURE: Structure
  }
  if (type === 'STRUCTURE') {
    const ModuleType = modules[type]
    return <ModuleType />
  }
  return null
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Module.propTypes = {
  module: shape({
    type: string,
    typeId: number
  })
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default Module