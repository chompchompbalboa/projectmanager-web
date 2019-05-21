//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation } from '../../../_api'

//-----------------------------------------------------------------------------
// Update Folder
//-----------------------------------------------------------------------------
export const updateFolder = (folderId, updates) => {
  return dispatch => {
    dispatch(updateFolderReducer(folderId, updates))
    mutation.updateFolder(folderId, updates)
  }
}

const updateFolderReducer = (folderId, updates) => ({
  type: 'UPDATE_FOLDER',
  folderId: folderId,
  updates: updates
})

//-----------------------------------------------------------------------------
// Delete Folder
//-----------------------------------------------------------------------------
export const deleteFolder = (parentFolderId, folderId) => {
  return dispatch => {
    dispatch(deleteFolderReducer(parentFolderId, folderId))
    mutation.deleteFolder(folderId)
  }
}

const deleteFolderReducer = (parentFolderId, folderId) => ({
  type: 'DELETE_FOLDER',
  parentFolderId: parentFolderId,
  folderId: folderId
})