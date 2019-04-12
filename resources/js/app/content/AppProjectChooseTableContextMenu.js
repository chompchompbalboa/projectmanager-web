//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number } from 'prop-types'
import { connect } from 'react-redux'

import {
  toggleTableIsRenaming as toggleTableIsRenamingAction
} from '../redux/project/projectActions'

import ContextMenu from '../components/ContextMenu'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  toggleTableIsRenaming: id => dispatch(toggleTableIsRenamingAction(id))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectChooseTableContextMenu = ({ 
  closeContextMenu, 
  id,
  toggleTableIsRenaming,
  top,
  left
}) => {

  const actions = [
    { text: 'Rename', action: () => toggleTableIsRenaming(id) }
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
  toggleTableIsRenaming: func,
  top: number,
  left: number
}

export default connect(
  null,
  mapDispatchToProps
)(AppProjectChooseTableContextMenu)