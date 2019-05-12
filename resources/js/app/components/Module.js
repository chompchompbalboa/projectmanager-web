//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { number, shape, string } from 'prop-types'

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
        moduleTypeId={module.typeId}/>
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
    typeId: number
  })
}

export default Module