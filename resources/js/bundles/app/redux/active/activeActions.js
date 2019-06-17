//-----------------------------------------------------------------------------
// Update Active Folder Path
//-----------------------------------------------------------------------------
export const updateActiveFolderPath = nextActiveFolderPath => ({
  type: 'UPDATE_ACTIVE_FOLDER_PATH',
  nextActiveFolderPath: nextActiveFolderPath
})

//-----------------------------------------------------------------------------
// Update Active File Id
//-----------------------------------------------------------------------------
export const updateActiveFileId = nextActiveFileId => ({
  type: 'UPDATE_ACTIVE_FILE_ID',
  nextActiveFileId: nextActiveFileId
})