//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

import { mutation } from '../../../_api'
import clone from '../../../_utils/clone'

import { updateActiveFileId } from '../active/activeActions'

//-----------------------------------------------------------------------------
// Defaults
//-----------------------------------------------------------------------------
const defaultFolder = (parentFolderId, userId) => ({
  id: createUuid(),
  name: 'New folder',
  folderId: parentFolderId || null,
  folders: [],
  files: [],
  isFolderRenaming: true,
  userId: parentFolderId ? null : userId
})

const defaultFile = (folderId, type) => ({
  id: createUuid(),
  name: 'New File',
  folderId: folderId,
  type: type,
  typeId: createUuid(),
  isFileRenaming: true,
})

//-----------------------------------------------------------------------------
// Copy Folder
//-----------------------------------------------------------------------------
export const copyFolder = folderId => {
  return dispatch => {
    dispatch(updateClipboard('COPY', 'FOLDER', folderId))
  }
}

//-----------------------------------------------------------------------------
// Copy File
//-----------------------------------------------------------------------------
export const copyFile = fileId => {
  return dispatch => {
    dispatch(updateClipboard('COPY', 'FILE', fileId))
  }
}

//-----------------------------------------------------------------------------
// Create Folder
//-----------------------------------------------------------------------------
export const createFolder = (parentFolderId) => {
  return (dispatch, getState) => {
    const newFolder = defaultFolder(parentFolderId, getState().user.id)
    dispatch(createFolderReducer(newFolder))
    mutation.createFolder(newFolder)
  }
}

const createFolderReducer = (newFolder) => ({
  type: 'CREATE_FOLDER',
  newFolder: newFolder
})

//-----------------------------------------------------------------------------
// Create File
//-----------------------------------------------------------------------------
export const createFile = (folderId, type) => {
  return dispatch => {
    const newFile = defaultFile(folderId, type)
    dispatch(createFileReducer(folderId, newFile))
    mutation.createFile(newFile).then(newFile => {
      dispatch(updateActiveFileId(newFile.id))
    })
  }
}

const createFileReducer = (folderId, newFile) => ({
  type: 'CREATE_FILE',
  folderId: folderId,
  newFile: newFile
})

//-----------------------------------------------------------------------------
// Cut Folder
//-----------------------------------------------------------------------------
export const cutFolder = folderId => {
  return dispatch => {
    dispatch(updateClipboard('CUT', 'FOLDER', folderId))
  }
}

//-----------------------------------------------------------------------------
// Cut File
//-----------------------------------------------------------------------------
export const cutFile = fileId => {
  return dispatch => {
    dispatch(updateClipboard('CUT', 'FILE', fileId))
  }
}

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

//-----------------------------------------------------------------------------
// Delete File
//-----------------------------------------------------------------------------
export const deleteFile = (fileId) => {
  return dispatch => {
    dispatch(deleteFileReducer(fileId))
    mutation.deleteFile(fileId)
  }
}

const deleteFileReducer = (fileId) => ({
  type: 'DELETE_FILE',
  fileId: fileId
})

//-----------------------------------------------------------------------------
// Paste Folder
//-----------------------------------------------------------------------------
export const pasteIntoFolder = pasteFolderId => {
  return (dispatch, getState) => {
    const {
      folder: {
        clipboardCutOrCopy,
        clipboardId,
        clipboardType,
        folderIds,
        folders,
        files
      }
    } = getState()
    
    // Get the object being pasted
    const pasteObject = clone(clipboardType === 'FOLDER' ? folders[clipboardId] : files[clipboardId])
    // Get the folder being pasted into
    const pasteFolder = clone(folders[pasteFolderId])

    // Cut
    if (clipboardCutOrCopy === 'COPY') {
      console.log(clipboardCutOrCopy, clipboardType, clipboardId)
    }
    // Copy
    else if (clipboardCutOrCopy === 'CUT') {
      const cutFromFolder = clone(folders[pasteObject.folderId])
      
      if(clipboardType === 'FOLDER') {
        const nextCutFromFolderFolders = cutFromFolder.folders.filter(folderId => folderId !== pasteObject.id)
        dispatch(updateFolder(cutFromFolder.id, { folders: nextCutFromFolderFolders }, true))
        dispatch(updateFolder(clipboardId, { folderId: pasteFolderId }))
        dispatch(updateFolder(pasteFolderId, { folders: [...pasteFolder.folders, clipboardId] }, true))
      }
      
      if(clipboardType === 'FILE') {
        const nextCutFromFolderFiles = cutFromFolder.files.filter(fileId => fileId !== pasteObject.id)
        dispatch(updateFolder(cutFromFolder.id, { files: nextCutFromFolderFiles }, true))
        dispatch(updateFile(pasteObject.id, { folderId: pasteFolderId }))
        dispatch(updateFolder(pasteFolderId, { files: [...pasteFolder.files, clipboardId] }, true))
      }
    }
    dispatch(updateClipboard(null, null, null))
  }
}

//-----------------------------------------------------------------------------
// Update Clipboard
//-----------------------------------------------------------------------------
export const updateClipboard = (cutOrCopy, type, id) => ({
  type: 'UPDATE_CLIPBOARD',
  nextClipboardCutOrCopy: cutOrCopy,
  nextClipboardId: id,
  nextClipboardType: type,
})

//-----------------------------------------------------------------------------
// Update Folder
//-----------------------------------------------------------------------------
export const updateFolder = (folderId, updates, skipServerUpdate) => {
  return dispatch => {
    dispatch(updateFolderReducer(folderId, { ...updates, isFolderRenaming: false }))
    !skipServerUpdate && mutation.updateFolder(folderId, updates)
  }
}

const updateFolderReducer = (folderId, updates) => ({
  type: 'UPDATE_FOLDER',
  folderId: folderId,
  updates: updates
})

//-----------------------------------------------------------------------------
// Update Folder Ids
//-----------------------------------------------------------------------------
const updateFolderIds = (nextFolderIds) => ({
  type: 'UPDATE_FOLDER_IDS',
  nextFolderIds: nextFolderIds
})

//-----------------------------------------------------------------------------
// Update File
//-----------------------------------------------------------------------------
export const updateFile = (fileId, updates) => {
  return dispatch => {
    dispatch(updateFileReducer(fileId, { ...updates, isFileRenaming: false }))
    mutation.updateFile(fileId, updates)
  }
}

const updateFileReducer = (fileId, updates) => ({
  type: 'UPDATE_FILE',
  fileId: fileId,
  updates: updates
})