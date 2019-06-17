//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import {
  createSheetRow as createSheetRowAction
} from '../redux/sheet/sheetActions'

import SheetAction from './SheetAction'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  createSheetRow: () => dispatch(createSheetRowAction())
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const SheetActions = ({
  createSheetRow
}) => {

  const actions = [
    { description: "Add Row", icon: "ACTION_CREATE_ROW", onClick: createSheetRow }
  ]

  return (
    <Container>
      {actions.map(action => {
        return (
          <SheetAction
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
SheetActions.propTypes = {
  createSheetRow: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 1000;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${ colors.SHEET_ACTIONS_BACKGROUND };
  border-bottom: 1px dashed ${ colors.SHEET_ACTIONS_BORDER };
`

export default connect(
  null,
  mapDispatchToProps
)(SheetActions)