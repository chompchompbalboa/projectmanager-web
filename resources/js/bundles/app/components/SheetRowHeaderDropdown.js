//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { connect } from 'react-redux'
import { bool, func, string } from 'prop-types'

import {
  deleteSheetRow as deleteSheetRowAction
} from '../redux/sheet/sheetActions'

import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  deleteSheetRow: rowId => dispatch(deleteSheetRowAction(rowId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const SheetRowHeaderDropdown = ({
  closeDropdown,
  deleteSheetRow,
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
        onClick={() => deleteSheetRow(rowId)}
        text="Delete">
      </DropdownItem>
    </Dropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SheetRowHeaderDropdown.propTypes = {
  closeDropdown: func,
  deleteSheetRow: func,
  isDropdownVisible: bool,
  onModuleTypeClick: func,
  rowId: string
}

export default connect(
  null,
  mapDispatchToProps
)(SheetRowHeaderDropdown)