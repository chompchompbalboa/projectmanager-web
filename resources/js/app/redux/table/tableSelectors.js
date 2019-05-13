//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { createSelector } from 'reselect'

//-----------------------------------------------------------------------------
// Select Table Cells
//-----------------------------------------------------------------------------
export const selectTableCells = state => state.table.cells ? state.table.cells : null

//-----------------------------------------------------------------------------
// Select Table Column Ids
//-----------------------------------------------------------------------------
export const selectTableColumnIds = state => state.table.columnIds ? state.table.columnIds : null

//-----------------------------------------------------------------------------
// Select Table Columns
//-----------------------------------------------------------------------------
export const selectTableColumns = state => state.table.columns ? state.table.columns : null

//-----------------------------------------------------------------------------
// Select Table Row Ids
//-----------------------------------------------------------------------------
export const selectTableRowIds = state => state.table.rowIds ? state.table.rowIds : null

//-----------------------------------------------------------------------------
// Select Table Rows
//-----------------------------------------------------------------------------
export const selectTableRows = state => state.table.rows ? state.table.rows : null

//-----------------------------------------------------------------------------
// Select Table Width
//-----------------------------------------------------------------------------
export const selectTableWidth = createSelector(
  selectTableColumns,
  columns => columns ? Object.keys(columns).map(columnId => columns[columnId].width).reduce((tableWidth, columnWidth) => tableWidth + columnWidth) : null
)