//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { schema, normalize } from 'normalizr';

//-----------------------------------------------------------------------------
// Schema
//-----------------------------------------------------------------------------

const modules = new schema.Entity('modules');
const views = new schema.Entity('views', {
  modules: [modules]
});
const collections = new schema.Entity('collections', {
  views: [views]
});
const containers = new schema.Entity('containers', {
  collections: [collections]
});
const containersList = [containers];

//-----------------------------------------------------------------------------
// Normalizer
//-----------------------------------------------------------------------------
const structureNormalizer = containers => normalize(containers, containersList);
export default structureNormalizer;
