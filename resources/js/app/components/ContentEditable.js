//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'

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
      focus={focus && editable}
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
  caretPosition: 'end',
  focus: false
}

export default React.memo(ContentEditable)