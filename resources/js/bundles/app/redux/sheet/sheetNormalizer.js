//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { schema, normalize } from 'normalizr';

//-----------------------------------------------------------------------------
// Schema
//-----------------------------------------------------------------------------

const cells = new schema.Entity('cells', {
  row: row,
  column: column
});
const column = new schema.Entity('columns', {
  cells: [cells]
});
const row = new schema.Entity('rows', {
  cells: [cells]
});
const normalizedSheet = new schema.Entity('sheet', {
  rows: [row],
  columns: [column]
});

//-----------------------------------------------------------------------------
// Normalizer
//-----------------------------------------------------------------------------
const sheetNormalizer = sheet => normalize(sheet, normalizedSheet);
export default sheetNormalizer;
