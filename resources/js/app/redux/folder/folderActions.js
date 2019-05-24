//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { v4 as createUuid } from 'uuid'

import { mutation } from '../../../_api'

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
  return (dispatch, getState) => {
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
// Update Folder
//-----------------------------------------------------------------------------
export const updateFolder = (folderId, updates) => {
  return dispatch => {
    dispatch(updateFolderReducer(folderId, { ...updates, isFolderRenaming: false }))
    mutation.updateFolder(folderId, updates)
  }
}

const updateFolderReducer = (folderId, updates) => ({
  type: 'UPDATE_FOLDER',
  folderId: folderId,
  updates: updates
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