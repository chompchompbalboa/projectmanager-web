//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'

import icons from './icons'

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
const Icon = ({ icon, size }) => {

  const styles = {
    path: {
      fill: "currentColor"
    }
  }

  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 1024 1024"
      >
      <path
        style={styles.path}
        d={icons[icon]}
      ></path>
    </svg>
  )
}

//------------------------------------------------------------------------------
// Props
//------------------------------------------------------------------------------
Icon.propTypes = {
  icon: string,
  size: string
}

Icon.defaultProps = {
  icon: "ME",
  size: "24px"
}

export default Icon