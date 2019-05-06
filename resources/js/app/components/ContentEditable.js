//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import SaneContentEditable from 'react-sane-contenteditable'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ContentEditable = ({
  caretPosition,
  className, // Required by styled components
  value,
  editable,
  focus,
  onBlur,
  onChange,
  onClick,
  tagName
}) => {
  return (
    <SaneContentEditable
      focus={focus}
      tagName={tagName}
      caretPosition={caretPosition}
      className={className}
      content={value !== null ? value : ""}
      editable={editable}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ContentEditable.propTypes = {
  caretPosition: string,
  className: string,
  editable: bool,
  focus: bool,
  onBlur: func,
  onChange: func,
  onClick: func,
  tagName: string,
  value: string
}

ContentEditable.defaultProps = {
  caretPosition: 'end'
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default ContentEditable