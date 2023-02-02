//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { schema, normalize } from 'normalizr';

//-----------------------------------------------------------------------------
// Schema
//-----------------------------------------------------------------------------
const module = new schema.Entity('modules');
const modulesList = [module];

//-----------------------------------------------------------------------------
// Normalizer
//-----------------------------------------------------------------------------
const moduleNormalizer = modules => normalize(modules, modulesList);
export default moduleNormalizer;