//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number, oneOf } from 'prop-types'

import ContextMenu from './ContextMenu'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableContextMenu = ({ 
  closeContextMenu, 
  columnOrRow, 
  createColumn, 
  deleteRow, 
  deleteColumn, 
  id, 
  sortRows, 
  toggleColumnIsEditable,
  top,
  left
}) => {

  const rowActions = [
    { text: 'Delete', action: () => deleteRow(id) }
  ]
  
  const columnActions = [
    { text: 'Sort A to Z', action: () => sortRows(id, 'ASC') },
    { text: 'Sort Z to A', action: () => sortRows(id, 'DESC') },
    { text: 'Insert Before', action: () => createColumn(id, 'BEFORE') },
    { text: 'Insert After', action: () => createColumn(id, 'AFTER') },
    { text: 'Edit Column', action: () => toggleColumnIsEditable(id) },
    { text: 'Delete Column', action: () => deleteColumn(id) },
  ]

  return (
    <ContextMenu
      actions={columnOrRow === 'COLUMN' ? columnActions : rowActions }
      closeContextMenu={closeContextMenu}
      top={top}
      left={left}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableContextMenu.propTypes = {
  closeContextMenu: func,
  columnOrRow: oneOf([ 'COLUMN', 'ROW' ]),
  createColumn: func,
  deleteColumn: func,
  deleteRow: func,
  id: number,
  rowId: number,
  sortRows: func,
  toggleColumnIsEditable: func,
  top: number,
  left: number
}

export default TableContextMenu