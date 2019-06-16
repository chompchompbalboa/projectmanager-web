//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { connect } from 'react-redux'
import { bool, func, string } from 'prop-types'

import {
  deleteTableRow as deleteTableRowAction
} from '../redux/table/tableActions'

import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  deleteTableRow: rowId => dispatch(deleteTableRowAction(rowId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableRowHeaderDropdown = ({
  closeDropdown,
  deleteTableRow,
  isDropdownVisible,
  rowId,
  ...props
}) => {

  return (
    <Dropdown
      closeDropdown={closeDropdown}
      isDropdownVisible={isDropdownVisible}
      {...props}>
      <DropdownItem
        onClick={() => deleteTableRow(rowId)}
        text="Delete">
      </DropdownItem>
    </Dropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableRowHeaderDropdown.propTypes = {
  closeDropdown: func,
  deleteTableRow: func,
  isDropdownVisible: bool,
  onModuleTypeClick: func,
  rowId: string
}

export default connect(
  null,
  mapDispatchToProps
)(TableRowHeaderDropdown)