//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { number, shape, string } from 'prop-types'

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
  }
  if (typeof modules[type] !== 'undefined') {
    const ModuleType = modules[type]
    return <ModuleType />
  }
  return type + '-' + typeId
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