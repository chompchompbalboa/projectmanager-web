//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number } from 'prop-types'
import { connect } from 'react-redux'

import {
  deleteTable as deleteTableAction,
  toggleTableIsRenaming as toggleTableIsRenamingAction
} from '../redux/project/projectActions'

import ContextMenu from '../components/ContextMenu'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  deleteTable: tableId => dispatch(deleteTableAction(tableId)),
  toggleTableIsRenaming: tableId => dispatch(toggleTableIsRenamingAction(tableId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectChooseTableContextMenu = ({ 
  closeContextMenu, 
  deleteTable,
  id,
  toggleTableIsRenaming,
  top,
  left
}) => {

  const actions = [
    { text: 'Rename', action: () => toggleTableIsRenaming(id) },
    { text: 'Delete', action: () => deleteTable(id) }
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
  deleteTable: func,
  id: number,
  toggleTableIsRenaming: func,
  top: number,
  left: number
}

export default connect(
  null,
  mapDispatchToProps
)(AppProjectChooseTableContextMenu)