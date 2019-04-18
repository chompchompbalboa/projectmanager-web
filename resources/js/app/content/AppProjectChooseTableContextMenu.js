//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number } from 'prop-types'
import { connect } from 'react-redux'

import {
  updateActiveModal as updateActiveModalAction
} from '../redux/modal/modalActions'
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
  toggleTableIsRenaming: tableId => dispatch(toggleTableIsRenamingAction(tableId)),
  updateActiveModal: (nextActiveModal, nextActiveModalTableId) => dispatch(updateActiveModalAction(nextActiveModal, nextActiveModalTableId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectChooseTableContextMenu = ({ 
  closeContextMenu, 
  deleteTable,
  id,
  left,
  toggleTableIsRenaming,
  top,
  updateActiveModal
}) => {

  const actions = [
    { text: 'Breakdowns', action: () => updateActiveModal('BREAKDOWNS', id) },
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
  left: number,
  id: number,
  toggleTableIsRenaming: func,
  top: number,
  updateActiveModal: func
}

export default connect(
  null,
  mapDispatchToProps
)(AppProjectChooseTableContextMenu)