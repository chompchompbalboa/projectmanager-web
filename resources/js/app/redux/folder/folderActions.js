//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

import { mutation } from '../../../_api'
import clone from '../../../_utils/clone'

import { updateActiveModuleId } from '../active/activeActions'

//-----------------------------------------------------------------------------
// Defaults
//-----------------------------------------------------------------------------
const defaultFolder = (parentFolderId, userId) => ({
  id: createUuid(),
  name: 'New folder',
  folderId: parentFolderId || null,
  folders: [],
  modules: [],
  isFolderRenaming: true,
  userId: parentFolderId ? null : userId
})

const defaultModule = (folderId, type) => ({
  id: createUuid(),
  name: 'New Module',
  folderId: folderId,
  type: type,
  typeId: createUuid(),
  isModuleRenaming: true,
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
// Copy Module
//-----------------------------------------------------------------------------
export const copyModule = moduleId => {
  return dispatch => {
    dispatch(updateClipboard('COPY', 'MODULE', moduleId))
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
// Create Module
//-----------------------------------------------------------------------------
export const createModule = (folderId, type) => {
  return dispatch => {
    const newModule = defaultModule(folderId, type)
    dispatch(createModuleReducer(folderId, newModule))
    mutation.createModule(newModule).then(newModule => {
      dispatch(updateActiveModuleId(newModule.id))
    })
  }
}

const createModuleReducer = (folderId, newModule) => ({
  type: 'CREATE_MODULE',
  folderId: folderId,
  newModule: newModule
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
// Cut Module
//-----------------------------------------------------------------------------
export const cutModule = moduleId => {
  return dispatch => {
    dispatch(updateClipboard('CUT', 'MODULE', moduleId))
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
// Delete Module
//-----------------------------------------------------------------------------
export const deleteModule = (moduleId) => {
  return dispatch => {
    dispatch(deleteModuleReducer(moduleId))
    mutation.deleteModule(moduleId)
  }
}

const deleteModuleReducer = (moduleId) => ({
  type: 'DELETE_MODULE',
  moduleId: moduleId
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
        modules
      }
    } = getState()
    
    // Get the object being pasted
    const pasteObject = clone(clipboardType === 'FOLDER' ? folders[clipboardId] : modules[clipboardId])
    // Get the folder being pasted into
    const pasteFolder = clone(folders[pasteFolderId])
    
    if (clipboardCutOrCopy === 'COPY') {
      console.log(clipboardCutOrCopy, clipboardType, clipboardId)
    }
    else if (clipboardCutOrCopy === 'CUT') {
      // Remove the object from the parent folder
      if(pasteObject.folderId) {
        const cutFromFolder = clone(folders[pasteObject.folderId])
        const nextCutFromFolderFolders = cutFromFolder.folders.filter(folderId => folderId !== pasteObject.id)
        const nextCutFromFolderModules = cutFromFolder.modules.filter(moduleId => moduleId !== pasteObject.id)
        clipboardType === 'FOLDER' && dispatch(updateFolder(cutFromFolder.id, { folders: nextCutFromFolderFolders }, true))
        clipboardType === 'MODULE' && dispatch(updateFolder(cutFromFolder.id, { modules: nextCutFromFolderModules }, true))
      } else {
        dispatch(updateFolderIds(folderIds.filter(folderId => folderId !== pasteObject.id)))
      }
      
      if(clipboardType === 'FOLDER') {
        dispatch(updateFolder(clipboardId, { folderId: pasteFolderId }))
        dispatch(updateFolder(pasteFolderId, { folders: [...pasteFolder.folders, clipboardId] }, true))
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
// Update Module
//-----------------------------------------------------------------------------
export const updateModule = (moduleId, updates) => {
  return dispatch => {
    dispatch(updateModuleReducer(moduleId, { ...updates, isModuleRenaming: false }))
    mutation.updateModule(moduleId, updates)
  }
}

const updateModuleReducer = (moduleId, updates) => ({
  type: 'UPDATE_MODULE',
  moduleId: moduleId,
  updates: updates
})