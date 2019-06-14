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
export const copyFile = (fileToCopyId, pasteFolderId) => {
  return (dispatch, getState) => {
    const {
      folder: {
        files,
        folders
      }
    } = getState()
    const fileToCopy = files[fileToCopyId]
    const pasteFolder = folders[pasteFolderId]
    const newFile = { ...clone(fileToCopy), id: createUuid(), typeId: createUuid() }
    dispatch(createFileReducer(pasteFolder.id, newFile))
    dispatch(updateFolder(pasteFolder.id, { files: [ ...pasteFolder.files, newFile.id]}, true))
    mutation.copyFile(fileToCopy.type, pasteFolder.id, fileToCopy.typeId, newFile)
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
export const cutFolder = (folderId, cutFromFolderId, pasteFolderId) => {
  return (dispatch, getState) => {
    const {
      folder: {
        folders
      }
    } = getState()
    const folder = folders[folderId]
    const cutFromFolder = folders[cutFromFolderId]
    const pasteFolder = folders[pasteFolderId]
    // Remove from current folder
    const nextCutFromFolderFolders = cutFromFolder.folders.filter(folderId => folderId !== folder.id)
    dispatch(updateFolder(cutFromFolder.id, { folders: nextCutFromFolderFolders }, true))
    // Update the relationship on the folder being pasted
    dispatch(updateFolder(folderId, { folderId: pasteFolder.id }))
    // Update the relationship on the folder being pasted into, skipping
    // the server update, which is handled by the update on the folder
    // being pasted
    dispatch(updateFolder(pasteFolderId, { folders: [...pasteFolder.folders, folder.id] }, true))
  }
}

//-----------------------------------------------------------------------------
// Cut File
//-----------------------------------------------------------------------------
export const cutFile = (fileId, cutFromFolderId, pasteFolderId) => {
  return (dispatch, getState) => {
    const {
      folder: {
        files,
        folders
      }
    } = getState()
    const file = files[fileId]
    const cutFromFolder = folders[cutFromFolderId]
    const pasteFolder = folders[pasteFolderId]
    // Remove from current folder
    const nextCutFromFolderFiles = cutFromFolder.files.filter(fileId => fileId !== file.id)
    dispatch(updateFolder(cutFromFolder.id, { files: nextCutFromFolderFiles }, true))
    // Update the relationship on the file being pasted
    dispatch(updateFile(file.id, { folderId: pasteFolder.id }))
    // Update the relationship on the folder being pasted into, skipping
    // the server update, which is handled by the update on the folder
    // being pasted
    dispatch(updateFolder(pasteFolder.id, { files: [...pasteFolder.files, file.id] }, true))
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
        clipboardItemType,
        folders,
        files
      }
    } = getState()
    
    // Get the item (a folder or a file) being pasted
    const pasteItem = clone(clipboardItemType === 'FOLDER' ? folders[clipboardId] : files[clipboardId])

    // Copy
    if (clipboardCutOrCopy === 'COPY') {
      if (clipboardItemType === 'FOLDER') {
        console.log('copyFolder')
      } 
      
      if (clipboardItemType === 'FILE') {
        dispatch(copyFile(clipboardId, pasteFolderId))
      }
    }
    // Cut
    else if (clipboardCutOrCopy === 'CUT') {
      const cutFromFolder = clone(folders[pasteItem.folderId])
      if(clipboardItemType === 'FOLDER') {
        dispatch(cutFolder(clipboardId, cutFromFolder.id, pasteFolderId))
      }
      if(clipboardItemType === 'FILE') {
        dispatch(cutFile(clipboardId, cutFromFolder.id, pasteFolderId))
      }
      dispatch(updateClipboard(null, null, null))
    }
  }
}

//-----------------------------------------------------------------------------
// Update Clipboard
//-----------------------------------------------------------------------------
export const updateClipboard = (cutOrCopy, itemType, itemId) => ({
  type: 'UPDATE_CLIPBOARD',
  nextClipboardCutOrCopy: cutOrCopy,
  nextClipboardId: itemId,
  nextClipboardItemType: itemType,
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