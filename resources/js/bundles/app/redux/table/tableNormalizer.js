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
const normalizedTable = new schema.Entity('table', {
  rows: [row],
  columns: [column]
});

//-----------------------------------------------------------------------------
// Normalizer
//-----------------------------------------------------------------------------
const tableNormalizer = table => normalize(table, normalizedTable);
export default tableNormalizer;
