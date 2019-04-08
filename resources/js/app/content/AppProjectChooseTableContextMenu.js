//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number } from 'prop-types'
import { connect } from 'react-redux'

import {
  toggleTableIsEditing as toggleTableIsEditingAction
} from '../redux/project/projectActions'

import ContextMenu from '../components/ContextMenu'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  toggleTableIsEditing: id => dispatch(toggleTableIsEditingAction(id))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectChooseTableContextMenu = ({ 
  closeContextMenu, 
  id,
  toggleTableIsEditing,
  top,
  left
}) => {

  const actions = [
    { text: 'Edit Table Info', action: () => toggleTableIsEditing(id) }
  ]

  return (
    <ContextMenu
      actions={actions}
      closeContextMenu={closeContextMenu}
      top={top}
      left={left}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjectChooseTableContextMenu.propTypes = {
  closeContextMenu: func,
  id: number,
  toggleTableIsEditing: func,
  top: number,
  left: number
}

export default connect(
  null,
  mapDispatchToProps
)(AppProjectChooseTableContextMenu)