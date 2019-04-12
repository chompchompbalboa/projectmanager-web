//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../../_config'

import {
  toggleColumnIsEditable as toggleColumnIsEditableAction,
  updateColumnName as updateColumnNameAction,
  updateColumnType as updateColumnTypeAction,
} from '../redux/table/tableActions'

import AutosizeTextArea from 'react-autosize-textarea'
import Dropdown from './Dropdown'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  toggleColumnIsEditable: columnId => dispatch(toggleColumnIsEditableAction(columnId)),
  updateColumnName: (columnId, nextName) => dispatch(updateColumnNameAction(columnId, nextName)),
  updateColumnType: (columnId, nextType) => dispatch(updateColumnTypeAction(columnId, nextType))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableHeaderDropdown = ({ 
  column, 
  isDropdownVisible, 
  toggleColumnIsEditable, 
  updateColumnName,
  updateColumnType
}) => {
  return (
    <Dropdown
      closeDropdown={!column.name || column.name.length === 0 ? null : () => toggleColumnIsEditable(column.id)}
      isDropdownVisible={isDropdownVisible}>
      <Container>
        <EditContainer>
          <Label>Name:&nbsp;&nbsp;</Label>
          <StyledTextarea
            autoFocus={isDropdownVisible}
            onChange={e => updateColumnName(column.id, e.target.value)}
            value={column.name === null ? "" : column.name}/>
        </EditContainer>
        <TypesContainer>
          <EditContainer>
            <Label>Date:</Label>
            <StyledInput
              type="checkbox"
              checked={column.type === "DATETIME"}
              onChange={() => updateColumnType(column.id, "DATETIME")}/>
          </EditContainer>
          <EditContainer>
            <Label>Text:</Label>
            <StyledInput
              type="checkbox"
              checked={column.type === "STRING"}
              onChange={() => updateColumnType(column.id, "STRING")}/>
          </EditContainer>
          <EditContainer>
            <Label>Number:</Label>
            <StyledInput
              type="checkbox"
              checked={column.type === "NUMBER"}
              onChange={() => updateColumnType(column.id, "NUMBER")}/>
          </EditContainer>
          <EditContainer>
            <Label>Checkbox:</Label>
            <StyledInput
              type="checkbox"
              checked={column.type === "BOOLEAN"}
              onChange={() => updateColumnType(column.id, "BOOLEAN")}/>
          </EditContainer>
        </TypesContainer>
      </Container>
    </Dropdown>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableHeaderDropdown.propTypes = {
  column: shape({
    id: number,
    name: string
  }),
  isDropdownVisible: bool,
  toggleColumnIsEditable: func,
  updateColumnName: func,
  updateColumnType: func
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

const TypesContainer = styled.div`
  width: 100%;
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

const StyledInput = styled.input``

export default connect(
  null,
  mapDispatchToProps
)(TableHeaderDropdown)