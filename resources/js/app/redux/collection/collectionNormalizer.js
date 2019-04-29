//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { schema, normalize } from 'normalizr';

//-----------------------------------------------------------------------------
// Schema
//-----------------------------------------------------------------------------
const collection = new schema.Entity('collections');
const collectionsList = [collection];

//-----------------------------------------------------------------------------
// Normalizer
//-----------------------------------------------------------------------------
const collectionNormalizer = collections => normalize(collections, collectionsList);
export default collectionNormalizer;