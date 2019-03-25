//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import { 
  createRow as createRowAction,
  setActiveTable as setActiveTableAction,
  updateCell as updateCellAction 
} from '../actions/projectActions'

import AppProjectChooseTable from './AppProjectChooseTable'
import Table from '../components/Table'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeTable: state.project.activeTable,
  activeTableId: state.project.activeTableId
})

const mapDispatchToProps = dispatch => ({
  createRow: () => dispatch(createRowAction()),
  setActiveTable: nextActiveTable => dispatch(setActiveTableAction(nextActiveTable)),
  updateCell: nextCell => dispatch(updateCellAction(nextCell))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProject = ({ activeTable, activeTableId, createRow, setActiveTable, updateCell }) => {

  const tableActions = [
    { icon: "ACTION_CREATE_ROW", onClick: createRow }
  ]

  return (
    <Container>
      <LeftColumn>
        <AppProjectChooseTable />
      </LeftColumn>
      <RightColumn>
        <Table
          id={activeTableId}
          actions={tableActions}
          table={activeTable}
          setTable={setActiveTable}
          updateCell={updateCell}/>
      </RightColumn>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProject.propTypes = {
  activeTable: object,
  activeTableId: number,
  createRow: func,
  setActiveTable: func,
  updateCell: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: fixed;
  top: ${layout.HEADER_HEIGHT};
  left: ${layout.SIDEBAR_WIDTH};
  width: calc(100vw - ${layout.SIDEBAR_WIDTH});
  height: calc(100vh - ${layout.HEADER_HEIGHT});
  padding: ${layout.PADDING};
  display: flex;
  justify-content: space-between;
  background-color: ${colors.BACKGROUND};
  box-shadow: 0px 0px 2px ${colors.BOX_SHADOW};
  overflow-y: scroll;
`

const LeftColumn = styled.div`
  position: sticky;
  top: 0;
  width: calc(13% - (${layout.PADDING} / 1.5));
`

const RightColumn = styled.div`
  width: calc(87% - (${layout.PADDING} / 1.5));
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AppProject))
