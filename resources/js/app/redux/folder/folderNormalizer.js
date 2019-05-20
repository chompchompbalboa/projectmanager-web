//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { schema, normalize } from 'normalizr';

//-----------------------------------------------------------------------------
// Schema
//-----------------------------------------------------------------------------
const module = new schema.Entity('module');
const folder = new schema.Entity('folder')
folder.define({
  folders: [folder],
  modules: [module]
})
const foldersList = [folder];

//-----------------------------------------------------------------------------
// Normalizer
//-----------------------------------------------------------------------------
const folderNormalizer = folders => normalize(folders, foldersList);
export default folderNormalizer;