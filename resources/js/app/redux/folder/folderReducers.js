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
  clipboardCutOrCopy: null,
  clipboardId: null,
  clipboardType: null,
  folders: normalizedFolders.entities.folder,
  folderIds: normalizedFolders.result,
  modules: normalizedFolders.entities.module,
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const folderReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'CREATE_FOLDER': {
      const {
        newFolder
      } = action
      let nextState = {
        ...state, folders: {
          ...state.folders, 
          [newFolder.id]: newFolder
        }
      }
      if(newFolder.folderId) {
        nextState = {
          ...nextState, folders: {
            ...nextState.folders, [newFolder.folderId]: {
              ...state.folders[newFolder.folderId], folders: [
                newFolder.id, ...state.folders[newFolder.folderId].folders
              ]
            }
          }
        }
        return nextState
      }
      else {
        return {
          ...nextState,
          folderIds: [...nextState.folderIds, newFolder.id]
        }
      }
    }
      
    case 'CREATE_MODULE': {
      const {
        folderId,
        newModule
      } = action
      return {
        ...state,
        modules: { ...state.modules, [newModule.id]: newModule },
        folders: {
          ...state.folders, [folderId]: {
            ...state.folders[folderId], modules: [
              ...state.folders[folderId].modules, newModule.id
            ]
          }
        }
      }
    }

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

    case 'DELETE_MODULE': {
      const {
        moduleId
      } = action
      const module = clone(state.modules[moduleId])
      const { [moduleId]: {}, ...nextModules } = state.modules
      return {
        ...state,
        modules: nextModules,
        folders: {
          ...state.folders, [module.folderId]: {
            ...state.folders[module.folderId], 
            modules: state.folders[module.folderId].modules.filter(module => module !== moduleId)
          }
        }
      }
    }
      
    case 'UPDATE_CLIPBOARD': {
      const {
        nextClipboardCutOrCopy,
        nextClipboardId,
        nextClipboardType
      } = action
      console.log(action)
      return {
        ...state,
        clipboardCutOrCopy: nextClipboardCutOrCopy,
        clipboardId: nextClipboardId,
        clipboardType: nextClipboardType,
      }
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

    case 'UPDATE_MODULE': {
      const {
        moduleId,
        updates
      } = action
      return { 
        ...state, modules: {
          ...state.modules, [moduleId]: {
            ...state.modules[moduleId], ...updates
          }
        }
      }
    }
      
    default:
      return state
  }
}

export default folderReducers