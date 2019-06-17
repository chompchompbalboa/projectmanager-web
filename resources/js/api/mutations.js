//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from './axios'

//-----------------------------------------------------------------------------
// Folder
//-----------------------------------------------------------------------------
export const copyFolder = async (folderToCopyId, newFolderId, pasteFolderId) => {  
  return axios.post('/app/folders/copy', {
    folderToCopyId: folderToCopyId,
    newFolderId: newFolderId,
    pasteFolderId: pasteFolderId
  }).then(response => {
    return response.data
  })
}

export const createFolder = async newFolder => {  
  return axios.post('/app/folders', newFolder).then(response => {
    return response.data
  })
}

export const deleteFolder = async (folderId) => {  
  return axios.delete('/app/folders/' + folderId).then(response => {
    return response.data
  })
}

export const updateFolder = async (id, updates) => {
  return axios.patch('/app/folders/' + id, updates).then(response => {
    return response.data
  })
}

//-----------------------------------------------------------------------------
// File
//-----------------------------------------------------------------------------
export const copyFile = async (fileType, pasteFolderId, fileToCopyId, newFile) => {
  const url = '/app/' + fileType.toLowerCase() + 's/copy'
  return axios.post(url, {
    pasteFolderId: pasteFolderId,
    fileToCopyId: fileToCopyId,
    newFile: newFile
  }).then(response => {
    return response.data
  })
}

export const createFile = async (newFile) => {  
  return axios.post('/app/files', newFile).then(response => {
    return response.data
  })
}

export const updateFile = async (id, updates) => {
  return axios.patch('/app/files/' + id, updates).then(response => {
    return response.data
  })
}

export const deleteFile = async (fileId) => {  
  return axios.delete('/app/files/' + fileId).then(response => {
    return response.data
  })
}

//-----------------------------------------------------------------------------
// Note
//-----------------------------------------------------------------------------
export const updateNote = async (id, updates) => {
  return axios.patch('/app/notes/' + id, updates).then(response => {
    return response.data
  })
}

//-----------------------------------------------------------------------------
// Sheet
//-----------------------------------------------------------------------------
export const createSheet = async (newSheet) => {  
  return axios.post('/app/sheets', newSheet).then(response => {
    return response.data
  })
}

export const createSheetColumn = async (newColumn, newCells) => {  
  return axios.post('/app/sheets/columns', {
    newColumn: newColumn,
    newCells: newCells
  }).then(response => {
    return response.data
  })
}

export const createSheetRow = async (newRow, newCells) => {  
  return axios.post('/app/sheets/rows', {
    newRow: newRow,
    newCells: newCells
  }).then(response => {
    return response.data
  })
}

export const deleteSheet = async (sheetId) => {  
  return axios.delete('/app/sheets/' + sheetId).then(response => {
    return response.data
  })
}

export const deleteSheetBreakdown = async (breakdownId) => {  
  return axios.delete('/app/sheets/breakdowns/' + breakdownId).then(response => {
    return response.data
  })
}

export const deleteSheetBreakdownFormula = async (formulaId) => {  
  return axios.delete('/app/sheets/breakdowns/formulas/' + formulaId).then(response => {
    return response.data
  })
}

export const deleteSheetColumn = async (columnId) => {  
  return axios.delete('/app/sheets/columns/' + columnId).then(response => {
    return response.data
  })
}

export const deleteSheetRow = async (rowId) => {  
  return axios.delete('/app/sheets/rows/' + rowId).then(response => {
    return response.data
  })
}

export const updateSheet = async (id, sheet) => {  
  return axios.patch('/app/sheets/' + id, {
    id: id,
    sheet: sheet
  }).then(response => {
    return response.data
  })
}

export const updateSheetBreakdown = async (id, breakdown) => {  
  return axios.patch('/app/sheets/breakdowns/' + id, {
    id: id,
    breakdown: breakdown
  }).then(response => {
    return response.data
  })
}

export const updateSheetBreakdownFormula = async (id, formula) => {  
  return axios.patch('/app/sheets/breakdowns/formulas/' + id, {
    id: id,
    formula: formula
  }).then(response => {
    return response.data
  })
}

export const updateSheetCell = async (id, updates) => {  
  return axios.patch('/app/sheets/cells/' + id, updates).then(response => {
    return response.data
  })
}

export const updateSheetColumn = async (id, updates) => {  
  return axios.patch('/app/sheets/columns/' + id, updates).then(response => {
    return response.data
  })
}