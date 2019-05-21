//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import folderNormalizer from './folderNormalizer'

import clone from '../../../_utils/clone'
//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const normalizedFolders = folderNormalizer(initialData.folders)
const initialState = {
  folders: normalizedFolders.entities.folder,
  folderIds: normalizedFolders.result,
  modules: normalizedFolders.entities.module,
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const folderReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'DELETE_FOLDER': {
      const {
        folderId,
        parentFolderId
      } = action
      let nextFolders = clone(state.folders)
      delete nextFolders[folderId]
      if (parentFolderId) {
        const nextParentFolders = nextFolders[parentFolderId].folders.filter(id => id !== folderId)
        nextFolders[parentFolderId].folders = nextParentFolders
      }
      const nextState = {
        ...state,
        folders: nextFolders,
        folderIds: state.folderIds.filter(folder => folder !== folderId)
      }
      return nextState
    }

    case 'UPDATE_FOLDER': {
      const {
        folderId,
        updates
      } = action
      return { 
        ...state, folders: {
          ...state.folders, [folderId]: {
            ...state.folders[folderId], ...updates
          }
        }
      }
    }
    default:
      return state
  }
}

export default folderReducers