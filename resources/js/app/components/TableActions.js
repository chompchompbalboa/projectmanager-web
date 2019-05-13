//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import {
  createTableRow as createTableRowAction
} from '../redux/table/tableActions'

import TableAction from './TableAction'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  createTableRow: () => dispatch(createTableRowAction())
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableActions = ({
  createTableRow
}) => {

  const actions = [
    { description: "Add Row", icon: "ACTION_CREATE_ROW", onClick: createTableRow }
  ]

  return (
    <Container>
      {actions.map(action => {
        return (
          <TableAction
            key={action.icon}
            description={action.description}
            icon={action.icon}
            onClick={() => action.onClick()}/>
      )})}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableActions.propTypes = {
  createTableRow: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 500;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${ colors.TABLE_ACTIONS_BACKGROUND };
  border-bottom: 1px dashed ${ colors.TABLE_ACTIONS_BORDER };
`

export default connect(
  null,
  mapDispatchToProps
)(TableActions)