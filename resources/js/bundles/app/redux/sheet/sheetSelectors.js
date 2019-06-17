//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { createSelector } from 'reselect'

//-----------------------------------------------------------------------------
// Select Sheet Cells
//-----------------------------------------------------------------------------
export const selectSheetCells = state => state.sheet.cells ? state.sheet.cells : null

//-----------------------------------------------------------------------------
// Select Sheet Column Ids
//-----------------------------------------------------------------------------
export const selectSheetColumnIds = state => {
  if(state.sheet.columnIds && state.sheet.columns) {
    let orderedColumnIds = []
    state.sheet.columnIds.forEach(columnId => {
      const column = state.sheet.columns[columnId]
      orderedColumnIds[column.position] = columnId
    })
    return orderedColumnIds
  }
  return null
}

//-----------------------------------------------------------------------------
// Select Sheet Columns
//-----------------------------------------------------------------------------
export const selectSheetColumns = state => {
  const sheetColumns = state.sheet.columns ? state.sheet.columns : null
  return sheetColumns
}

//-----------------------------------------------------------------------------
// Select Sheet Row Ids
//-----------------------------------------------------------------------------
export const selectSheetRowIds = state => state.sheet.rowIds ? state.sheet.rowIds : null

//-----------------------------------------------------------------------------
// Select Sheet Rows
//-----------------------------------------------------------------------------
export const selectSheetRows = state => state.sheet.rows ? state.sheet.rows : null

//-----------------------------------------------------------------------------
// Select Sheet Width
//-----------------------------------------------------------------------------
export const selectSheetWidth = createSelector(
  selectSheetColumns,
  columns => columns && Object.keys(columns).length !== 0 ? Object.keys(columns).map(columnId => columns[columnId].width).reduce((sheetWidth, columnWidth) => sheetWidth + columnWidth) : null
)