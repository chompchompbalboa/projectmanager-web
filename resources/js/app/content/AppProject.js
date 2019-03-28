//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number, object, oneOf } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import { 
  createColumn as createColumnAction,
  createRow as createRowAction,
  deleteRow as deleteRowAction,
  setActiveTable as setActiveTableAction,
  sortRows as sortRowsAction,
  updateCell as updateCellAction,
  updateColumnWidths as updateColumnWidthsAction
} from '../actions/projectActions'

import AppProjectChooseTable from './AppProjectChooseTable'
import Table from '../components/Table'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeTable: state.project.activeTable,
  activeTableId: state.project.activeTableId,
  activeTableSortColumn: state.project.activeTableSortColumn,
  activeTableSortOrder: state.project.activeTableSortOrder
})

const mapDispatchToProps = dispatch => ({
  createColumn: (columnId, beforeOrAfter) => dispatch(createColumnAction(columnId, beforeOrAfter)),
  createRow: () => dispatch(createRowAction()),
  deleteRow: rowId => dispatch(deleteRowAction(rowId)),
  setActiveTable: nextActiveTable => dispatch(setActiveTableAction(nextActiveTable)),
  sortRows: nextSortColumn => dispatch(sortRowsAction(nextSortColumn)),
  updateCell: (rowId, cellId, type, value) => dispatch(updateCellAction(rowId, cellId, type, value)),
  updateColumnWidths: nextColumnWidths => dispatch(updateColumnWidthsAction(nextColumnWidths))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProject = ({ 
  activeTable, 
  activeTableId, 
  activeTableSortColumn,
  activeTableSortOrder,
  createColumn,
  createRow, 
  deleteRow,
  setActiveTable, 
  sortRows, 
  updateCell,
  updateColumnWidths
}) => {

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
          createColumn={createColumn}
          deleteRow={deleteRow}
          createColumn={createColumn}
          setTable={setActiveTable}
          sortColumn={activeTableSortColumn}
          sortOrder={activeTableSortOrder}
          sortRows={sortRows}
          table={activeTable}
          updateCell={updateCell}
          updateColumnWidths={updateColumnWidths}/>
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
  activeTableSortColumn: object,
  activeTableSortOrder: oneOf(['ASC', 'DESC']),
  createColumn: func,
  createRow: func,
  deleteRow: func,
  sortRows: func,
  setActiveTable: func,
  updateCell: func,
  updateColumnWidths: func
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
