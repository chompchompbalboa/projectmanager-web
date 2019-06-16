//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { schema, normalize } from 'normalizr';

//-----------------------------------------------------------------------------
// Schema
//-----------------------------------------------------------------------------
const container = new schema.Entity('containers');
const containersList = [container];

//-----------------------------------------------------------------------------
// Normalizer
//-----------------------------------------------------------------------------
const containerNormalizer = containers => normalize(containers, containersList);
export default containerNormalizer;