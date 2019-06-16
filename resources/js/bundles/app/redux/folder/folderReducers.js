//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import folderNormalizer from './folderNormalizer'

import clone from 'utils/clone'
//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const normalizedFolders = folderNormalizer(initialData.folders)
const initialState = {
  clipboardCutOrCopy: null,
  clipboardId: null,
  clipboardItemType: null,
  folders: normalizedFolders.entities.folder,
  folderIds: normalizedFolders.result,
  files: normalizedFolders.entities.file,
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
      
    case 'CREATE_FILE': {
      const {
        folderId,
        newFile
      } = action
      return {
        ...state,
        files: { ...state.files, [newFile.id]: newFile },
        folders: {
          ...state.folders, [folderId]: {
            ...state.folders[folderId], files: [
              ...state.folders[folderId].files, newFile.id
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

    case 'DELETE_FILE': {
      const {
        fileId
      } = action
      const file = clone(state.files[fileId])
      const { [fileId]: {}, ...nextFiles } = state.files
      return {
        ...state,
        files: nextFiles,
        folders: {
          ...state.folders, [file.folderId]: {
            ...state.folders[file.folderId], 
            files: state.folders[file.folderId].files.filter(file => file !== fileId)
          }
        }
      }
    }
      
    case 'UPDATE_CLIPBOARD': {
      const {
        nextClipboardCutOrCopy,
        nextClipboardId,
        nextClipboardItemType
      } = action
      return {
        ...state,
        clipboardCutOrCopy: nextClipboardCutOrCopy,
        clipboardId: nextClipboardId,
        clipboardItemType: nextClipboardItemType,
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

    case 'UPDATE_FOLDERS': {
      const {
        nextFolders
      } = action
      console.log(nextFolders)
      return { ...state, folders: nextFolders }
    }

    case 'UPDATE_FOLDER_IDS': {
      const {
        nextFolderIds
      } = action
      return {
        ...state,
        folderIds: nextFolderIds
      }
    }

    case 'UPDATE_FILE': {
      const {
        fileId,
        updates
      } = action
      return { 
        ...state, files: {
          ...state.files, [fileId]: {
            ...state.files[fileId], ...updates
          }
        }
      }
    }

    case 'UPDATE_FILES': {
      const {
        nextFiles
      } = action
      return { ...state, files: nextFiles }
    }
      
    default:
      return state
  }
}

export default folderReducers