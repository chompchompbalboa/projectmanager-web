//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { shape, string } from 'prop-types'

import Table from './Table'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Module = ({
  module
}) => {
  
  const modules = {
    TABLE: Table
  }

  if (typeof modules[module.type] !== 'undefined') {
    const ModuleType = modules[module.type]
    return (
      <ModuleType
        {...{ [module.type.toLowerCase()]: module.payload }}/> // Assign the correct prop name to the payload while passing it through
    )
  }
  return null
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Module.propTypes = {
  module: shape({
    type: string,
    typeId: string
  })
}

export default Module