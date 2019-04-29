//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../../_config'

import {
  toggleTableIsRenaming as toggleTableIsRenamingAction,
  updateTableName as updateTableNameAction,
} from '../redux/project/projectActions'

import AutosizeTextArea from 'react-autosize-textarea'
import Dropdown from '../components/Dropdown'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  toggleTableIsRenaming: id => dispatch(toggleTableIsRenamingAction(id)),
  updateTableName: (columnId, nextName) => dispatch(updateTableNameAction(columnId, nextName)),
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectChooseTableDropdown = ({ 
  isDropdownVisible,
  table,
  toggleTableIsRenaming,
  updateTableName
}) => {
  return (
    <Dropdown
      closeDropdown={() => toggleTableIsRenaming(table.id)}
      isDropdownVisible={isDropdownVisible}>
      <Container>
        <EditContainer>
          <Label>Name:&nbsp;&nbsp;</Label>
          <StyledTextarea
            autoFocus
            onChange={e => updateTableName(table.id, e.target.value)}
            value={table.name === null ? "" : table.name}/>
        </EditContainer>
      </Container>
    </Dropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjectChooseTableDropdown.propTypes = {
  isDropdownVisible: bool,
  table: shape({
    id: number,
    name: string
  }),
  toggleTableIsRenaming: func,
  updateTableName: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  color: ${ colors.TEXT_DARK };
`

const EditContainer = styled.div`
  width: 100%;
  padding: 1vh 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Label = styled.div`
`

const StyledTextarea = styled(AutosizeTextArea)`
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: inherit;
  border: none;
  outline: none;
  resize: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`

export default connect(
  null,
  mapDispatchToProps
)(AppProjectChooseTableDropdown)