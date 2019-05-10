//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, number, string } from 'prop-types'

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
  id,
  onBlur,
  onChange,
  onClick,
  tagName
}) => {
  return (
    <SaneContentEditable
      caretPosition={caretPosition}
      className={className}
      content={id > 0 ? (value !== null ? value : "") : '. . .'}
      editable={id > 0 ? editable : false}
      focus={focus}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}
      tagName={tagName}/>
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
  id: number,
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