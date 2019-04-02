//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../../_config'

import {
  toggleColumnIsEditable as toggleColumnIsEditableAction,
  updateColumnName as updateColumnNameAction,
} from '../redux/table/tableActions'

import AutosizeTextArea from 'react-autosize-textarea'
import Dropdown from './Dropdown'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  toggleColumnIsEditable: columnId => dispatch(toggleColumnIsEditableAction(columnId)),
  updateColumnName: (columnId, nextName) => dispatch(updateColumnNameAction(columnId, nextName))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableHeaderDropdown = ({ 
  column, 
  name,
  isDropdownVisible, 
  toggleColumnIsEditable, 
  updateColumnName 
}) => {
  console.log(isDropdownVisible && column)
  return (
    <Dropdown
      closeDropdown={() => toggleColumnIsEditable(column.id)}
      isDropdownVisible={isDropdownVisible}>
      <Container>
        <EditContainer>
          <Label>Name:&nbsp;&nbsp;</Label>
          <StyledTextarea
            autoFocus={isDropdownVisible}
            onChange={e => updateColumnName(column.id, e.target.value)}
            value={name}/>
        </EditContainer>
      </Container>
    </Dropdown>
  )
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
)(TableHeaderDropdown)